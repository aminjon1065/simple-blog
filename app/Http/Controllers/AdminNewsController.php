<?php

namespace App\Http\Controllers;

use App\Events\NewsCreated;
use App\Http\Requests\NewsRequest;
use App\Models\Category;
use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Symfony\Component\HttpFoundation\RedirectResponse;


class AdminNewsController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();
        $categoryId = $request->input('category_id');
        $authorId = $request->input('author_id');
        $tagId = $request->input('tag_id');
        $approved = $request->input('approved');   // '0' | '1' | null
        $published = $request->input('published');  // '0' | '1' | null
        $status = $request->input('status');     // 0 | 1 | null
        $dateFrom = $request->input('date_from');  // 'YYYY-MM-DD' | null
        $dateTo = $request->input('date_to');    // 'YYYY-MM-DD' | null
        $sort = $request->input('sort', 'published_desc'); // например: published_desc|created_desc|views_desc

        $query = News::query()
            ->with([
                'tags:id,name',
                'category:id,name,slug',
                'author:id,name',
            ])
            ->search($search)
            ->category($categoryId)
            ->author($authorId)
            ->tag($tagId)
            ->approved($approved)
            ->published($published)
            ->status($status)
            ->publishedBetween($dateFrom, $dateTo);
        match ($sort) {
            'views_desc' => $query->orderByDesc('views'),
            'created_desc' => $query->orderByDesc('created_at'),
            'published_asc' => $query->orderByRaw('published_at IS NULL ASC, published_at ASC, created_at DESC'),
            default => $query->orderByRaw('published_at IS NULL ASC, published_at DESC, created_at DESC'),
        };
        $news = $query
            ->paginate(10)
            ->withQueryString();

        $categories = Category::query()
            ->select('id', 'name')
            ->orderBy('name')
            ->get();

        return Inertia::render('admin/news/index', [
            'news' => $news,
            'filters' => [
                'search' => $search,
                'category_id' => $categoryId,
                'author_id' => $authorId,
                'tag_id' => $tagId,
                'approved' => $approved,
                'published' => $published,
                'status' => $status,
                'date_from' => $dateFrom,
                'date_to' => $dateTo,
                'sort' => $sort,
            ],
            'categories' => $categories,
        ]);
    }


    public function updateToggle(Request $request, News $news)
    {
        $data = $request->validate([
            'field' => ['required', 'in:is_published,is_approved,show_at_slider,show_at_popular,is_breaking_news'],
            'value' => ['required', 'boolean'],
        ]);
        $news->{$data['field']} = (bool)$data['value'];
        $news->save();
        return redirect()->back()->with('success', 'Успешно обновлено.');
    }

    public function store(NewsRequest $request): RedirectResponse
    {
        $v = $request->validated();

        // Автор — текущий пользователь
        $authorId = $request->user()->id;

        // Генерация slug при отсутствии
        $slug = $v['slug'] ?? null;
        if (!$slug && !empty($v['title'])) {
            $slugBase = Str::slug($v['title']);
            $slug = $this->makeUniqueSlug($slugBase);
        }

        // Публикация: нормализуем дату (может прийти как 'YYYY-MM-DDTHH:mm')
        $publishedAt = null;
        if (!empty($v['published_at'])) {
            try {
                $publishedAt = Carbon::parse($v['published_at']);
            } catch (\Throwable $e) {
                $publishedAt = null; // можно кинуть валидацию, если критично
            }
        }

        // Сохраняем в транзакции
        return DB::transaction(function () use ($request, $v, $authorId, $slug, $publishedAt) {
            // Обработка файла
            $imagePath = null;
            if ($request->hasFile('image')) {
                // news/uniqname.ext в диске public
                $imagePath = $request->file('image')->store('news', 'public');
            }

            $news = News::create([
                'title' => $v['title'],
                'slug' => $slug,
                'content' => $v['content'],
                'image' => $imagePath ? ('/storage/' . $imagePath) : null,
                'category_id' => $v['category_id'],
                'author_id' => $authorId,
                'meta_title' => $v['meta_title'] ?? null,
                'meta_description' => $v['meta_description'] ?? null,
                'is_breaking_news' => $v['is_breaking_news'] ?? false,
                'show_at_slider' => $v['show_at_slider'] ?? false,
                'show_at_popular' => $v['show_at_popular'] ?? false,
                'is_approved' => $v['is_approved'] ?? true,
                'status' => $v['status'] ?? 1,
                'views' => $v['views'] ?? 0,
                'is_published' => $v['is_published'] ?? false,
                'published_at' => $publishedAt,
            ]);

            broadcast(new NewsCreated($news));
            //            event(new NewsCreated($news));
            // Теги (если присланы)
            if (!empty($v['tag_ids'])) {
                $news->tags()->sync($v['tag_ids']);
            }

            return redirect()
                ->back()
                ->with('success', 'Новость создана.');
        });
    }

    /**
     * Сделать уникальный slug на основе базового.
     */
    protected function makeUniqueSlug(string $base): string
    {
        $slug = $base ?: Str::random(8);

        if (!News::where('slug', $slug)->exists()) {
            return $slug;
        }

        // На случай коллизий добавляем суффикс -2, -3, ...
        $i = 2;
        while (News::where('slug', "{$base}-{$i}")->exists()) {
            $i++;
        }
        return "{$base}-{$i}";
    }

    public function destroy(News $news)
    {
        $news->delete();
        return back()->with('success', 'Новость удалена');
    }

}

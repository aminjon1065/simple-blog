<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    public function indexAdmin(Request $request): Response
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
            ]
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
        return response()->noContent();
    }


    public function index()
    {
        $categories = Category::all();
        $search = request('search');
        if ($search) {
            $news = News::with(['tags', 'category', 'author'])
                ->where('title', 'like', '%' . $search . '%')
                ->orWhere('content', 'like', '%' . $search . '%')
                ->orderBy('published_at', 'desc')
                ->paginate(10);
        } else {
            $news = News::with(['tags', 'category', 'author'])->orderBy('published_at', 'desc')->paginate(10);
        }
        return Inertia::render('news', [
            'news' => $news,
            'categories' => $categories
        ]);
    }

    public function show($slug)
    {
        $newsItem = News::with(['tags', 'category', 'author'])->where('slug', $slug)->firstOrFail();
        return Inertia::render('news-item', [
            'newsItem' => $newsItem
        ]);
    }

    public function destroy(News $news)
    {
        $news->delete();
        return back()->with('success', 'Новость удалена');
    }
}

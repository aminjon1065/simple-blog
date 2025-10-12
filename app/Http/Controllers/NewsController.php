<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Comment;
use App\Models\News;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        $search = request('search');
        $category = request('category');
        if ($search) {
            $news = News::with(['tags', 'category', 'author'])
                ->where('title', 'like', '%' . $search . '%')
                ->orWhere('content', 'like', '%' . $search . '%')
                ->orderBy('published_at', 'desc')
                ->paginate(10);
        } else if ($category) {
            $news = News::with(['tags', 'category', 'author'])
                ->where('category_id', $category)
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

    public function show(News $news)
    {
        $userId = Auth::id();
        // плоский список видимых комментариев (автор — видит свои даже без одобрения)
        $flat = Comment::query()
            ->forNews($news->getKey())   // ← гарантированно НЕ null
            ->visibleFor($userId)
            ->with(['user:id,name'])
            ->orderBy('created_at')
            ->get(['id', 'news_id', 'user_id', 'parent_id', 'comment', 'is_approved', 'created_at']);
        // собираем дерево
        $byId = [];
        $tree = [];
        foreach ($flat as $c) {
            $byId[$c->id] = $c->toArray() + ['children' => []];
        }
        foreach ($byId as $id => &$node) {
            if ($node['parent_id'] && isset($byId[$node['parent_id']])) {
                $byId[$node['parent_id']]['children'][] = &$node;
            } else {
                $tree[] = &$node;
            }
        }
        unset($node);
        return inertia('news-item', [
            'newsArticle' => [
                'id' => $news->id,
                'title' => $news->title,
                'content' => $news->content,
                'image' => $news->image,
                'published_at' => optional($news->published_at)?->toISOString(),
                'author' => ['id' => $news->author?->id, 'name' => $news->author?->name],
                'tags' => $news->tags()->select('tags.id', 'tags.name')->get(),
                // вот тут — готовое дерево:
                'comments' => $tree,
            ],
        ]);
    }
}

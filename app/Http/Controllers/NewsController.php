<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
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
}

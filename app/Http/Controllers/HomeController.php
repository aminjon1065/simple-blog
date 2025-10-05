<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $news = News::with('category', 'author', 'tags')->latest('id')->take(10)->get();
        return Inertia::render('main-page', [
            'news' => $news
        ]);
    }
}

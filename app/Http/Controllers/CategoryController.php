<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::query()
            ->withCount('news') // ← добавит поле news_count
            ->orderBy('name')
            ->get(['id', 'name', 'slug']); // выбери нужные поля

        return inertia('cats', [
            'categories' => $categories,
        ]);
    }
}

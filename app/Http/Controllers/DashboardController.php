<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $categoryCount = Category::count();
        $newsCount = News::count();
        return Inertia::render('admin/dashboard', [
            'categoryCount' => $categoryCount,
            'newsCount' => $newsCount
        ]);
    }
}

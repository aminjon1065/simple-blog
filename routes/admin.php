<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\NewsController;
use Inertia\Inertia;

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
//Category
    Route::resource('category', CategoryController::class);
    Route::patch('category-status/{category}', [CategoryController::class, 'updateToggle'])->name('category.update-toggle');

    Route::get('news', [NewsController::class, 'indexAdmin'])->name('news.admin-index');
    Route::resource('news', NewsController::class);
    Route::patch('/news-status/{news}', [NewsController::class, 'updateToggle'])
        ->name('admin.news.toggle');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

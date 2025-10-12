<?php

use App\Http\Controllers\AdminCategoryController;
use App\Http\Controllers\AdminNewsController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TagsController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
//Category
    Route::resource('category', AdminCategoryController::class);
    Route::patch('category-status/{category}', [AdminCategoryController::class, 'updateToggle'])->name('category.update-toggle');

    //News
    Route::get('news', [AdminNewsController::class, 'index'])->name('admin-news.index');
    Route::post('news', [AdminNewsController::class, 'store'])->name('admin-news.store');
    Route::resource('tags', TagsController::class)->names('admin-tags');
    Route::delete('news/{news}', [AdminNewsController::class, 'destroy'])->name('admin-news.destroy');
    Route::patch('/news-status/{news}', [AdminNewsController::class, 'updateToggle'])
        ->name('admin-news.toggle');

    //Comments
    Route::get('comments', [CommentController::class, 'index'])->name('admin-comments.index');

    Route::patch('/comments/{comment}/approve', [CommentController::class, 'approve'])
        ->name('admin-comments.approve');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

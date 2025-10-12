<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\TagController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/news', [NewsController::class, 'index'])->name('all-news');
Route::get('/news/{news:slug}', [NewsController::class, 'show'])->name('show-news');
Route::get('/cats', [CategoryController::class, 'index'])->name('tags');
Route::get('/about', function () {
    return Inertia::render('about');
});

Route::post('/news/{news}/comment', [CommentController::class, 'store'])
    ->name('comment.store')
    ->middleware('auth');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';

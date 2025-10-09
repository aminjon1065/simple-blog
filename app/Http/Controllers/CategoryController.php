<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/category/index');
    }

    public function create()
    {
        return Inertia::render('admin/category/create');
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::orderBy('name')->get();
        return Inertia::render('admin/category/index', [
            'categories' => $categories,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/category/create');
    }

    public function edit($id)
    {
        $category = Category::findOrFail($id);
        return Inertia::render('admin/category/edit', compact('category'));
    }

    public function show($id)
    {
        $category = Category::findOrFail($id);
        return Inertia::render('admin/category/show', compact('category'));
    }

    public function store(CategoryRequest $request)
    {
        $data = $request->validated();
        $category = Category::create($data);

        return redirect()->route('admin.categories.index')
            ->with('success', "Категория '{$category->name}' успешно создана.");
    }

    public function update(CategoryRequest $request, $id)
    {
        $category = Category::findOrFail($id);
        $data = $request->validated();
        $category->update($data);

        return redirect()->route('admin.categories.index')
            ->with('success', "Категория '{$category->name}' успешно обновлена.");
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $name = $category->name;
        $category->delete();

        return redirect()->route('admin.categories.index')
            ->with('success', "Категория '{$name}' успешно удалена.");
    }
}

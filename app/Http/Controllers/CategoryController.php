<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->get('search');

        $categories = Category::query()
            ->when($search, fn($query) => $query->where('name', 'like', "%{$search}%")
                ->orWhere('slug', 'like', "%{$search}%")
            )
            ->orderByDesc('created_at')
            ->paginate(15)
            ->withQueryString();
        return Inertia::render('admin/category/index', [
            'categories' => $categories,
            'filters' => [
                'search' => $search,
            ],
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
        $data['slug'] = str()->slug($data['name']);
        $data['status'] = $request->status;
        $data['show_at_nav'] = $request->show_at_nav;
        Category::create($data);
        return redirect()->back()
            ->with('success', "Категория успешно создана.");
    }

    public function updateToggle(Request $request, Category $category)
    {
        $data = $request->validate([
            'field' => ['required', 'in:status,show_at_nav'],
            'value' => ['required', 'boolean'],
        ]);
        $field = $data['field'];
        $value = (bool)$data['value'];
        $category->{$field} = $value;
        $category->save();
        return redirect()->back()->with('success', 'Успешно обновлено');
    }

    public function update(CategoryRequest $request, $id)
    {
        $category = Category::findOrFail($id);
        $data = $request->validated();
        $data['slug'] = str()->slug($data['name']);
        $category->update($data);
        return redirect()->back()
            ->with('success', "Категория '{$category->name}' успешно обновлена.");
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $name = $category->name;
        $category->delete();
        return redirect()->back()->with('success', "Категория '{$name}' успешно удалена.");
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

class AdminCategoryController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Category::class, 'category');
    }

    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $categories = Category::query()
            ->when($search, function ($q) use ($search) {
                $q->where(function ($qq) use ($search) {
                    $qq->where('name', 'like', "%{$search}%")
                        ->orWhere('slug', 'like', "%{$search}%");
                });
            })
            ->orderByDesc('created_at')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('admin/category/index', [
            'categories' => $categories,
            'filters' => ['search' => $search],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/category/create');
    }

    public function edit(Category $category): Response
    {
        return Inertia::render('admin/category/edit', compact('category'));
    }

    public function show(Category $category): Response
    {
        return Inertia::render('admin/category/show', compact('category'));
    }

    public function store(CategoryRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $data['slug'] = Str::slug($data['name']);
        $data['status'] = (bool)$request->boolean('status', true);
        $data['show_at_nav'] = (bool)$request->boolean('show_at_nav', true);

        Category::create($data);

        return back()->with('success', 'Категория успешно создана.');
    }

    public function updateToggle(Request $request, Category $category): RedirectResponse
    {
        $this->authorize('toggle', $category);

        $data = $request->validate([
            'field' => ['required', 'in:status,show_at_nav'],
            'value' => ['required', 'boolean'],
        ]);

        $category->{$data['field']} = (bool)$data['value'];
        $category->save();

        return back()->with('success', 'Успешно обновлено.');
    }

    public function update(CategoryRequest $request, Category $category): RedirectResponse
    {
        $data = $request->validated();
        $data['slug'] = Str::slug($data['name']);

        $category->update($data);

        return back()->with('success', "Категория '{$category->name}' успешно обновлена.");
    }

    public function destroy(Category $category): RedirectResponse
    {
        $name = $category->name;
        $category->delete();

        return back()->with('success', "Категория '{$name}' успешно удалена.");
    }
}

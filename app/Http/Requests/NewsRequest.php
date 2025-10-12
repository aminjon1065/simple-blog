<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class NewsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // или Policy
    }

    public function rules(): array
    {
        return [
            'title'             => ['required', 'string', 'max:255'],
            'slug'              => ['nullable', 'string', 'max:255', Rule::unique('news', 'slug')],
            'content'           => ['required', 'string'],

            // файл
            'image'             => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:4096'],

            // связи
            'category_id'       => ['required', 'exists:categories,id'],
            // author_id не принимаем извне — зададим в контроллере

            // SEO (опц.)
            'meta_title'        => ['nullable', 'string', 'max:255'],
            'meta_description'  => ['nullable', 'string', 'max:500'],

            // флаги
            'is_breaking_news'  => ['sometimes', 'boolean'],
            'show_at_slider'    => ['sometimes', 'boolean'],
            'show_at_popular'   => ['sometimes', 'boolean'],
            'is_approved'       => ['sometimes', 'boolean'],
            'is_published'      => ['sometimes', 'boolean'],
            'status'            => ['sometimes', 'integer', 'in:0,1'],

            // прочее
            'views'             => ['sometimes', 'integer', 'min:0'],
            'published_at'      => ['nullable', 'date'],

            // опционально: теги как массив id
            'tag_ids'           => ['sometimes', 'array'],
            'tag_ids.*'         => ['integer', 'exists:tags,id'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $bool = fn ($v) => filter_var($v, FILTER_VALIDATE_BOOL, FILTER_NULL_ON_FAILURE);

        $this->merge([
            'is_breaking_news' => $bool($this->input('is_breaking_news')) ?? false,
            'show_at_slider'   => $bool($this->input('show_at_slider'))   ?? false,
            'show_at_popular'  => $bool($this->input('show_at_popular'))  ?? false,
            'is_approved'      => $bool($this->input('is_approved'))      ?? true,
            'is_published'     => $bool($this->input('is_published'))     ?? false,
            'status'           => $this->has('status') ? (int) $this->input('status') : 1,
            'views'            => $this->has('views') ? (int) $this->input('views') : 0,
        ]);
    }

    public function messages(): array
    {
        return [
            'title.required'       => 'Укажите заголовок.',
            'category_id.required' => 'Выберите категорию.',
            'category_id.exists'   => 'Категория не найдена.',
            'image.image'          => 'Файл должен быть изображением.',
            'slug.unique'          => 'Такой slug уже существует.',
        ];
    }
}

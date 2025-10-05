<?php

namespace Database\Factories;

use App\Models\Tag;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tag>
 */
class TagFactory extends Factory
{
    protected $model = Tag::class;

    public function definition(): array
    {
        // generate a multi-word name and slugify it
        $baseName = $this->faker->words(2, true);
        // append short uniq suffix to ensure uniqueness across seed runs
        $uniq = substr(uniqid(), -4);
        $name = ucfirst($baseName) . ' ' . $uniq;

        return [
            'name' => $name,
            'slug' => Str::slug($baseName) . '-' . $uniq,
        ];
    }

    /**
     * Create and attach news items to the tag after creation.
     * Usage: Tag::factory()->count(3)->withNews(2)->create();
     *
     * @param int $count number of news items to create per tag
     */
    public function withNews(int $count = 1)
    {
        return $this->afterCreating(function (Tag $tag) use ($count) {
            // Lazy-load the News factory to avoid hard dependency if News model/factory absent
            if (class_exists(\App\Models\News::class) && method_exists(\App\Models\News::class, 'factory')) {
                $news = \App\Models\News::factory()->count($count)->create();
                $tag->news()->attach($news->pluck('id')->toArray());
            }
        });
    }
}


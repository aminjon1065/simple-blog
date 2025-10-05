<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class TagsNewsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $news = \App\Models\News::all();
        $tags = \App\Models\Tag::all();

        return [
            'news_id' => $news->random()->id,
            'tag_id' => $tags->random()->id,
        ];
    }
}

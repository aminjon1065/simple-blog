<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\News>
 */
class NewsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = \App\Models\Category::all();
        return [
            'title' => $this->faker->sentence(),
            'slug' => $this->faker->slug(),
            'content' => $this->faker->paragraphs(3, true),
            'category_id' => $categories->random()->id,
            'is_published' => $this->faker->boolean(80), // 80% chance of being true
            'published_at' => $this->faker->dateTimeBetween('-1 years', 'now'),
            'author_id' => 1,
            'image' => '/news-image/1.webp',
            'meta_title' => $this->faker->sentence(),
            'meta_description' => $this->faker->sentence(),
            'is_breaking_news' => $this->faker->boolean(),
            'show_at_slider' => $this->faker->boolean(),
            'show_at_popular' => $this->faker->boolean(),
            'is_approved' => $this->faker->boolean(70), // 70% chance of being true
            'status' => $this->faker->boolean(90), // 90% chance of being true
            'views' => $this->faker->numberBetween(0, 10000),
        ];
    }
}

<?php

namespace Database\Seeders;

use Database\Factories\TagsNewsFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TagsNewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create tags and attach generated news to each tag.
        // TagFactory::withNews will create related News (if News factory exists) and attach them.
        \App\Models\Tag::factory()->count(100)->withNews(2)->create();
    }
}

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
        \App\Models\Tag::with('news')->factory(100)->create();
    }
}

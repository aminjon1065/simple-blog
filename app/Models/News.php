<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'slug', 'content', 'image', 'category_id', 'author_id', 'meta_title', 'meta_description', 'is_breaking_news', 'show_at_slider', 'show_at_popular', 'is_approved', 'status', 'views', 'is_published', 'published_at'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'news_tags', 'news_id', 'tag_id');
    }
}

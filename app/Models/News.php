<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

// app/Models/News.php
class News extends Model
{
    use HasFactory;

    protected $fillable = [
        'title','slug','content','image','category_id','author_id',
        'meta_title','meta_description',
        'is_breaking_news','show_at_slider','show_at_popular',
        'is_approved','status','views','is_published','published_at'
    ];

    protected $casts = [
        'is_breaking_news' => 'boolean',
        'show_at_slider'   => 'boolean',
        'show_at_popular'  => 'boolean',
        'is_approved'      => 'boolean',
        'is_published'     => 'boolean',
        'published_at'     => 'datetime',
    ];

    // --- relations ---
    public function category(): BelongsTo { return $this->belongsTo(Category::class); }
    public function author(): BelongsTo { return $this->belongsTo(User::class, 'author_id'); }
    public function tags(): BelongsToMany { return $this->belongsToMany(Tag::class, 'news_tags', 'news_id', 'tag_id'); }

    // --- scopes ---
    public function scopeSearch($q, ?string $term)
    {
        if (!$term = trim($term ?? '')) return $q;
        return $q->where(function ($qq) use ($term) {
            $qq->where('title', 'like', "%{$term}%")
                ->orWhere('slug', 'like', "%{$term}%")
                ->orWhere('content', 'like', "%{$term}%");
        });
    }

    public function scopeCategory($q, $categoryId)
    {
        if (!$categoryId) return $q;
        return $q->where('category_id', $categoryId);
    }

    public function scopeAuthor($q, $authorId)
    {
        if (!$authorId) return $q;
        return $q->where('author_id', $authorId);
    }

    public function scopeTag($q, $tagId)
    {
        if (!$tagId) return $q;
        return $q->whereHas('tags', fn ($tq) => $tq->where('tags.id', $tagId));
    }

    public function scopeApproved($q, $val)
    {
        if ($val === null || $val === '') return $q;
        return $q->where('is_approved', (bool)$val);
    }

    public function scopePublished($q, $val)
    {
        if ($val === null || $val === '') return $q;
        return $q->where('is_published', (bool)$val);
    }

    public function scopeStatus($q, $status)
    {
        if ($status === null || $status === '') return $q;
        return $q->where('status', (int)$status);
    }

    public function scopePublishedBetween($q, ?string $from, ?string $to)
    {
        if (!$from && !$to) return $q;
        // ожидаем строки формата 'YYYY-MM-DD'
        return $q->when($from, fn ($qq) => $qq->whereDate('published_at', '>=', $from))
            ->when($to,   fn ($qq) => $qq->whereDate('published_at', '<=', $to));
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Comment extends Model
{
    protected $fillable = ['news_id', 'user_id', 'parent_id', 'comment'];

    public function news(): BelongsTo
    {
        return $this->belongsTo(News::class);
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }
    public function children(): HasMany
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }
}

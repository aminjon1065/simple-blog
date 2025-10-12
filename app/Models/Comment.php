<?php
// app/Models/Comment.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Comment extends Model
{
    protected $fillable = ['news_id', 'user_id', 'parent_id', 'comment', 'is_approved'];
    protected $casts   = ['is_approved' => 'boolean'];

    public function news(): BelongsTo   { return $this->belongsTo(News::class); }
    public function user(): BelongsTo   { return $this->belongsTo(User::class); }
    public function parent(): BelongsTo { return $this->belongsTo(Comment::class, 'parent_id'); }

    // Только одобренные потомки (для публичного дерева)
    public function childrenApproved(): HasMany
    {
        return $this->hasMany(Comment::class, 'parent_id')
            ->where('is_approved', true)
            ->orderBy('created_at');
    }

    // Скоупы
    public function scopeForNews($q, $newsId) // ← убираем строгий int
    {
        if (!$newsId) return $q;               // если null — просто не фильтруем
        return $q->where('news_id', $newsId);
    }
    // Видимость: одобренные + свои (для авторизованного пользователя)
    public function scopeVisibleFor($q, ?int $userId)
    {
        return $q->where(function ($qq) use ($userId) {
            $qq->where('is_approved', true);
            if ($userId) {
                $qq->orWhere('user_id', $userId);
            }
        });
    }

    public function children(): HasMany
    {
        return $this->hasMany(Comment::class, 'parent_id')->orderBy('created_at');
    }
}

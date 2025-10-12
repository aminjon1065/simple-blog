<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'show_at_nav', 'status'];

    public function news(): HasMany
    {
        return $this->hasMany(News::class);
    }

    protected $casts = [
        'show_at_nav' => 'boolean',
        'status' => 'boolean'
    ];

}

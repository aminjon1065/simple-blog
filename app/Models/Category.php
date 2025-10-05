<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Category extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'slug', 'show_at_nav', 'status'];

    public function news()
    {
        return $this->hasMany(News::class);
    }

}

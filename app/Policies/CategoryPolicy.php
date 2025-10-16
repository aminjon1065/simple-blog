<?php

namespace App\Policies;

use App\Models\Category;
use App\Models\User;

class CategoryPolicy
{
    // список/просмотр
    public function viewAny(User $user): bool { return true; }
    public function view(User $user, Category $category): bool { return true; }

    // CRUD
    public function create(User $user): bool { return true; }
    public function update(User $user, Category $category): bool { return true; }
    public function delete(User $user, Category $category): bool { return true; }

    // Кастомное действие: переключение флагов
    public function toggle(User $user, Category $category): bool { return true; }
}

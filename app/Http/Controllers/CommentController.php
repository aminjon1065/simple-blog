<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\News;
use App\Notifications\CommentSubmitted;
use Auth;
use Config;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CommentController extends Controller
{

    public function index(Request $request)
    {
        $search = (string)$request->input('search', '');
        $approved = $request->input('approved'); // '', '0', '1'

        $comments = Comment::query()
            ->with(['news:id,title,slug', 'user:id,name'])
            ->when($search !== '', function ($q) use ($search) {
                $q->where('comment', 'like', "%{$search}%");
            })
            ->when($approved !== null && $approved !== '', function ($q) use ($approved) {
                $q->where('is_approved', (bool)$approved);
            })
            ->latest('created_at')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/comments/index', [
            'comments' => $comments,
            'filters' => [
                'search' => $search,
                'approved' => $approved ?? '',
            ],
        ]);
    }

    public function approve(Request $request, Comment $comment)
    {
        $data = $request->validate([
            'value' => ['required', Rule::in([0, 1])],
        ]);

        $comment->update(['is_approved' => (bool)$data['value']]);

        return back()->with('success', 'Статус модерации обновлён.');
    }


    public function store(Request $request, News $news)
    {
        $validated = $request->validate([
            'comment' => ['required', 'string', 'max:2000'],
            'parent_id' => [
                'nullable', 'integer',
                Rule::exists('comments', 'id')->where('news_id', $news->id),
            ],
        ]);

        $comment = Comment::create([
            'news_id' => $news->id,
            'user_id' => Auth::id(),
            'parent_id' => $validated['parent_id'] ?? null,
            'comment' => $validated['comment'],
            'is_approved' => false, // <-- на модерации
        ]);
        $adminEmail = Config::get('mail.admin');
        if ($adminEmail) {
            Notification::route('mail', $adminEmail)->notify(new CommentSubmitted($comment));
        }
        return back()->with('success', 'Комментарий отправлен на модерацию и станет виден после одобрения.');
    }
}

<?php

namespace App\Notifications;

use App\Models\Comment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CommentSubmitted extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public Comment $comment)
    {
        //
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $news = $this->comment->news;
        $author = $this->comment->user?->name ?? 'Неизвестно';

        return (new MailMessage)
            ->subject('Новый комментарий на сайте')
            ->greeting('Здравствуйте!')
            ->line("Поступил новый комментарий к новости: «{$news->title}».")
            ->line("Автор: {$author}")
            ->line("Текст: {$this->comment->comment}")
            ->action('Открыть комментарии', url('/admin/comments'))
            ->line('Это уведомление отправлено автоматически.');
    }
    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}

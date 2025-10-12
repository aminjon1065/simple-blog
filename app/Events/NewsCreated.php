<?php

namespace App\Events;

use App\Models\News;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewsCreated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public News $news) {}

    public function broadcastOn(): Channel { return new Channel('news'); }
    public function broadcastAs(): string { return 'news.created'; }
    public function broadcastWith(): array {
        return [
            'id' => $this->news->id,
            'title' => $this->news->title,
            'slug' => $this->news->slug,
            'excerpt' => str()->limit(strip_tags($this->news->content), 160),
            'published_at' => optional($this->news->published_at)?->toISOString(),
            'image' => $this->news->image,
        ];
    }
}


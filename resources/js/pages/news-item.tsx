import CommentItem from '@/components/comment-item';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import MainLayout from '@/layouts/app/main-layout';
import { formatDate } from '@/lib/formatDate';
import comment from '@/routes/comment';
import type { CommentNode, NewsItem } from '@/types/news';
import { Link, useForm } from '@inertiajs/react';
import { User2Icon } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
type Props = {
    newsArticle: NewsItem;
};

const ShowNewsItem = ({ newsArticle }: Props) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [replyTo, setReplyTo] = useState<{
        id: number;
        author: string;
    } | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        comment: '',
        news_id: newsArticle.id,
        parent_id: null as number | null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(comment.store(newsArticle.id).url, {
            preserveScroll: true,
            onSuccess: () => {
                reset('comment');
                setData('parent_id', null);
                setReplyTo(null);
                toast.success(
                    'Коммент успешно добавлен, после одобрения будет всем видна!',
                );
            },
        });
    };

    const handleReply = (c: { id: number; user: { name: string } }) => {
        setData('parent_id', c.id);
        setReplyTo({ id: c.id, author: c.user.name });
        // фокус в поле ввода
        setTimeout(() => textareaRef.current?.focus(), 0);
    };

    const cancelReply = () => {
        setData('parent_id', null);
        setReplyTo(null);
    };

    // Если нужен порядок — можно отсортировать по created_at
    const comments = useMemo<CommentNode[]>(
        () => newsArticle.comments ?? [],
        [newsArticle.comments],
    );

    return (
        <MainLayout>
            <section className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
                <article>
                    <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
                        <header className="pt-6 xl:pb-6">
                            <div className="space-y-1 text-center">
                                <dl className="space-y-10">
                                    <div>
                                        <dt className="sr-only">
                                            Опубликовано
                                        </dt>
                                        <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                                            <time dateTime="2021-05-02T00:00:00.000Z">
                                                {formatDate(
                                                    newsArticle.published_at,
                                                )}
                                            </time>
                                        </dd>
                                    </div>
                                </dl>
                                <div>
                                    <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100">
                                        {newsArticle.title}
                                    </h1>
                                </div>
                            </div>
                        </header>
                        <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0 dark:divide-gray-700">
                            <dl className="pt-6 pb-10 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
                                <dt className="sr-only">
                                    {newsArticle.author?.name}
                                </dt>
                                <dd>
                                    <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-y-8 xl:space-x-0">
                                        <li className="flex items-center space-x-2">
                                            <User2Icon className="h-10 w-10 rounded-full" />
                                            <dl className="text-sm leading-5 font-medium whitespace-nowrap">
                                                <dt className="sr-only">
                                                    Name
                                                </dt>
                                                <dd className="text-gray-900 dark:text-gray-100">
                                                    {newsArticle.author?.name}
                                                </dd>
                                            </dl>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <div className="divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0 dark:divide-gray-700">
                                <div className="prose dark:prose-invert max-w-none pt-10 pb-8 w-full">
                                    {newsArticle.image && (
                                        <div
                                            className={
                                                'flex items-center justify-center'
                                            }
                                        >
                                            {newsArticle.image && (
                                                <img
                                                    src={newsArticle.image}
                                                    alt="Image post"
                                                    className={"rounded-md w-full"}
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="prose dark:prose-invert max-w-none pt-10 pb-8">
                                    {newsArticle.content}
                                </div>
                                <section className="pt-6 pb-4">
                                    <h2 className="mb-3 text-lg font-semibold dark:text-gray-100">
                                        Комментарии
                                    </h2>
                                    <div className="space-y-4">
                                        {comments?.length ? (
                                            comments.map((c) => (
                                                <CommentItem
                                                    key={c.id}
                                                    c={c}
                                                    onReply={handleReply}
                                                />
                                            ))
                                        ) : (
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Будьте первым, кто оставит
                                                комментарий.
                                            </p>
                                        )}
                                    </div>
                                </section>

                                {/* === Форма комментария === */}
                                <div className="pt-4 pb-6 text-sm text-gray-700 xl:col-span-3 dark:text-gray-300">
                                    {/* Плашка «Отвечаете на …» */}
                                    {replyTo && (
                                        <div className="mb-2 flex items-center justify-between rounded-md border px-3 py-2 text-xs dark:border-gray-700">
                                            <span>
                                                Отвечаете на комментарий
                                                пользователя{' '}
                                                <b>{replyTo.author}</b>
                                            </span>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={cancelReply}
                                            >
                                                Отменить
                                            </Button>
                                        </div>
                                    )}

                                    <form
                                        onSubmit={submit}
                                        className="grid w-full gap-2"
                                    >
                                        <Textarea
                                            ref={textareaRef}
                                            value={data.comment}
                                            onChange={(e) =>
                                                setData(
                                                    'comment',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder={
                                                replyTo
                                                    ? 'Ваш ответ…'
                                                    : 'Написать комментарий…'
                                            }
                                        />
                                        {errors.comment && (
                                            <p className="text-xs text-red-500">
                                                {errors.comment}
                                            </p>
                                        )}

                                        {/* скрытые поля */}
                                        <input
                                            type="hidden"
                                            name="news_id"
                                            value={data.news_id}
                                        />
                                        {data.parent_id && (
                                            <input
                                                type="hidden"
                                                name="parent_id"
                                                value={data.parent_id}
                                            />
                                        )}

                                        <Button
                                            type="submit"
                                            disabled={processing}
                                        >
                                            {processing
                                                ? 'Отправляю…'
                                                : replyTo
                                                  ? 'Ответить'
                                                  : 'Комментировать'}
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <footer>
                            {newsArticle.tags?.length ? (
                                <div className="divide-gray-200 text-sm leading-5 font-medium xl:divide-y dark:divide-gray-700">
                                    <div className="py-4 xl:py-8">
                                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                                            Теги
                                        </h2>
                                        <ul className="mt-2 flex flex-wrap gap-2">
                                            {newsArticle.tags.map((tag) => (
                                                <Badge
                                                    variant="default"
                                                    key={tag.id}
                                                >
                                                    {/* Если есть slug у тега — замени href на /tags/{slug} */}
                                                    {tag.name}
                                                </Badge>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ) : null}
                            <div className="pt-4 xl:pt-8">
                                <Link
                                    href="/news"
                                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                    aria-label="Back to the blog"
                                >
                                    &larr; Все новости
                                </Link>
                            </div>
                        </footer>
                    </div>
                </article>
            </section>
        </MainLayout>
    );
};

export default ShowNewsItem;

import { router } from '@inertiajs/react';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import { PaginationBar } from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/lib/formatDate';

import { NewsItem } from '@/types/news';
import { PaginatedResponse } from '@/types/pagination-response';

type Props = {
    news: PaginatedResponse<NewsItem>;
};

export default function NewsTable({ news }: Props) {
    const items = useMemo(() => news?.data ?? [], [news?.data]);

    // loading map: "<id>:field"
    const [loading, setLoading] = useState<Record<string, boolean>>({});
    const setBusy = (key: string, val: boolean) =>
        setLoading((s) => ({ ...s, [key]: val }));

    const toggleField = (
        id: number | string,
        field:
            | 'is_published'
            | 'is_approved'
            | 'show_at_slider'
            | 'show_at_popular'
            | 'is_breaking_news',
        next: boolean,
    ) => {
        const key = `${id}:${field}`;
        setBusy(key, true);

        router.patch(
            `/admin/news-status/${id}`,
            { field, value: next ? 1 : 0 },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                onSuccess: () => toast.success('Статус обновлён'),
                onError: () => toast.error('Не удалось обновить'),
                onFinish: () => setBusy(key, false),
            },
        );
    };

    const deleteNews = (id: number | string) => {
        const key = `${id}:delete`;
        if (!confirm('Удалить новость? Действие необратимо.')) return;
        setBusy(key, true);
        router.delete(`/admin/news/${id}`, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            onFinish: () => setBusy(key, false),
        });
    };

    return (
        <>
            <Table>
                <TableCaption>
                    <div className="mb-2 flex justify-end">
                        <PaginationBar pagination={news} />
                    </div>
                </TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[84px]">ID</TableHead>
                        <TableHead>Заголовок</TableHead>
                        <TableHead>Категория</TableHead>
                        <TableHead>Автор</TableHead>
                        <TableHead className="w-[140px]">
                            Опубликовано
                        </TableHead>
                        <TableHead className="w-[140px]">Одобрено</TableHead>
                        <TableHead className="w-[140px]">Слайдер</TableHead>
                        <TableHead className="w-[140px]">Популярное</TableHead>
                        <TableHead className="w-[140px]">Молния</TableHead>
                        <TableHead className="w-[160px]">
                            Дата публикации
                        </TableHead>
                        <TableHead className="w-[140px] text-right">
                            Действие
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {items.length ? (
                        items.map((n) => {
                            const busyPub = loading[`${n.id}:is_published`];
                            const busyApr = loading[`${n.id}:is_approved`];
                            const busySl = loading[`${n.id}:show_at_slider`];
                            const busyPop = loading[`${n.id}:show_at_popular`];
                            const busyBrk = loading[`${n.id}:is_breaking_news`];
                            const busyDel = loading[`${n.id}:delete`];
                            return (
                                <TableRow key={n.id}>
                                    <TableCell className="font-medium">
                                        {n.id}
                                    </TableCell>
                                    <TableCell
                                        className="max-w-[320px] truncate"
                                        title={n.title}
                                    >
                                        {n.title}
                                    </TableCell>
                                    <TableCell>
                                        {n.category?.name ?? '—'}
                                    </TableCell>
                                    <TableCell>
                                        {n.author?.name ?? '—'}
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                id={`pub-${n.id}`}
                                                checked={Boolean(
                                                    n.is_published,
                                                )}
                                                onCheckedChange={(next) =>
                                                    toggleField(
                                                        n.id,
                                                        'is_published',
                                                        next,
                                                    )
                                                }
                                                disabled={busyPub}
                                            />
                                            <label
                                                htmlFor={`pub-${n.id}`}
                                                className="text-sm text-muted-foreground"
                                            >
                                                {n.is_published ? 'Да' : 'Нет'}
                                            </label>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                id={`apr-${n.id}`}
                                                checked={Boolean(n.is_approved)}
                                                onCheckedChange={(next) =>
                                                    toggleField(
                                                        n.id,
                                                        'is_approved',
                                                        next,
                                                    )
                                                }
                                                disabled={busyApr}
                                            />
                                            <label
                                                htmlFor={`apr-${n.id}`}
                                                className="text-sm text-muted-foreground"
                                            >
                                                {n.is_approved ? 'Да' : 'Нет'}
                                            </label>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                id={`sl-${n.id}`}
                                                checked={Boolean(
                                                    n.show_at_slider,
                                                )}
                                                onCheckedChange={(next) =>
                                                    toggleField(
                                                        n.id,
                                                        'show_at_slider',
                                                        next,
                                                    )
                                                }
                                                disabled={busySl}
                                            />
                                            <label
                                                htmlFor={`sl-${n.id}`}
                                                className="text-sm text-muted-foreground"
                                            >
                                                {n.show_at_slider
                                                    ? 'Да'
                                                    : 'Нет'}
                                            </label>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                id={`pop-${n.id}`}
                                                checked={Boolean(
                                                    n.show_at_popular,
                                                )}
                                                onCheckedChange={(next) =>
                                                    toggleField(
                                                        n.id,
                                                        'show_at_popular',
                                                        next,
                                                    )
                                                }
                                                disabled={busyPop}
                                            />
                                            <label
                                                htmlFor={`pop-${n.id}`}
                                                className="text-sm text-muted-foreground"
                                            >
                                                {n.show_at_popular
                                                    ? 'Да'
                                                    : 'Нет'}
                                            </label>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                id={`brk-${n.id}`}
                                                checked={Boolean(
                                                    n.is_breaking_news,
                                                )}
                                                onCheckedChange={(next) =>
                                                    toggleField(
                                                        n.id,
                                                        'is_breaking_news',
                                                        next,
                                                    )
                                                }
                                                disabled={busyBrk}
                                            />
                                            <label
                                                htmlFor={`brk-${n.id}`}
                                                className="text-sm text-muted-foreground"
                                            >
                                                {n.is_breaking_news
                                                    ? 'Да'
                                                    : 'Нет'}
                                            </label>
                                        </div>
                                    </TableCell>

                                    <TableCell className="whitespace-nowrap">
                                        {n.published_at
                                            ? formatDate(n.published_at)
                                            : '—'}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                title="Редактировать"
                                                onClick={() =>
                                                    router.get(
                                                        `/admin/news/${n.id}/edit`,
                                                    )
                                                }
                                            >
                                                <PencilIcon className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                title="Удалить"
                                                onClick={() => deleteNews(n.id)}
                                                disabled={busyDel}
                                            >
                                                <Trash2Icon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={11}
                                className="py-8 text-center text-sm text-muted-foreground"
                            >
                                Нет новостей
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}

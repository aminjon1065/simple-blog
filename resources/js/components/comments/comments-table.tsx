import { Link, router } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import { PaginationBar } from '@/components/pagination';
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
import { PaginatedResponse } from '@/types/paginate-response';

type CommentRow = {
    id: number | string;
    comment: string;
    is_approved: boolean;
    created_at: string;
    user?: { id: number; name: string } | null;
    news?: { id: number; title: string; slug: string } | null;
};

type Props = { comments: PaginatedResponse<CommentRow> };

export default function CommentsTable({ comments }: Props) {
    const items = useMemo(() => comments?.data ?? [], [comments?.data]);
    const [loading, setLoading] = useState<Record<string, boolean>>({});
    const setBusy = (key: string, val: boolean) =>
        setLoading((s) => ({ ...s, [key]: val }));

    const toggleApprove = (id: number | string, next: boolean) => {
        const key = `${id}:approve`;
        setBusy(key, true);
        router.patch(
            `/admin/comments/${id}/approve`,
            { value: next ? 1 : 0 },
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

    return (
        <>
            <Table>
                <TableCaption>
                    <div className="mb-2 flex justify-end">
                        <PaginationBar pagination={comments} />
                    </div>
                </TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[84px]">ID</TableHead>
                        <TableHead>Новость</TableHead>
                        <TableHead>Пользователь</TableHead>
                        <TableHead>Комментарий</TableHead>
                        <TableHead className="w-[140px]">Одобрен</TableHead>
                        <TableHead className="w-[180px]">Создан</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {items.length ? (
                        items.map((c) => {
                            const busy = loading[`${c.id}:approve`];
                            return (
                                <TableRow key={c.id}>
                                    <TableCell className="font-medium">
                                        {c.id}
                                    </TableCell>

                                    <TableCell
                                        className="max-w-[280px] truncate"
                                        title={c.news?.title ?? ''}
                                    >
                                        {c.news?.slug ? (
                                            <Link
                                                href={`/news/${c.news.slug}`}
                                                className="text-primary underline-offset-2 hover:underline"
                                            >
                                                {c.news?.title ?? '—'}
                                            </Link>
                                        ) : (
                                            (c.news?.title ?? '—')
                                        )}
                                    </TableCell>

                                    <TableCell>{c.user?.name ?? '—'}</TableCell>

                                    <TableCell
                                        className="max-w-[420px] truncate"
                                        title={c.comment}
                                    >
                                        {c.comment}
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                id={`apr-${c.id}`}
                                                checked={Boolean(c.is_approved)}
                                                onCheckedChange={(next) =>
                                                    toggleApprove(c.id, next)
                                                }
                                                disabled={busy}
                                            />
                                            <label
                                                htmlFor={`apr-${c.id}`}
                                                className="text-sm text-muted-foreground"
                                            >
                                                {c.is_approved ? 'Да' : 'Нет'}
                                            </label>
                                        </div>
                                    </TableCell>

                                    <TableCell className="whitespace-nowrap">
                                        {new Date(
                                            c.created_at,
                                        ).toLocaleString()}
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={6}
                                className="py-8 text-center text-sm text-muted-foreground"
                            >
                                Нет комментариев
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}

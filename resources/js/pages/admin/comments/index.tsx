import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { BreadcrumbItem, } from '@/types';
import { PaginatedResponse } from '@/types/pagination-response';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import CommentsTable from '@/components/comments/comments-table';

type CommentRow = {
    id: number;
    comment: string;
    is_approved: boolean;
    created_at: string;
    user?: { id: number; name: string } | null;
    news?: { id: number; title: string; slug: string } | null;
};

type Props = {
    comments: PaginatedResponse<CommentRow>;
    filters: { search?: string; approved?: '' | '0' | '1' };
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin' },
    { title: 'Комментарии', href: '/admin/comments' },
];

export default function Index({ comments, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/comments', { ...filters, search }, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Комментарии" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center md:justify-between">
                        <form onSubmit={submit} className="relative mt-2 flex w-full max-w-sm items-center sm:flex-auto">
                            <Input
                                id="comments-search"
                                name="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Поиск по тексту комментария…"
                                autoComplete="off"
                            />
                            <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                                <button
                                    type="submit"
                                    className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400"
                                >
                                    <kbd>Enter</kbd>
                                </button>
                            </div>
                        </form>
                    </div>

                    <CommentsTable comments={comments} />
                </div>
            </div>
        </AppLayout>
    );
}

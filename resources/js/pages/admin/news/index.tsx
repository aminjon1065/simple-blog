import NewsForm from '@/components/news/news-form';
import NewsTable from '@/components/news/news-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes/admin';
import { BreadcrumbItem } from '@/types';
import { Category, NewsItem } from '@/types/news';
import { PaginatedResponse } from '@/types/pagination-response';
import { Head, router } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Новости', href: '/admin/news' },
];

type Filters = {
    search?: string;
    category_id?: number | string | null;
    author_id?: number | string | null;
    published?: '' | '0' | '1';
    approved?: '' | '0' | '1';
    sort?: 'published_desc' | 'published_asc' | 'created_desc' | 'views_desc';
};

type Props = {
    news: PaginatedResponse<NewsItem>;
    filters: Filters;
    categories: Category[];
};

export default function Index({ news, filters, categories }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [openCreate, setOpenCreate] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/admin/news',
            { ...filters, search },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                // only: ['news', 'filters'],
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Новости" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center md:justify-between">
                        <form
                            onSubmit={submit}
                            className="relative mt-2 flex w-full max-w-sm items-center sm:flex-auto"
                        >
                            <Input
                                id="news-search"
                                name="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Поиск по заголовку/контенту…"
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

                        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                            <Button
                                variant="outline"
                                onClick={() => setOpenCreate(true)}
                            >
                                <PlusIcon className="mr-1 h-4 w-4" />
                                Добавить новость
                            </Button>
                            {/* Модал создания (реализуешь по аналогии с CreateCategoryForm) */}
                            {openCreate && (
                                <NewsForm
                                    open={openCreate}
                                    onOpenChange={setOpenCreate}
                                    categories={categories}
                                />
                            )}
                        </div>
                    </div>

                    <NewsTable news={news} />
                </div>
            </div>
        </AppLayout>
    );
}

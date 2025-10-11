import CategoriesTable from '@/components/category/categories-table';
import CreateCategoryForm from '@/components/category/category-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes/admin';
import { BreadcrumbItem } from '@/types';
import { Category } from '@/types/news';
import { PaginatedResponse } from '@/types/pagination-response';
import { Head, router } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Категории',
        href: '/dashboard/admin/categories',
    },
];

type Props = {
    categories: PaginatedResponse<Category>;
    filters: { search: string };
};

const Index = ({ categories, filters }: Props) => {
    const [search, setSearch] = useState(filters.search ?? '');
    const [open, setOpen] = useState(false);
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/admin/category',
            { search },
            { preserveScroll: true, preserveState: true },
        );
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Категории" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center md:justify-between">
                        <form
                            onSubmit={handleSearch}
                            className="relative mt-2 flex w-full max-w-sm items-center sm:flex-auto"
                        >
                            <Input
                                type={'text'}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                name={'search'}
                                placeholder={'Поиск...'}
                                id={'search'}
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
                                onClick={() => {
                                    setOpen(true);
                                }}
                                variant={'outline'}
                            >
                                <PlusIcon />
                                Добавить категорию
                            </Button>
                            {open && (
                                <CreateCategoryForm
                                    open={open}
                                    onOpenChange={setOpen}
                                />
                            )}
                        </div>
                    </div>
                    <CategoriesTable categories={categories} />
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;

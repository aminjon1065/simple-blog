
import CategoriesTable from '@/components/categories-table';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes/admin';
import { BreadcrumbItem } from '@/types';
import { Category } from '@/types/news';
import { Head } from '@inertiajs/react';
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

const Index = ({ categories }: { categories: Category[] }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Категории" />
            <CategoriesTable categories={categories} />
        </AppLayout>
    );
};

export default Index;

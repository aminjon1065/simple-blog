import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes/admin';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Категории',
        href: '/dashboard/admin/news',
    },
];
const Index = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Новости" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Новости
                </h1>
                <p className="text-gray-700 dark:text-gray-300">
                    Здесь будет список новостей.
                </p>
        </AppLayout>
    );
};

export default Index;

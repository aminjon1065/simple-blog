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
        href: '/dashboard/admin/categories',
    },
];

const Index = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Категории" />
            <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto,
                vitae.
            </span>
        </AppLayout>
    );
};

export default Index;

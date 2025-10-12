import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import admin, { dashboard } from '@/routes/admin';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Теги', href: admin.adminTags.index().url },
];

const Index = () => {

    return (
        <AppLayout
            breadcrumbs={breadcrumbs}
        >
            <Head title={'Теги'} />
            Теги
        </AppLayout>
    );
};

export default Index;

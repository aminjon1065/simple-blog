import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({
    categoryCount,
    newsCount,
}: {
    categoryCount: number;
    newsCount: number;
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <div className="flex h-full flex-col items-center justify-center">
                            <h3>{categoryCount}</h3>
                            <h3>Количество категорий</h3>
                        </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <div className="flex h-full flex-col items-center justify-center">
                            <h3>{newsCount}</h3>
                            <h3>Количество новостей</h3>
                        </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <div className="flex h-full flex-col items-center justify-center">
                            <h3>10</h3>
                            <h3>Количество тегов</h3>
                        </div>
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="flex h-full flex-col items-center justify-center">
                        <h3>
                            Тут что нибудь по типу Таблица, графика, подписчики,
                            комментарии или что нибудь
                        </h3>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

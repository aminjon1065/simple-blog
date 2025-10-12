import { UpdateCategory } from '@/components/category/update-category';
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
import { Category } from '@/types/news';
import { PaginatedResponse } from '@/types/pagination-response';
import { router } from '@inertiajs/react';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { PaginationBar } from '../pagination';
import { Button } from '../ui/button';

type Props = {
    categories: PaginatedResponse<Category>;
};

export default function CategoriesTable({ categories }: Props) {
    const items = useMemo(() => categories?.data ?? [], [categories?.data]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(
        null,
    );
    const [open, setOpen] = useState(false);
    // loading map: { "<id>:show_at_nav": boolean, "<id>:status": boolean, "<id>:delete": boolean }
    const [loading, setLoading] = useState<Record<string, boolean>>({});

    const setBusy = (key: string, val: boolean) =>
        setLoading((s) => ({ ...s, [key]: val }));

    const toggleField = (
        categoryId: number | string,
        field: 'show_at_nav' | 'status',
        next: boolean,
    ) => {
        const key = `${categoryId}:${field}`;
        setBusy(key, true);
        router.patch(
            `/admin/category-status/${categoryId}`,
            { field, value: next ? 1 : 0 },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                onSuccess: () => {
                    toast.success('Успешно обновлено.');
                },
                onFinish: () => setBusy(key, false),
                onError: () => {
                    console.log('Error getting category status');
                },
            },
        );
    };

    const deleteCategory = (categoryId: number | string) => {
        const key = `${categoryId}:delete`;
        if (!confirm('Удалить категорию? Это действие нельзя отменить.'))
            return;
        setBusy(key, true);
        router.delete(`/admin/category/${categoryId}`, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            onFinish: () => setBusy(key, false),
            onSuccess: () => {
                toast.success('Успешно удалено');
            },
        });
    };

    return (
        <>
            <Table>
                <TableCaption>
                    <div className="mb-2 flex justify-end">
                        <PaginationBar pagination={categories} />
                    </div>
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[96px]">ID</TableHead>
                        <TableHead>Название</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead className="w-[160px]">
                            Показать в меню
                        </TableHead>
                        <TableHead className="w-[120px]">Статус</TableHead>
                        <TableHead className="w-[160px]">Создано</TableHead>
                        <TableHead className="w-[140px] text-right">
                            Действие
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {items.length > 0 ? (
                        items.map((category) => {
                            const showAtNavChecked = Boolean(
                                category.show_at_nav,
                            );
                            const statusChecked = Boolean(category.status);
                            const busyShow =
                                loading[`${category.id}:show_at_nav`];
                            const busyStatus = loading[`${category.id}:status`];
                            const busyDelete = loading[`${category.id}:delete`];
                            return (
                                <TableRow key={category.id}>
                                    <TableCell className="font-medium">
                                        {category.id}
                                    </TableCell>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {category.slug}
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                id={`show-${category.id}`}
                                                checked={showAtNavChecked}
                                                onCheckedChange={(next) =>
                                                    toggleField(
                                                        category.id,
                                                        'show_at_nav',
                                                        next,
                                                    )
                                                }
                                                disabled={busyShow}
                                                aria-label="Показывать в меню"
                                            />
                                            <label
                                                htmlFor={`show-${category.id}`}
                                                className="text-sm text-muted-foreground"
                                            >
                                                {showAtNavChecked
                                                    ? 'Включено'
                                                    : 'Выключено'}
                                            </label>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                id={`status-${category.id}`}
                                                checked={statusChecked}
                                                onCheckedChange={(next) =>
                                                    toggleField(
                                                        category.id,
                                                        'status',
                                                        next,
                                                    )
                                                }
                                                disabled={busyStatus}
                                                aria-label="Статус категории"
                                            />
                                            <label
                                                htmlFor={`status-${category.id}`}
                                                className="text-sm text-muted-foreground"
                                            >
                                                {statusChecked
                                                    ? 'Активна'
                                                    : 'Отключена'}
                                            </label>
                                        </div>
                                    </TableCell>

                                    <TableCell className="whitespace-nowrap">
                                        {formatDate(category.created_at)}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                title="Редактировать"
                                                onClick={() => {
                                                    setSelectedCategory(
                                                        category,
                                                    );
                                                    setOpen(true);
                                                }}
                                            >
                                                <PencilIcon className="h-4 w-4" />
                                            </Button>

                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                title="Удалить"
                                                onClick={() =>
                                                    deleteCategory(category.id)
                                                }
                                                disabled={busyDelete}
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
                                colSpan={7}
                                className="py-8 text-center text-sm text-muted-foreground"
                            >
                                Нет категорий
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <UpdateCategory
                open={open}
                onOpenChange={setOpen}
                item={selectedCategory}
            />
        </>
    );
}

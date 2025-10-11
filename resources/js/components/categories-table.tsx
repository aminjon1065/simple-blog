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

//Switch-и надо делать кликабельными

import formatDate from '@/lib/formatDate';
import { Category } from '@/types/news';
import { PaginatedResponse } from '@/types/pagination-response';
import { Link } from '@inertiajs/react';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { PaginationBar } from './pagination';
import { Button } from './ui/button';

type Props = {
    categories: PaginatedResponse<Category>;
};

const CategoriesTable = ({ categories }: Props) => {
    const items = categories?.data ?? [];

    return (
        <>
            <Table>
                <TableCaption>
                    <div className="flex justify-end">
                        <PaginationBar pagination={categories} />
                    </div>
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Название</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Показать в меню</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Создано</TableHead>
                        <TableHead className="text-right">Действие</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.length > 0 ? (
                        items.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell className="font-medium">
                                    {category.id}
                                </TableCell>
                                <TableCell>{category.name}</TableCell>
                                <TableCell>{category.slug}</TableCell>
                                <TableCell>
                                    <Switch
                                        defaultChecked={
                                            category.show_at_nav === 1
                                                ? true
                                                : false
                                        }
                                    />
                                </TableCell>
                                <TableCell>
                                    <Switch
                                        defaultChecked={
                                            category.status === 1 ? true : false
                                        }
                                    />
                                </TableCell>
                                <TableCell>
                                    {formatDate(`${category.created_at}`)}
                                </TableCell>
                                <TableCell className="flex justify-center space-x-3 text-right align-middle">
                                    <Button asChild variant="outline">
                                        <Link href="#">
                                            <PencilIcon className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <Button variant={'destructive'}>
                                        <Trash2Icon className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={7}
                                className="py-8 text-center text-sm text-gray-500"
                            >
                                Нет категорий
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
};

export default CategoriesTable;

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

import formatDate from '@/lib/formatDate';
import { Category } from '@/types/news';
const CategoriesTable = ({ categories }: { categories: Category[] }) => {
    console.log(categories);

    return (
        <>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Название</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Показать в меню</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead className="text-right">Создано</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.map((category) => (
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
                            <TableCell>{category.status}</TableCell>
                            <TableCell className="text-right">
                                {formatDate(`${category.created_at}`)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default CategoriesTable;

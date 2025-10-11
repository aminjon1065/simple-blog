import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import admin from '@/routes/admin';
import { Category } from '@/types/news';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function UpdateCategory({
    open,
    onOpenChange,
    item,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    item: Category | null;
}) {
    const [name, setName] = useState('');
    const [status, setStatus] = useState(item?.status);
    const [showAtNav, setShowAtNav] = useState(item?.show_at_nav);
    // ⬇️ Когда item меняется — обновляем поля
    useEffect(() => {
        if (item) {
            setName(item.name);
            setStatus(item?.status);
            setShowAtNav(item?.show_at_nav);
        }
    }, [item]);

    const handleSubmit = () => {
        if (!item) return;
        router.patch(
            admin.category.update(item.id),
            { name, status, show_at_nav: showAtNav },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Категория обновлена');
                    onOpenChange(false);
                },
                onError: () => toast.error('Ошибка при обновлении'),
            },
        );
    };
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Редактировать категорию</DialogTitle>
                    <DialogDescription>
                        Здесь вы можете изменить название и иконку категории.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Название"
                    />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Отмена</Button>
                    </DialogClose>
                    <Button onClick={handleSubmit}>Сохранить</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

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
import admin from '@/routes/admin';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import { Input } from '../ui/input';

type CreateCategory = {
    name: string;
    status: boolean;
    show_at_nav: boolean;
};
const CreateCategoryForm = ({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) => {
    const { data, setData, post, processing, reset } = useForm<
        Required<CreateCategory>
    >({
        name: '',
        status: true,
        show_at_nav: true,
    });
    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(admin.category.store().url, {
            onSuccess: () => {
                reset();
                toast.success('Успешно создано!');
                onOpenChange(false);
            },
            onError: () => {
                toast.error('Ошибка при создании');
                onOpenChange(false);
            },
        });
    };
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Добавить категорию</DialogTitle>
                    <DialogDescription>
                        Здесь вы можете добавить название категории.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                    <Input
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Название"
                    />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Отмена</Button>
                    </DialogClose>
                    <Button disabled={processing} onClick={onSubmit}>
                        Сохранить
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default CreateCategoryForm;

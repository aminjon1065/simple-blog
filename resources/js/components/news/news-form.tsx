// components/news/news-form.tsx
import admin from '@/routes/admin';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

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
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type Option = { id: number | string; name: string };

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    categories: Option[]; // [{ id, name }]
};

type FormData = {
    title: string;
    content: string;
    image: File | null;
    category_id: number | string | '';
    // meta
    meta_title: string;
    meta_description: string;
    // flags
    is_breaking_news: boolean;
    show_at_slider: boolean;
    show_at_popular: boolean;
    is_approved: boolean;
    is_published: boolean;
    status: number; // 1|0
    // datetime
    published_at: string; // 'YYYY-MM-DDTHH:mm'
};

const NewsForm = ({ open, onOpenChange, categories }: Props) => {
    const { data, setData, post, processing, reset, errors, clearErrors } =
        useForm<FormData>({
            title: '',
            content: '',
            image: null,
            category_id: '',
            meta_title: '',
            meta_description: '',
            is_breaking_news: false,
            show_at_slider: false,
            show_at_popular: false,
            is_approved: true,
            is_published: false,
            status: 1,
            published_at: '',
        });

    const closeAndReset = () => {
        reset();
        clearErrors();
        onOpenChange(false);
    };

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(admin.adminNews.store().url, {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Новость создана');
                closeAndReset();
            },
            onError: () => {
                toast.error('Ошибка при создании');
            },
        });
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(o) => (o ? onOpenChange(o) : closeAndReset())}
        >
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Добавить новость</DialogTitle>
                    <DialogDescription>
                        Заполните поля ниже. Поля с * обязательны.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={onSubmit} className="space-y-5">
                    {/* Заголовок */}
                    <div>
                        <Label htmlFor="title">Заголовок *</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Например, 'Запуск портала...'"
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    {/* Категория + изображение */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="category_id">Категория *</Label>
                            <select
                                id="category_id"
                                className={cn(
                                    'w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
                                    'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none',
                                )}
                                value={data.category_id}
                                onChange={(e) =>
                                    setData('category_id', e.target.value)
                                }
                            >
                                <option value="">— выберите категорию —</option>
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category_id && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.category_id}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="image">Изображение</Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setData(
                                        'image',
                                        e.target.files?.[0] ?? null,
                                    )
                                }
                            />
                            {/* В NewsRequest правило должно быть под ключ 'image' */}
                            {'image' in errors && (
                                <p className="mt-1 text-sm text-red-500">
                                    {(errors as any).image}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Контент */}
                    <div>
                        <Label htmlFor="content">Контент *</Label>
                        <Textarea
                            id="content"
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            rows={8}
                            placeholder="Текст новости…"
                        />
                        {errors.content && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.content}
                            </p>
                        )}
                    </div>

                    {/* Метаданные */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="meta_title">Meta title</Label>
                            <Input
                                id="meta_title"
                                value={data.meta_title}
                                onChange={(e) =>
                                    setData('meta_title', e.target.value)
                                }
                                placeholder="SEO заголовок"
                            />
                            {errors.meta_title && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.meta_title}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="meta_description">
                                Meta description
                            </Label>
                            <Input
                                id="meta_description"
                                value={data.meta_description}
                                onChange={(e) =>
                                    setData('meta_description', e.target.value)
                                }
                                placeholder="Короткое описание для SEO"
                            />
                            {errors.meta_description && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.meta_description}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Флаги */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex items-center justify-between rounded-md border p-3">
                            <div>
                                <Label htmlFor="is_published">
                                    Опубликовать
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                    Показывать на сайте
                                </p>
                            </div>
                            <Switch
                                id="is_published"
                                checked={data.is_published}
                                onCheckedChange={(v) =>
                                    setData('is_published', v)
                                }
                            />
                        </div>

                        <div className="flex items-center justify-between rounded-md border p-3">
                            <div>
                                <Label htmlFor="is_approved">Одобрено</Label>
                                <p className="text-xs text-muted-foreground">
                                    Доступно редактором
                                </p>
                            </div>
                            <Switch
                                id="is_approved"
                                checked={data.is_approved}
                                onCheckedChange={(v) =>
                                    setData('is_approved', v)
                                }
                            />
                        </div>

                        <div className="flex items-center justify-between rounded-md border p-3">
                            <div>
                                <Label htmlFor="show_at_slider">Слайдер</Label>
                                <p className="text-xs text-muted-foreground">
                                    Показывать в слайдере
                                </p>
                            </div>
                            <Switch
                                id="show_at_slider"
                                checked={data.show_at_slider}
                                onCheckedChange={(v) =>
                                    setData('show_at_slider', v)
                                }
                            />
                        </div>

                        <div className="flex items-center justify-between rounded-md border p-3">
                            <div>
                                <Label htmlFor="show_at_popular">
                                    Популярное
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                    Выводить в популярных
                                </p>
                            </div>
                            <Switch
                                id="show_at_popular"
                                checked={data.show_at_popular}
                                onCheckedChange={(v) =>
                                    setData('show_at_popular', v)
                                }
                            />
                        </div>

                        <div className="flex items-center justify-between rounded-md border p-3">
                            <div>
                                <Label htmlFor="is_breaking_news">Молния</Label>
                                <p className="text-xs text-muted-foreground">
                                    Breaking news
                                </p>
                            </div>
                            <Switch
                                id="is_breaking_news"
                                checked={data.is_breaking_news}
                                onCheckedChange={(v) =>
                                    setData('is_breaking_news', v)
                                }
                            />
                        </div>

                        <div className="flex items-center justify-between rounded-md border p-3">
                            <div>
                                <Label htmlFor="status">Статус</Label>
                                <p className="text-xs text-muted-foreground">
                                    Активность записи
                                </p>
                            </div>
                            <Switch
                                id="status"
                                checked={!!data.status}
                                onCheckedChange={(v) =>
                                    setData('status', v ? 1 : 0)
                                }
                            />
                        </div>
                    </div>

                    {/* Дата публикации */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="published_at">
                                Дата и время публикации
                            </Label>
                            <Input
                                id="published_at"
                                type="datetime-local"
                                value={data.published_at}
                                onChange={(e) =>
                                    setData('published_at', e.target.value)
                                }
                            />
                            {errors.published_at && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.published_at}
                                </p>
                            )}
                        </div>
                    </div>

                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Отмена
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Сохраняем…' : 'Сохранить'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default NewsForm;

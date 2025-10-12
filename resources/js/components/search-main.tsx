import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { router } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { Input } from './ui/input';

const SearchNain = () => {
    const [open, setOpen] = useState(false);
    const [q, setQ] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const onOpenChange = (next: boolean) => {
        setOpen(next);
        if (next) {
            // фокус после открытия
            setTimeout(() => inputRef.current?.focus(), 0);
        } else {
            setQ('');
        }
    };

    const onSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const search = q.trim();
            if (!search) {
                setOpen(false);
                return;
            }

            router.get(
                '/news',
                { search },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                    // only: ['news'], // если используешь partial reload
                },
            );

            setOpen(false);
        },
        [q],
    );

    const clear = () => setQ('');
    return (
        <>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    />
                )}
            </AnimatePresence>

            <Popover open={open} onOpenChange={onOpenChange}>
                <PopoverTrigger asChild>
                    <button
                        type="button"
                        aria-label="Search"
                        className="cursor-pointer rounded-md p-2 transition hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        <Search className="h-5 w-5 text-gray-900 dark:text-gray-100" />
                    </button>
                </PopoverTrigger>

                <PopoverContent className="relative z-50 w-72 rounded-xl border border-white/10 bg-white/70 p-2 shadow-xl backdrop-blur-md dark:bg-gray-900/70">
                    <form onSubmit={onSubmit}>
                        <Input
                            ref={inputRef}
                            name="search"
                            placeholder="Search..."
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </form>
                </PopoverContent>
            </Popover>
        </>
    );
};
export default SearchNain;

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { router } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { Input } from './ui/input';

const SearchNain = () => {
    const [searchToggle, setsearchToggle] = useState(false);
    const searchNews = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e.currentTarget.elements[0].value);
        router.visit(`/news`, {
            method: 'get',
            data: {
                search: e.currentTarget.elements[0].value,
            },
            preserveState: true,
            replace: true,
        });
        setsearchToggle(false);
    };
    return (
        <Popover open={searchToggle} onOpenChange={setsearchToggle}>
            <PopoverTrigger asChild>
                <button
                    aria-label="Search"
                    className="cursor-pointer rounded-md p-2 transition hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                    <Search className="h-5 w-5 text-gray-900 dark:text-gray-100" />
                </button>
            </PopoverTrigger>
            <PopoverContent className="p-0 dark:bg-gray-900">
                <form onSubmit={searchNews}>
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="border-0 focus:ring-0"
                    />
                </form>
            </PopoverContent>
        </Popover>
    );
};

export default SearchNain;

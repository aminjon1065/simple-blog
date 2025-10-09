import Article from '@/components/article';
import { Button } from '@/components/ui/button';
import MainLayout from '@/layouts/app/main-layout';
import { NewsItem } from '@/types/news';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

const MainPage = ({ news }: { news: NewsItem[] }) => {
    return (
        <MainLayout>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="space-y-2 pt-6 pb-8 md:space-y-5">
                    <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
                        Последние статьи
                    </h1>
                    <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
                        Блог создан на Laravel и Inertia.js с использованием
                        React и Tailwind CSS (Shadcn).
                    </p>
                </div>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {news.map((item) => (
                        <li key={item.id} className="py-12">
                            <Article article={item} />
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex justify-end text-base leading-6 font-medium">
                <Link
                    as={Button}
                    variant="link"
                    href={`/news`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    rel="prev"
                >
                    <div className="group flex items-center justify-center space-x-2">
                        <span className="transform text-xl transition-transform duration-200 ease-in-out group-hover:-translate-x-1">
                            Все посты
                        </span>
                        <ArrowRight className="h-4 w-4 transform transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
                    </div>
                </Link>
            </div>
        </MainLayout>
    );
};

export default MainPage;

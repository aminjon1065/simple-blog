import ArticleNews from '@/components/article-news';
import { Button } from '@/components/ui/button';
import MainLayout from '@/layouts/app/main-layout';
import { Category, NewsItem, PaginatedNews } from '@/types/news';
import { Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
const News = ({
    news,
    categories,
}: {
    news: PaginatedNews;
    categories: Category[];
}) => {
    return (
        <MainLayout>
            <div>
                <div className="pt-6 pb-6">
                    <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
                        Новости
                    </h1>
                </div>
                <div className="flex sm:space-x-24">
                    <div className="hidden h-full max-w-[280px] min-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md sm:flex dark:bg-gray-900/70 dark:shadow-gray-800/40">
                        <div className="px-6 py-4">
                            <h3 className="text-primary-500 font-bold uppercase">
                                Категории
                            </h3>
                            <ul className="space-y-3">
                                {categories.map((category) => (
                                    <li className="my-3" key={category.id}>
                                        <a
                                            href="#"
                                            className="hover:text-primary-500 dark:hover:text-primary-500 px-3 py-2 text-sm font-medium text-gray-500 uppercase dark:text-gray-300"
                                            aria-label="View posts tagged"
                                        >
                                            {category.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <ul>
                            {news.data.map((article: NewsItem) => (
                                <ArticleNews
                                    key={article.id}
                                    article={article}
                                />
                            ))}
                        </ul>

                        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
                            <nav className="flex items-center justify-between">
                                <Link
                                    as={Button}
                                    variant="link"
                                    disabled={news.prev_page_url === null}
                                    href={`${news.prev_page_url}`}
                                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                    rel="prev"
                                >
                                    <div className="group flex items-center justify-center space-x-2">
                                        <ArrowLeft className="h-4 w-4 transform transition-transform duration-200 ease-in-out group-hover:-translate-x-1" />
                                        <span className="transform transition-transform duration-200 ease-in-out group-hover:translate-x-1">
                                            Предыдущая
                                        </span>
                                    </div>
                                </Link>

                                <span>
                                    {news.current_page} из{' '}
                                    {news.links?.length ?? 0}
                                </span>

                                <Link
                                    as={Button}
                                    variant="link"
                                    disabled={news.next_page_url === null}
                                    href={`${news.next_page_url}`}
                                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                    rel="prev"
                                >
                                    <div className="group flex items-center justify-center space-x-2">
                                        <span className="transform transition-transform duration-200 ease-in-out group-hover:-translate-x-1">
                                            Следующая
                                        </span>
                                        <ArrowRight className="h-4 w-4 transform transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
                                    </div>
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default News;

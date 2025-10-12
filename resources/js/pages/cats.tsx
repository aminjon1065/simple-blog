import MainLayout from '@/layouts/app/main-layout';
import { Category } from '@/types/news';
import { Link } from '@inertiajs/react';

const Cats = ({ categories }: { categories: Category[] }) => {
    console.log(categories);
    return (
        <MainLayout>
            <section className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
                <div className="flex flex-col items-start justify-start divide-y divide-gray-200 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0 dark:divide-gray-700">
                    <div className="space-x-2 pt-6 pb-8 md:space-y-5">
                        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14 dark:text-gray-100">
                            Категории
                        </h1>
                    </div>
                    <div className="flex max-w-lg flex-wrap">
                        {categories.map((category: Category) => (
                            <div className="mt-2 mr-5 mb-2" key={category.id}>
                                <Link
                                    href={`/news?category=${category.id}`}
                                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
                                >
                                    {category.name}
                                </Link>
                                <Link
                                    href={`/news?category=${category.id}`}
                                    className="-ml-2 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300"
                                    aria-label="View posts tagged"
                                >
                                    ({category.news_count ?? 0})
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default Cats;

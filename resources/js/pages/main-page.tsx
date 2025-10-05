import Article from '@/components/article';
import MainLayout from '@/layouts/app/main-layout';

const MainPage = ({news}) => {
    console.log(news);
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
                    <li className="py-12">
                        <Article />
                    </li>

                    <li className="py-12">
                        <article>
                            <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                                <dl>
                                    <dt className="sr-only">Published on</dt>
                                    <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                                        <time dateTime="2023-08-05T00:00:00.000Z">
                                            August 5, 2023
                                        </time>
                                    </dd>
                                </dl>
                                <div className="space-y-5 xl:col-span-3">
                                    <div className="space-y-6">
                                        <div>
                                            <h2 className="text-2xl leading-8 font-bold tracking-tight">
                                                <a
                                                    href="article-simple.html"
                                                    className="text-gray-900 dark:text-gray-100"
                                                >
                                                    Simple article
                                                </a>
                                            </h2>
                                            <div className="flex flex-wrap">
                                                <a
                                                    href="#"
                                                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
                                                >
                                                    HTML
                                                </a>
                                                <a
                                                    href="#"
                                                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
                                                >
                                                    JS
                                                </a>
                                                <a
                                                    href="#"
                                                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
                                                >
                                                    PHP
                                                </a>
                                            </div>
                                        </div>
                                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipisicing elit, sed do
                                            eiusmod tempor incididunt ut labore
                                            et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud
                                            exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat.
                                        </div>
                                    </div>
                                    <div className="text-base leading-6 font-medium">
                                        <a
                                            href="article-simple.html"
                                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                            aria-label="Read article"
                                        >
                                            Read more &rarr;
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </li>

                    <li className="py-12">
                        <article>
                            <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                                <dl>
                                    <dt className="sr-only">Published on</dt>
                                    <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                                        <time dateTime="2023-08-05T00:00:00.000Z">
                                            August 5, 2023
                                        </time>
                                    </dd>
                                </dl>
                                <div className="space-y-5 xl:col-span-3">
                                    <div className="space-y-6">
                                        <div>
                                            <h2 className="text-2xl leading-8 font-bold tracking-tight">
                                                <a
                                                    href="#"
                                                    className="text-gray-900 dark:text-gray-100"
                                                >
                                                    Release of Tailwind HTML
                                                    Starter Blog
                                                </a>
                                            </h2>
                                            <div className="flex flex-wrap">
                                                <a
                                                    href="#"
                                                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
                                                >
                                                    HTML
                                                </a>
                                                <a
                                                    href="#"
                                                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
                                                >
                                                    JS
                                                </a>
                                                <a
                                                    href="#"
                                                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
                                                >
                                                    PHP
                                                </a>
                                            </div>
                                        </div>
                                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipisicing elit, sed do
                                            eiusmod tempor incididunt ut labore
                                            et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud
                                            exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat.
                                        </div>
                                    </div>
                                    <div className="text-base leading-6 font-medium">
                                        <a
                                            href="#"
                                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                            aria-label="Read article"
                                        >
                                            Read more &rarr;
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </li>
                </ul>
            </div>
            <div className="flex justify-end text-base leading-6 font-medium">
                <a
                    href="blog.html"
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label="All posts"
                >
                    All Posts &rarr;
                </a>
            </div>
        </MainLayout>
    );
};

export default MainPage;

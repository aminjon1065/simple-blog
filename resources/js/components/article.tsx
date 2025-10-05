const Article = ({newsData}) => {
    return (
        <article>
            <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                <dl>
                    <dt className="sr-only">Опубликовано</dt>
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
                                    href="article-sidebar.html"
                                    className="text-gray-900 dark:text-gray-100"
                                >
                                    Article with sidebar
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
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                        </div>
                    </div>
                    <div className="text-base leading-6 font-medium">
                        <a
                            href="article-sidebar.html"
                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            aria-label="Read article"
                        >
                            Read more &rarr;
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default Article;

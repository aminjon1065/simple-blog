const ArticleNews = ({article}) => {
    return (
        <li className="py-5">
            <article className="flex flex-col space-y-2 xl:space-y-0">
                <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                        <time dateTime="2021-08-07T15:32:14.000Z">
                            {new Date(article.published_at).toLocaleDateString(
                                'ru-RU',
                                {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                },
                            )}
                        </time>
                    </dd>
                </dl>
                <div className="space-y-3">
                    <div>
                        <h2 className="text-2xl leading-8 font-bold tracking-tight">
                            <a
                                href="article-sidebar.html"
                                className="text-gray-900 dark:text-gray-100"
                            >
                                {article.title}
                            </a>
                        </h2>
                        <div className="flex flex-wrap">
                            {
                                article.tags.map((tag) => (
                                    <a
                                href="#"
                                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
                            >
                                {tag.name}
                            </a>
                                ))
                            }
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
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.
                    </div>
                </div>
            </article>
        </li>
    );
};

export default ArticleNews;

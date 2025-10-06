import { Link } from '@inertiajs/react';

const Article = ({ article }) => {
    return (
        <article>
            <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                <dl>
                    <dt className="sr-only">Опубликовано</dt>
                    <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                        <time dateTime="2023-08-05T00:00:00.000Z">
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
                <div className="space-y-5 xl:col-span-3">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl leading-8 font-bold tracking-tight">
                                <Link
                                    href={`/news/${article.slug}`}
                                    className="text-gray-900 dark:text-gray-100"
                                >
                                    {article.title}
                                </Link>
                            </h2>
                            <div className="flex flex-wrap">
                                {article.tags.map((tag) => (
                                    <a
                                        key={tag.id}
                                        href="#"
                                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
                                    >
                                        {tag.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {article.content}
                        </div>
                    </div>
                    <div className="text-base leading-6 font-medium">
                        <Link
                            href={`/news/${article.slug}`}
                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            aria-label="Read article"
                        >
                            Прочиать &rarr;
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default Article;

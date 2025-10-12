import { formatDate } from '@/lib/formatDate';
import { NewsItem } from '@/types/news';
import { Link } from '@inertiajs/react';

const ArticleNews = ({ article }: { article: NewsItem }) => {
    return (
        <li className="py-5">
            <article className="flex flex-col space-y-2 xl:space-y-0">
                <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                        <time dateTime="2021-08-07T15:32:14.000Z">
                            {formatDate(article.published_at)}
                        </time>
                    </dd>
                </dl>
                <div className="space-y-3">
                    <div>
                        <h2 className="text-2xl leading-8 font-bold tracking-tight">
                            <Link
                                href={`/news/${article.slug}`}
                                className="text-truncate text-gray-900 dark:text-gray-100"
                            >
                                {article.title}
                            </Link>
                        </h2>
                        <div className="flex flex-wrap">
                            {article.tags?.map((tag) => (
                                <Link
                                    key={tag.id}
                                    href="#"
                                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
                                >
                                    {tag.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                        <span className="text-truncate decoration-2">
                            {article.content}
                        </span>
                    </div>
                </div>
            </article>
        </li>
    );
};

export default ArticleNews;

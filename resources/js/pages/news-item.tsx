import MainLayout from '@/layouts/app/main-layout';
import { Link } from '@inertiajs/react';

const NewsItem = () => {
    return (
        <MainLayout>
            <section className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
                <article>
                    <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
                        <header className="pt-6 xl:pb-6">
                            <div className="space-y-1 text-center">
                                <dl className="space-y-10">
                                    <div>
                                        <dt className="sr-only">
                                            Published on
                                        </dt>
                                        <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                                            <time dateTime="2021-05-02T00:00:00.000Z">
                                                Sunday, May 2, 2021
                                            </time>
                                        </dd>
                                    </div>
                                </dl>
                                <div>
                                    <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100">
                                        Article title
                                    </h1>
                                </div>
                            </div>
                        </header>
                        <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0 dark:divide-gray-700">
                            <dl className="pt-6 pb-10 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
                                <dt className="sr-only">Authors</dt>
                                <dd>
                                    <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-y-8 xl:space-x-0">
                                        <li className="flex items-center space-x-2">
                                            <img
                                                src="../assets/images/avatar.png"
                                                width="38"
                                                height="38"
                                                alt="avatar"
                                                className="h-10 w-10 rounded-full"
                                            />
                                            <dl className="text-sm leading-5 font-medium whitespace-nowrap">
                                                <dt className="sr-only">
                                                    Name
                                                </dt>
                                                <dd className="text-gray-900 dark:text-gray-100">
                                                    John Doe
                                                </dd>
                                                <dt className="sr-only">
                                                    Twitter
                                                </dt>
                                                <dd>
                                                    <a
                                                        href="#"
                                                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                                    >
                                                        Facebook
                                                    </a>
                                                </dd>
                                            </dl>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <div className="divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0 dark:divide-gray-700">
                                <div className="prose dark:prose-invert max-w-none pt-10 pb-8">
                                    <h1 id="nested-routes">
                                        <a
                                            href="#nested-routes"
                                            aria-hidden="true"
                                            tabindex="-1"
                                        >
                                            <span className="icon icon-link"></span>
                                        </a>
                                        Nested Routes
                                    </h1>
                                    <p>
                                        The blog template supports posts in
                                        nested sub-folders. This helps in
                                        organisation and can be used to group
                                        posts of similar content e.g. a
                                        multi-part series. This post is itself
                                        an example of a nested route! It's
                                        located in the{' '}
                                        <code>/data/blog/nested-route</code>{' '}
                                        folder.
                                    </p>
                                    <h2 id="how">
                                        <a
                                            href="#how"
                                            aria-hidden="true"
                                            tabindex="-1"
                                        >
                                            <span className="icon icon-link"></span>
                                        </a>
                                        How
                                    </h2>
                                    <p>
                                        Simplify create multiple folders inside
                                        the main <code>/data/blog</code> folder
                                        and add your <code>.md</code>/
                                        <code>.mdx</code> files to them. You can
                                        even create something like{' '}
                                        <code>
                                            /data/blog/nested-route/deeply-nested-route/my-post.md
                                        </code>
                                    </p>
                                    <p>
                                        We use Next.js catch all routes to
                                        handle the routing and path creations.
                                    </p>
                                    <h2 id="use-cases">
                                        <a
                                            href="#use-cases"
                                            aria-hidden="true"
                                            tabindex="-1"
                                        >
                                            <span className="icon icon-link"></span>
                                        </a>
                                        Use Cases
                                    </h2>
                                    <p>
                                        Here are some reasons to use nested
                                        routes
                                    </p>
                                    <ul>
                                        <li>
                                            More logical content organisation
                                            (blogs will still be displayed based
                                            on the created date)
                                        </li>
                                        <li>Multi-part posts</li>
                                        <li>
                                            Different sub-routes for each author
                                        </li>
                                        <li>
                                            Internationalization (though it
                                            would be recommended to use{' '}
                                            <a
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href="https://nextjs.org/docs/advanced-features/i18n-routing"
                                            >
                                                Next.js built-in i8n routing
                                            </a>
                                            )
                                        </li>
                                    </ul>
                                    <h2 id="note">
                                        <a
                                            href="#note"
                                            aria-hidden="true"
                                            tabindex="-1"
                                        >
                                            <span className="icon icon-link"></span>
                                        </a>
                                        Note
                                    </h2>
                                    <ul>
                                        <li>
                                            The previous/next post links at
                                            bottom of the template are currently
                                            sorted by date. One could explore
                                            modifying the template to refer the
                                            reader to the previous/next post in
                                            the series, rather than by date.
                                        </li>
                                    </ul>
                                </div>
                                <div className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">
                                    <a href="#" rel="nofollow">
                                        Discuss on Twitter
                                    </a>
                                    •<a href="#">View on GitHub</a>
                                </div>
                            </div>
                            <footer>
                                <div className="divide-gray-200 text-sm leading-5 font-medium xl:col-start-1 xl:row-start-2 xl:divide-y dark:divide-gray-700">
                                    <div className="py-4 xl:py-8">
                                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                                            Tags
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
                                                PHP
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                                        <div>
                                            <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                                                Previous Article
                                            </h2>
                                            <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                                                <a href="#">
                                                    Article with banner
                                                </a>
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                                                Next Article
                                            </h2>
                                            <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                                                <a href="article-simple.html">
                                                    Simple article
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-4 xl:pt-8">
                                    <Link
                                        href="/news"
                                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                        aria-label="Back to the blog"
                                    >
                                        &larr; Back to the blog
                                    </Link>
                                </div>
                            </footer>
                        </div>
                    </div>
                </article>
            </section>
        </MainLayout>
    );
};

export default NewsItem;

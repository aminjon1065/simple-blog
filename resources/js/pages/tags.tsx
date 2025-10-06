import MainLayout from '@/layouts/app/main-layout';

const Tags = () => {
    return (
        <MainLayout>
            <section className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
                <div className="flex flex-col items-start justify-start divide-y divide-gray-200 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0 dark:divide-gray-700">
                    <div className="space-x-2 pt-6 pb-8 md:space-y-5">
                        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14 dark:text-gray-100">
                            Теги
                        </h1>
                    </div>
                    <div className="flex max-w-lg flex-wrap">
                        <div className="mt-2 mr-5 mb-2">
                            <a
                                href="#"
                                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
                            >
                                HTML
                            </a>
                            <a
                                href="#"
                                className="-ml-2 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300"
                                aria-label="View posts tagged"
                            >
                                (10)
                            </a>
                        </div>
                        <div className="mt-2 mr-5 mb-2">
                            <a
                                href="#"
                                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
                            >
                                PHP
                            </a>
                            <a
                                href="#"
                                className="-ml-2 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300"
                                aria-label="View posts tagged"
                            >
                                (54)
                            </a>
                        </div>
                        <div className="mt-2 mr-5 mb-2">
                            <a
                                href="#"
                                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
                            >
                                CSS
                            </a>
                            <a
                                href="#"
                                className="-ml-2 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300"
                                aria-label="View posts tagged"
                            >
                                (21)
                            </a>
                        </div>
                        <div className="mt-2 mr-5 mb-2">
                            <a
                                href="#"
                                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
                            >
                                JS
                            </a>
                            <a
                                href="#"
                                className="-ml-2 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300"
                                aria-label="View posts tagged"
                            >
                                (15)
                            </a>
                        </div>
                        <div className="mt-2 mr-5 mb-2">
                            <a
                                href="#"
                                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
                            >
                                Python
                            </a>
                            <a
                                href="#"
                                className="-ml-2 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300"
                                aria-label="View posts tagged"
                            >
                                (22)
                            </a>
                        </div>
                        <div className="mt-2 mr-5 mb-2">
                            <a
                                href="#"
                                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
                            >
                                Go
                            </a>
                            <a
                                href="#"
                                className="-ml-2 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300"
                                aria-label="View posts tagged"
                            >
                                (10)
                            </a>
                        </div>
                        <div className="mt-2 mr-5 mb-2">
                            <a
                                href="#"
                                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
                            >
                                C#
                            </a>
                            <a
                                href="#"
                                className="-ml-2 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300"
                                aria-label="View posts tagged"
                            >
                                (15)
                            </a>
                        </div>
                        <div className="mt-2 mr-5 mb-2">
                            <a
                                href="#"
                                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
                            >
                                CI/CD
                            </a>
                            <a
                                href="#"
                                className="-ml-2 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300"
                                aria-label="View posts tagged"
                            >
                                (19)
                            </a>
                        </div>
                        <div className="mt-2 mr-5 mb-2">
                            <a
                                href="#"
                                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
                            >
                                Docker
                            </a>
                            <a
                                href="#"
                                className="-ml-2 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300"
                                aria-label="View posts tagged"
                            >
                                (10)
                            </a>
                        </div>
                        <div className="mt-2 mr-5 mb-2">
                            <a
                                href="#"
                                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
                            >
                                Vuejs
                            </a>
                            <a
                                href="#"
                                className="-ml-2 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300"
                                aria-label="View posts tagged"
                            >
                                (10)
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default Tags;

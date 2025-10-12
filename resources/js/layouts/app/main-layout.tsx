import Footer from '@/components/footer';
import SearchMain from '@/components/search-main';
import { initializeTheme, useAppearance } from '@/hooks/useAppearance';
import { NewsItem } from '@/types/news';
import { Link } from '@inertiajs/react';
import { FeatherIcon, MoonIcon, SunIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { toast, Toaster } from 'sonner';

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [showMenu, setShowMenu] = useState(false);
    const { appearance, updateAppearance } = useAppearance();
    const menuRef = useRef<HTMLDivElement | null>(null);
    const boundRef = useRef(false);

    useEffect(() => {
        initializeTheme();
    }, []);

    useEffect(() => {
        if (!window.Echo) return;
        if (boundRef.current) return;
        boundRef.current = true;

        const ch = window.Echo.channel('news');
        const handler = (e: NewsItem) => {
            console.log('[Echo] news.created', e);
            if (window.location.pathname === `/news/${e.slug}`) return;
            toast.success(
                <div>
                    <div className="font-semibold">📰 Новость</div>
                    <div className="mt-3">
                        <Link
                            href={`/news/${e.slug}`}
                            className="underline-offset-2 hover:underline"
                            onClick={() => toast.dismiss()}
                        >
                            Читать →
                        </Link>
                    </div>
                </div>,
            );
        };

        ch.listen('.news.created', handler);

        return () => {
            // Чистим корректно, чтобы StrictMode не давал дублей в dev
            ch.stopListening('.news.created');
            boundRef.current = false;
        };
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.body.style.overflow = showMenu ? 'hidden' : '';
        }
        return () => {
            if (typeof document !== 'undefined') {
                document.body.style.overflow = '';
            }
        };
    }, [showMenu]);

    // Close on Escape key
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') setShowMenu(false);
        }
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    // Close when clicking outside
    useEffect(() => {
        function onClick(e: MouseEvent) {
            if (!showMenu) return;
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node)
            ) {
                setShowMenu(false);
            }
        }
        window.addEventListener('mousedown', onClick);
        return () => window.removeEventListener('mousedown', onClick);
    }, [showMenu]);

    return (
        <>
            <div className="bg-white text-black antialiased dark:bg-gray-950 dark:text-white">
                <section className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
                    <div className="flex min-h-screen flex-col justify-between font-sans">
                        <header className="flex items-center justify-between py-10">
                            <div>
                                <Link href="/" aria-label="Header title">
                                    <div className="flex items-center justify-between">
                                        <div className="mr-3">
                                            <FeatherIcon className="h-9 w-9 text-gray-900 dark:text-gray-100" />
                                        </div>
                                        <div className="hidden h-6 text-2xl font-semibold sm:block">
                                            SilentNoir
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
                                <Link
                                    prefetch
                                    href={'/news'}
                                    className="hidden font-medium text-gray-900 sm:block dark:text-gray-100"
                                >
                                    Новости
                                </Link>
                                <Link
                                    prefetch
                                    href="/cats"
                                    className="hidden font-medium text-gray-900 sm:block dark:text-gray-100"
                                >
                                    Категории
                                </Link>

                                <Link
                                    prefetch
                                    href="/about"
                                    className="hidden font-medium text-gray-900 sm:block dark:text-gray-100"
                                >
                                    О нас
                                </Link>
                                <SearchMain />
                                <button
                                    className="cursor-pointer rounded-md border px-3 py-2"
                                    aria-label="Toggle Dark Mode"
                                    onClick={() =>
                                        updateAppearance(
                                            appearance === 'dark'
                                                ? 'light'
                                                : 'dark',
                                        )
                                    }
                                    title={
                                        typeof document !== 'undefined' &&
                                        document.documentElement.classList.contains(
                                            'dark',
                                        )
                                            ? 'Switch to light'
                                            : 'Switch to dark'
                                    }
                                >
                                    {typeof document !== 'undefined' &&
                                    document.documentElement.classList.contains(
                                        'dark',
                                    ) ? (
                                        <SunIcon className="h-6 w-6 text-gray-900 dark:text-gray-100" />
                                    ) : (
                                        <MoonIcon className="h-6 w-6 text-gray-900 dark:text-gray-100" />
                                    )}
                                </button>

                                <button
                                    aria-label="Toggle Menu"
                                    className="sm:hidden"
                                    onClick={() => setShowMenu(true)}
                                    aria-expanded={showMenu}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="h-8 w-8 text-gray-900 dark:text-gray-100"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>

                                <div
                                    ref={menuRef}
                                    role="dialog"
                                    aria-modal="true"
                                    aria-hidden={!showMenu}
                                    className={`fixed top-0 left-0 z-10 h-full w-full transform bg-white opacity-95 duration-300 ease-in-out dark:bg-gray-950 dark:opacity-[0.98] ${
                                        showMenu
                                            ? 'translate-x-0'
                                            : 'pointer-events-none translate-x-full'
                                    }`}
                                >
                                    <div className="flex justify-end">
                                        <button
                                            className="mt-11 mr-8 h-8 w-8"
                                            aria-label="Close Menu"
                                            onClick={() => setShowMenu(false)}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className="text-gray-900 dark:text-gray-100"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                    <nav className="fixed mt-8">
                                        <div className="px-12 py-4">
                                            <Link
                                                prefetch
                                                href="/news"
                                                className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                                                onClick={() =>
                                                    setShowMenu(false)
                                                }
                                            >
                                                Новости
                                            </Link>
                                        </div>
                                        <div className="px-12 py-4">
                                            <Link
                                                href="/cats"
                                                className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                                                onClick={() =>
                                                    setShowMenu(false)
                                                }
                                            >
                                                Категории
                                            </Link>
                                        </div>

                                        <div className="px-12 py-4">
                                            <Link
                                                href="/about"
                                                className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                                                onClick={() =>
                                                    setShowMenu(false)
                                                }
                                            >
                                                О нас
                                            </Link>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </header>
                        <main className="mb-auto">{children}</main>
                        <Footer />
                    </div>
                </section>
            </div>
            <Toaster closeButton />
        </>
    );
}

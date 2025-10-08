// resources/js/types/news.ts

export type Author = {
    id: number;
    name: string;
    is_admin?: boolean;
    email?: string;
    email_verified_at?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
};

export type Category = {
    id: number;
    name: string;
    slug?: string;
    show_at_nav?: number | boolean; // в базе мог быть tinyint
    status?: number | boolean;
    created_at?: string | null;
    updated_at?: string | null;
};

export type Tag = {
    id: number;
    name: string;
    slug?: string;
    created_at?: string | null;
    updated_at?: string | null;
};

export type NewsItem = {
    id: number;
    title: string;
    slug?: string;
    content?: string;
    excerpt?: string | null; // если нужен краткий текст
    image?: string | null;
    author_id?: number;
    author?: Author;
    category_id?: number;
    category?: Category;
    tags: Tag[];
    published_at?: string | null; // "2025-10-04 23:45:59"
    created_at?: string | null; // "2025-10-05T14:32:30.000000Z"
    updated_at?: string | null;
    is_published?: number | boolean; // 0/1 or boolean
    is_approved?: number | boolean;
    is_breaking_news?: number | boolean;
    show_at_slider?: number | boolean;
    show_at_popular?: number | boolean;
    meta_title?: string | null;
    meta_description?: string | null;
    views?: number;
    status?: number | boolean;
    tags?: Tag[] | null; // assuming tags is an array of Tag objects
};

export type PaginatedNews = {
    data: NewsItem[];
    current_page?: number;
    last_page?: number;
    per_page?: number;
    total?: number;
    prev_page_url?: string | null;
    next_page_url?: string | null;
    links?: Array<{ url: string | null; label: string; active: boolean }>;
};


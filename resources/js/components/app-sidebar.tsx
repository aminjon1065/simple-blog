import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import {  home } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    ChartBarStacked,
    Github,
    LayoutGrid,
    MailPlus,
    MessageCircle,
    Newspaper,
} from 'lucide-react';
import AppLogo from './app-logo';
import { dashboard } from '@/routes/admin';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Категоия',
        href: '/admin/categories',
        icon: ChartBarStacked,
    },
    {
        title: 'Новости',
        href: '/admin/news',
        icon: Newspaper,
    },
    {
        title: 'Комментарии',
        href: '/admin/comments',
        icon: MessageCircle,
    },
    {
        title: 'Подписались',
        href: '/admin/subscriptions',
        icon: MailPlus,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/aminjon1065/simple-blog',
        icon: Github,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={home()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

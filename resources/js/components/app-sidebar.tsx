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
import { dashboard } from '@/routes';
import { show as bimtek } from '@/routes/bimtek';
import { show as peserta } from '@/routes/users';
import { show as assesment } from '@/routes/assesment';
import { show as riwayatNilai } from '@/routes/riwayat_nilai';
import { type NavItem, NavGroup } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, History, LayoutGrid, Users, UsersRound } from 'lucide-react';
import AppLogo from './app-logo';

const footerNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     href: 'https://github.com/laravel/react-starter-kit',
    //     icon: Folder,
    // },
    // {
    //     title: 'Documentation',
    //     href: 'https://laravel.com/docs/starter-kits#react',
    //     icon: BookOpen,
    // },
];

export function AppSidebar() {

	const { auth, app_name } = usePage().props;
    let mainNavItems: NavItem[] = [];

    if (auth.user.role == 2) {
        mainNavItems = [
			{
			    title: 'Dashboard',
			    href: dashboard(),
			    icon: LayoutGrid,
			},
			{
			    title: 'Riwayat Nilai',
			    href: riwayatNilai(),
			    icon: History,
			},
		];
    }else{
    	mainNavItems = [
			{
			    title: 'Dashboard',
			    href: dashboard(),
			    icon: LayoutGrid,
			},
			{
			    title: 'Bimtek',
			    href: bimtek(),
			    icon: UsersRound,
			},
			{
			    // title: 'Soal',
			    title: 'Assesment',
			    href: assesment(),
			    icon: BookOpen,
			    /*children: [
			        { title: "Paket Soal", href: "/bimtek" },
			        { title: "Soal", href: "/bimtek/create" },
			    ]*/
			},
			{
			    title: 'Peserta',
			    href: peserta(),
			    icon: Users,
			}
		];
    }

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo app_name={app_name} />
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

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import { resolveUrl } from "@/lib/utils";
import { type NavItem } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();

    const isActive = (href: string) => {
        if (!href) return false;
        return page.url.startsWith(resolveUrl(href));
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <DropdownItem key={item.title} item={item} isActive={isActive} />
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}

function DropdownItem({
    item,
    isActive,
}: {
    item: NavItem;
    isActive: (href: string) => boolean;
}) {
    const [open, setOpen] = useState(false);
    const hasChildren = item.children && item.children.length > 0;

    return (
        <SidebarMenuItem>
            {/* Parent Item */}
            <SidebarMenuButton
                asChild={!hasChildren}
                onClick={() => hasChildren && setOpen((o) => !o)}
                isActive={item.href ? isActive(item.href) : false}
                tooltip={{ children: item.title }}
            >
                {hasChildren ? (
                    <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-2">
                            {item.icon && <item.icon className="h-4 w-4" />}
                            <span>{item.title}</span>
                        </div>

                        {open ? (
                            <ChevronDown className="h-4 w-4 opacity-70" />
                        ) : (
                            <ChevronRight className="h-4 w-4 opacity-70" />
                        )}
                    </div>
                ) : (
                    <Link href={item.href} prefetch>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                    </Link>
                )}
            </SidebarMenuButton>

            {/* Dropdown Items */}
            {hasChildren && open && (
                <div className="ml-6 mt-1 space-y-1">
                    {item.children.map((child) => (
                        <SidebarMenuButton
                            key={child.title}
                            asChild
                            isActive={isActive(child.href)}
                        >
                            <Link href={child.href}>
                                <span>{child.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    ))}
                </div>
            )}
        </SidebarMenuItem>
    );
}

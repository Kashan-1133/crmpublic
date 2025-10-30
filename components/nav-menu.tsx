'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Bot, CreditCard, Inbox, LayoutDashboard, Upload, Search, Users, ShoppingCart, Settings, HelpCircle, Calculator, Bell, GalleryVertical } from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

const menuItems = [
  {
    href: '/dashboard',
    icon: LayoutDashboard,
    label: 'Dashboard',
  },
  {
    href: '/inbox',
    icon: Inbox,
    label: 'Inbox',
  },
  {
    href: '/notifications',
    icon: Bell,
    label: 'Notifications',
  },
  {
    href: '/upload',
    icon: Upload,
    label: 'Upload',
  },
  {
    href: '/my-posts',
    icon: GalleryVertical,
    label: 'My Posts',
  },
  {
    href: '/payments',
    icon: CreditCard,
    label: 'Payments',
  },
  {
    href: '/checkout',
    icon: ShoppingCart,
    label: 'Checkout',
  },
    {
    href: '/calculator',
    icon: Calculator,
    label: 'Calculator',
  },
  {
    href: '/automations',
    icon: Bot,
    label: 'Automations',
  },
  {
    href: '/brand-hunting',
    icon: Users,
    label: 'Brand Hunting',
  },
   {
    href: '/settings',
    icon: Settings,
    label: 'Settings',
  },
  {
    href: '/guidance',
    icon: HelpCircle,
    label: 'Guidance',
  },
];

export function NavMenu() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href}>
            <SidebarMenuButton
              isActive={pathname.startsWith(item.href)}
              tooltip={item.label}
            >
              <item.icon />
              <span>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

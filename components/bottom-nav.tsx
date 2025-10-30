'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, CreditCard, Inbox, LayoutDashboard, Settings, Upload, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/inbox', icon: Inbox, label: 'Inbox' },
  { href: '/upload', icon: Upload, label: 'Upload' },
  { href: '/notifications', icon: Bell, label: 'Alerts' },
  { href: '/automations', icon: Bot, label: 'Automate' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t md:hidden">
      <div className="grid h-full max-w-lg grid-cols-6 mx-auto font-medium">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'inline-flex flex-col items-center justify-center px-2 hover:bg-accent group',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <item.icon
                className={cn(
                  'w-6 h-6 mb-1',
                  isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                )}
              />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

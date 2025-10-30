'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { notifications } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Bell, Mail, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

const iconMap = {
    "New Message": Mail,
    "Campaign Update": Bell,
    "Payment Processed": Check,
    "Action Required": X
};

export function NotificationsList() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground mt-1">
          Here is a list of your recent notifications.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
            <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Manage your unread notifications</CardDescription>
            </div>
            <Button variant="outline">Mark all as read</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {notifications.map((notification) => {
            const Icon = iconMap[notification.type as keyof typeof iconMap] || Bell;
            return (
            <div
              key={notification.id}
              className={cn(
                'flex items-start gap-4 p-4 rounded-lg border transition-colors',
                !notification.isRead && 'bg-secondary'
              )}
            >
                <div className="bg-background p-2 rounded-full mt-1">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-semibold">{notification.title}</p>
                        <p className="text-sm text-muted-foreground">
                        {notification.description}
                        </p>
                    </div>
                    {!notification.isRead && <Badge>New</Badge>}
                </div>
                <p className="text-xs text-muted-foreground mt-2">{new Date(notification.date).toLocaleString()}</p>
              </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Mark as Read</DropdownMenuItem>
                    <DropdownMenuItem>Archive</DropdownMenuItem>
                    </DropdownMenuContent>
              </DropdownMenu>
            </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  );
}

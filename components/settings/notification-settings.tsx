"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const notifications = [
    { id: 'new-message', label: 'New Messages', description: 'Receive a notification when you get a new message.' },
    { id: 'campaign-update', label: 'Campaign Updates', description: 'Get notified about status changes in your campaigns.' },
    { id: 'payment-update', label: 'Payment Updates', description: 'Receive alerts for incoming or completed payments.' },
    { id: 'promotional', label: 'Promotional Emails', description: 'Get occasional emails about new features and offers.' },
];


export function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Configure how you receive notifications from us.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {notifications.map(notification => (
            <div key={notification.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5 mb-2 sm:mb-0">
                    <Label htmlFor={notification.id} className="text-base font-medium">
                        {notification.label}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                        {notification.description}
                    </p>
                </div>
                <Switch id={notification.id} defaultChecked={notification.id !== 'promotional'} />
            </div>
        ))}
      </CardContent>
    </Card>
  );
}

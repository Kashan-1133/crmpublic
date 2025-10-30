import { AccountSettings } from "@/components/settings/account-settings";
import { NotificationSettings } from "@/components/settings/notification-settings";
import { ProfileSettings } from "@/components/settings/profile-settings";
import { ThemeSettings } from "@/components/settings/theme-settings";

export default function SettingsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your account, appearance, and notification preferences.</p>
            </div>
            <ProfileSettings />
            <NotificationSettings />
            <ThemeSettings />
            <AccountSettings />
        </div>
    );
}

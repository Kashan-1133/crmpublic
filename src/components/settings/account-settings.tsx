"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

export function AccountSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>
          Manage your account settings and preferences.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="current-password">Change Password</Label>
            <Input id="current-password" type="password" placeholder="Current Password" />
            <Input id="new-password" type="password" placeholder="New Password" />
            <Input id="confirm-password" type="password" placeholder="Confirm New Password" />
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4">
        <Button>Update Password</Button>
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 w-full">
            <h4 className="font-semibold text-destructive mb-2">Danger Zone</h4>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <p className="text-sm text-destructive/80">
                    Once you delete your account, there is no going back. Please be certain.
                </p>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive">Delete My Account</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            account and remove your data from our servers.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
      </CardFooter>
    </Card>
  );
}

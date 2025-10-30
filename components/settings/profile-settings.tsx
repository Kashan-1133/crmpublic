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
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function ProfileSettings() {
    const userAvatar = PlaceHolderImages.find(p => p.id === 'avatar-1');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Public Profile</CardTitle>
        <CardDescription>
          Customize your public presence and information.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
                <AvatarImage src={userAvatar?.imageUrl} alt="User Avatar" data-ai-hint={userAvatar?.imageHint} />
                <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
                <Button>Change Photo</Button>
                <p className="text-xs text-muted-foreground mt-1">JPG, GIF or PNG. 1MB max.</p>
            </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
            </div>
        </div>
        <div className="space-y-2">
            <Label htmlFor="bio">Your Bio</Label>
            <Textarea
                id="bio"
                placeholder="Tell us a little about yourself..."
                defaultValue="I'm a passionate creator focused on lifestyle and tech content. Always looking for exciting new collaborations!"
            />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Update Profile</Button>
      </CardFooter>
    </Card>
  );
}

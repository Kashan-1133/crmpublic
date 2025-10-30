'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { users } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { MessageCircle, Search } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function BrandHuntingDashboard() {

  const creators = users.filter(u => u.isCreator);
  const getAvatar = (id: string) => PlaceHolderImages.find(p => p.id === id);


  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
              <h1 className="text-3xl font-bold tracking-tight">Creator Discovery</h1>
              <p className="text-muted-foreground">Find and connect with talented creators for your next campaign.</p>
          </div>
      </div>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search by niche, platform, or name..." className="pl-10" />
            </div>
            <Button className="w-full sm:w-auto">Search Creators</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {creators.map((creator) => {
              const avatar = getAvatar(creator.avatarId);
              return (
                <Card key={creator.id}>
                  <CardHeader className="items-center text-center">
                    <Avatar className="w-24 h-24 mb-4">
                      <AvatarImage src={avatar?.imageUrl} alt={creator.name} data-ai-hint={avatar?.imageHint}/>
                      <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle>{creator.name}</CardTitle>
                    <CardDescription>@{creator.name.toLowerCase().replace(' ', '')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <div className="flex justify-center gap-2 mb-4 flex-wrap">
                          <Badge variant="secondary">Fashion</Badge>
                          <Badge variant="secondary">Lifestyle</Badge>
                          <Badge variant="secondary">Vlogs</Badge>
                      </div>
                      <div className="text-center text-sm text-muted-foreground">
                          <p>1.2M Followers</p>
                          <p>5.6% Engagement Rate</p>
                      </div>
                  </CardContent>
                  <CardFooter className="flex-col gap-2">
                      <Button className="w-full">View Profile</Button>
                      <Button variant="outline" className="w-full">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Send Message
                      </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import Image from 'next/image';
import { campaigns, users } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function BrandCampaigns() {
  const brandCampaigns = campaigns.filter(c => ['Outreach', 'Negotiation', 'Content Pending'].includes(c.status));

  const getAvatar = (id: string) => PlaceHolderImages.find(p => p.id === id);

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold tracking-tight">Latest Brand Campaigns</h2>
        <p className="text-muted-foreground">Discover new collaboration opportunities from top brands.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {brandCampaigns.map((campaign) => {
          const brand = users.find((u) => u.id === campaign.brandId);
          const brandAvatar = brand ? getAvatar(brand.avatarId) : undefined;
          return (
            <Card key={campaign.id} className="overflow-hidden group cursor-pointer flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="flex-row items-center gap-3 space-y-0 p-4">
                 <Avatar className="h-10 w-10">
                    <AvatarImage src={brandAvatar?.imageUrl} alt={brand?.name} data-ai-hint={brandAvatar?.imageHint} />
                    <AvatarFallback>{brand?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{brand?.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">Brand</p>
                  </div>
              </CardHeader>
              <CardContent className="p-4 space-y-3 flex-1">
                <p className="font-semibold text-md">{campaign.title}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  We are looking for creators to join our new {campaign.title} campaign! If you are passionate about what we do, let's connect.
                </p>
              </CardContent>
              <div className="p-4 pt-0">
                 <Button variant="outline" className="w-full">
                    View Campaign <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

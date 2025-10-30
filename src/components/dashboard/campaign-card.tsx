'use client';

import Image from 'next/image';
import { DollarSign, BrainCircuit } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Campaign, User } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface CampaignCardProps {
  campaign: Campaign;
  creator: User | undefined;
  brand: User | undefined;
  onAnalyzeClick: (campaign: Campaign) => void;
}

export function CampaignCard({ campaign, creator, brand, onAnalyzeClick }: CampaignCardProps) {
  
  const getAvatar = (id: string) => PlaceHolderImages.find(p => p.id === id);
  const creatorAvatar = creator ? getAvatar(creator.avatarId) : undefined;
  const brandAvatar = brand ? getAvatar(brand.avatarId) : undefined;

  return (
    <Card className="min-w-[280px] max-w-[320px] bg-card/50 hover:bg-card transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
      <CardHeader>
        <div className="flex justify-between items-start">
            <CardTitle className="text-base font-semibold">{campaign.title}</CardTitle>
            <Badge variant="secondary" className="whitespace-nowrap">
                {campaign.status}
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={creatorAvatar?.imageUrl} alt={creator?.name} data-ai-hint={creatorAvatar?.imageHint} />
              <AvatarFallback>{creator?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{creator?.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">{brand?.name}</span>
            <Avatar className="h-8 w-8">
              <AvatarImage src={brandAvatar?.imageUrl} alt={brand?.name} data-ai-hint={brandAvatar?.imageHint} />
              <AvatarFallback>{brand?.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="flex items-center text-primary font-bold">
            <DollarSign className="h-4 w-4 mr-1"/>
            {campaign.value.toLocaleString()}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" onClick={() => onAnalyzeClick(campaign)}>
            <BrainCircuit className="mr-2 h-4 w-4" />
            Analyze with AI
        </Button>
      </CardFooter>
    </Card>
  );
}

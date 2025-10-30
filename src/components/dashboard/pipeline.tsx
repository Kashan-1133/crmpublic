'use client';

import { useState } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { campaigns, users } from '@/lib/data';
import type { Campaign } from '@/lib/data';
import { CampaignCard } from './campaign-card';
import { AiDealTrackerDialog } from './ai-deal-tracker-dialog';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown } from 'lucide-react';

const pipelineStages = [
  'Outreach',
  'Negotiation',
  'Content Pending',
  'Payment Pending',
  'Completed',
  'Archived',
] as const;

export function Pipeline() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isAiDialogOpen, setIsAiDialogOpen] = useState(false);

  const handleAnalyzeClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsAiDialogOpen(true);
  };
  
  return (
    <div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Campaign Pipeline</h2>
          <p className="text-muted-foreground">Visualize and manage your campaigns from outreach to completion.</p>
        </div>
        <div className="relative">
            {/* Desktop View */}
            <ScrollArea className="hidden md:block">
                <div className="flex gap-6 pb-4">
                {pipelineStages.map((stage) => {
                    const stageCampaigns = campaigns.filter((c) => c.status === stage);
                    return (
                    <div key={stage} className="w-[320px] flex-shrink-0">
                        <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-md">
                            {stage}
                        </h3>
                        <span className="text-sm font-medium text-muted-foreground bg-secondary h-6 w-6 flex items-center justify-center rounded-full">
                            {stageCampaigns.length}
                        </span>
                        </div>
                        <div className="space-y-4 h-full">
                        {stageCampaigns.map((campaign) => {
                            const creator = users.find((u) => u.id === campaign.creatorId);
                            const brand = users.find((u) => u.id === campaign.brandId);
                            return (
                            <CampaignCard
                                key={campaign.id}
                                campaign={campaign}
                                creator={creator}
                                brand={brand}
                                onAnalyzeClick={handleAnalyzeClick}
                            />
                            );
                        })}
                        </div>
                    </div>
                    );
                })}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            {/* Mobile View */}
            <div className="md:hidden space-y-4">
                {pipelineStages.map(stage => {
                    const stageCampaigns = campaigns.filter((c) => c.status === stage);
                    if (stageCampaigns.length === 0) return null;
                    return (
                        <Collapsible key={stage} className="border-b" defaultOpen={stage === 'Outreach' || stage === 'Negotiation'}>
                            <CollapsibleTrigger className="flex justify-between items-center w-full py-4">
                                <div className="flex items-center gap-3">
                                    <h3 className="font-semibold text-md">{stage}</h3>
                                    <span className="text-sm font-medium text-muted-foreground bg-secondary h-6 w-6 flex items-center justify-center rounded-full">
                                        {stageCampaigns.length}
                                    </span>
                                </div>
                                <ChevronDown className="h-5 w-5 transition-transform [&[data-state=open]]:rotate-180" />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="py-4 space-y-4">
                                {stageCampaigns.map((campaign) => {
                                    const creator = users.find((u) => u.id === campaign.creatorId);
                                    const brand = users.find((u) => u.id === campaign.brandId);
                                    return (
                                        <div key={campaign.id} className="flex justify-center">
                                            <CampaignCard
                                                campaign={campaign}
                                                creator={creator}
                                                brand={brand}
                                                onAnalyzeClick={handleAnalyzeClick}
                                            />
                                        </div>
                                    );
                                })}
                            </CollapsibleContent>
                        </Collapsible>
                    )
                })}
            </div>

            <AiDealTrackerDialog 
                campaign={selectedCampaign}
                isOpen={isAiDialogOpen}
                onOpenChange={setIsAiDialogOpen}
            />
        </div>
    </div>
  );
}

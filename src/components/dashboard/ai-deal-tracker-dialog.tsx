'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Lightbulb, TrendingDown, CheckCircle } from 'lucide-react';
import { predictGhosting, PredictGhostingOutput } from '@/ai/flows/ai-predict-ghosting';
import type { Campaign } from '@/lib/data';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Badge } from '../ui/badge';

interface AiDealTrackerDialogProps {
  campaign: Campaign | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function AiDealTrackerDialog({ campaign, isOpen, onOpenChange }: AiDealTrackerDialogProps) {
  const [prediction, setPrediction] = useState<PredictGhostingOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && campaign) {
      const getPrediction = async () => {
        setIsLoading(true);
        setError(null);
        setPrediction(null);
        try {
          const result = await predictGhosting({
            dealStatus: campaign.status,
            lastContactDate: campaign.lastContactDate,
            communicationFrequency: campaign.communicationFrequency,
            clientResponsiveness: campaign.clientResponsiveness,
          });
          setPrediction(result);
        } catch (e) {
          setError('Failed to get AI prediction. Please try again.');
          console.error(e);
        } finally {
          setIsLoading(false);
        }
      };
      getPrediction();
    }
  }, [isOpen, campaign]);

  const ghostingLikelihoodValue = prediction ? parseInt(prediction.ghostingLikelihood.replace('%', '')) : 0;
  const likelihoodVariant = ghostingLikelihoodValue > 70 ? 'destructive' : ghostingLikelihoodValue > 40 ? 'secondary' : 'default';
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>AI Deal Analysis</DialogTitle>
          <DialogDescription>
            {campaign ? `Analyzing deal: "${campaign.title}"` : 'Loading...'}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          {isLoading && (
            <div className="flex flex-col items-center justify-center space-y-2 h-40">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">AI is analyzing the deal...</p>
            </div>
          )}
          {error && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
          {prediction && (
            <div className="space-y-6">
              <CardAnalysis 
                icon={TrendingDown} 
                title="Ghosting Likelihood"
                content={
                  <Badge variant={likelihoodVariant} className="text-2xl font-bold px-4 py-2">
                    {prediction.ghostingLikelihood}
                  </Badge>
                }
              />
              <CardAnalysis 
                icon={Lightbulb} 
                title="Recommended Action"
                content={<p className="text-sm">{prediction.recommendedAction}</p>}
              />
              <CardAnalysis 
                icon={CheckCircle} 
                title="Reasoning"
                content={<p className="text-sm text-muted-foreground">{prediction.reasoning}</p>}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

const CardAnalysis = ({ icon: Icon, title, content }: { icon: React.ElementType, title: string, content: React.ReactNode }) => (
    <div className="flex items-start gap-4">
        <div className="bg-secondary p-2 rounded-full">
            <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
            <h3 className="font-semibold text-md mb-1">{title}</h3>
            {content}
        </div>
    </div>
)

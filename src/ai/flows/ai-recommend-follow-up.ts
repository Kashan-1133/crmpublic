'use server';

/**
 * @fileOverview An AI agent that recommends follow-up actions based on deal analysis.
 *
 * - aiRecommendFollowUp - A function that handles the recommendation process.
 * - AIRecommendFollowUpInput - The input type for the aiRecommendFollowUp function.
 * - AIRecommendFollowUpOutput - The return type for the aiRecommendFollowUp function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIRecommendFollowUpInputSchema = z.object({
  dealStatus: z.string().describe('The current status of the deal (e.g., Outreach, Negotiation, Content Pending).'),
  lastContactDate: z.string().describe('The date of the last contact with the collaborator (YYYY-MM-DD).'),
  daysSinceLastContact: z.number().describe('The number of days since the last contact.'),
  engagementLevel: z.string().describe('The level of engagement from the collaborator (e.g., High, Medium, Low).'),
  dealValue: z.number().describe('The monetary value of the deal.'),
  notes: z.string().describe('Any notes or context about the deal.'),
});
export type AIRecommendFollowUpInput = z.infer<typeof AIRecommendFollowUpInputSchema>;

const AIRecommendFollowUpOutputSchema = z.object({
  recommendedAction: z.string().describe('The AI-recommended follow-up action (e.g., Send a reminder, Schedule a call, Escalate to manager).'),
  urgencyScore: z.number().describe('A score from 1 to 10 indicating the urgency of the follow-up (1 = low, 10 = high).'),
  rationale: z.string().describe('The AI rationale for the recommended action and urgency score.'),
});
export type AIRecommendFollowUpOutput = z.infer<typeof AIRecommendFollowUpOutputSchema>;

export async function aiRecommendFollowUp(input: AIRecommendFollowUpInput): Promise<AIRecommendFollowUpOutput> {
  return aiRecommendFollowUpFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiRecommendFollowUpPrompt',
  input: {schema: AIRecommendFollowUpInputSchema},
  output: {schema: AIRecommendFollowUpOutputSchema},
  prompt: `You are an AI assistant that analyzes deal statuses and recommends follow-up actions.

  Based on the deal status, last contact date, engagement level, and deal value, provide a recommended follow-up action, an urgency score (1-10), and a rationale.

  Deal Status: {{{dealStatus}}}
  Last Contact Date: {{{lastContactDate}}}
  Days Since Last Contact: {{{daysSinceLastContact}}}
  Engagement Level: {{{engagementLevel}}}
  Deal Value: {{{dealValue}}}
  Notes: {{{notes}}}

  Consider these factors when making your recommendation:
  - Deals in "Outreach" or "Negotiation" that have high value and low days since last contact should be prioritized.
  - Deals in "Content Pending" or "Payment Pending" require different follow up actions than those in early stages.
  - Low engagement levels might suggest a higher urgency to re-engage.
`,
});

const aiRecommendFollowUpFlow = ai.defineFlow(
  {
    name: 'aiRecommendFollowUpFlow',
    inputSchema: AIRecommendFollowUpInputSchema,
    outputSchema: AIRecommendFollowUpOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

'use server';

/**
 * @fileOverview AI tool to analyze deal statuses, predict potential ghosting, and recommend follow-up actions.
 *
 * - predictGhosting - A function that handles the ghosting prediction process.
 * - PredictGhostingInput - The input type for the predictGhosting function.
 * - PredictGhostingOutput - The return type for the predictGhosting function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictGhostingInputSchema = z.object({
  dealStatus: z
    .string()
    .describe("The current status of the deal (e.g., 'Outreach', 'Negotiation', 'Content Pending', 'Payment Pending')."),
  lastContactDate: z
    .string()
    .describe('The date of the last communication with the client (YYYY-MM-DD).'),
  communicationFrequency: z
    .string()
    .describe('The expected frequency of communication (e.g., Daily, Weekly, Bi-weekly).'),
  clientResponsiveness: z
    .string()
    .describe('A description of the client responsiveness so far (e.g., very responsive, somewhat responsive, not very responsive).'),
});
export type PredictGhostingInput = z.infer<typeof PredictGhostingInputSchema>;

const PredictGhostingOutputSchema = z.object({
  ghostingLikelihood: z
    .string()
    .describe('The likelihood of the client ghosting, as a percentage (e.g., 10%, 50%, 90%).'),
  recommendedAction: z
    .string()
    .describe('A recommended action to prevent ghosting (e.g., send a follow-up email, schedule a call, offer a discount).'),
  reasoning: z
    .string()
    .describe('The AI reasoning behind the ghosting likelihood prediction and recommended action.'),
});
export type PredictGhostingOutput = z.infer<typeof PredictGhostingOutputSchema>;

export async function predictGhosting(input: PredictGhostingInput): Promise<PredictGhostingOutput> {
  return predictGhostingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictGhostingPrompt',
  input: {schema: PredictGhostingInputSchema},
  output: {schema: PredictGhostingOutputSchema},
  prompt: `You are an AI assistant that analyzes deal statuses and predicts the likelihood of clients ghosting.

  Based on the following information, predict the likelihood of the client ghosting, recommend a follow-up action, and explain your reasoning.

  Deal Status: {{{dealStatus}}}
  Last Contact Date: {{{lastContactDate}}}
  Communication Frequency: {{{communicationFrequency}}}
  Client Responsiveness: {{{clientResponsiveness}}}

  Likelihood of Ghosting: (Provide a percentage, e.g., 10%, 50%, 90%)
  Recommended Action:
  Reasoning:`,
});

const predictGhostingFlow = ai.defineFlow(
  {
    name: 'predictGhostingFlow',
    inputSchema: PredictGhostingInputSchema,
    outputSchema: PredictGhostingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

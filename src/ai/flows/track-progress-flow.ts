'use server';
/**
 * @fileOverview An AI flow for tracking and visualizing personal progress.
 *
 * - trackProgress - A function that analyzes progress and provides insights.
 * - TrackProgressInput - The input type for the function.
 * - TrackProgressOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import { TrackProgressInput, TrackProgressInputSchema, TrackProgressOutput, TrackProgressOutputSchema } from '@/ai/schemas/track-progress-schema';

export type { TrackProgressInput, TrackProgressOutput };

export async function trackProgress(input: TrackProgressInput): Promise<TrackProgressOutput> {
  return trackProgressFlow(input);
}

const prompt = ai.definePrompt({
  name: 'trackProgressPrompt',
  input: {schema: TrackProgressInputSchema},
  output: {schema: TrackProgressOutputSchema},
  prompt: `You are an encouraging and insightful life coach. Analyze the user's progress towards their goal.

Goal: "{{goal}}"

Progress Data:
{{#each entries}}
- Date: {{date}}, Value: {{value}}{{#if notes}}, Notes: "{{notes}}"{{/if}}
{{/each}}

Based on the data, provide the following:
1.  **analysis**: Write a brief, encouraging analysis of their progress. Identify any positive trends, acknowledge their effort, and provide one or two insights. Format this in Markdown.
2.  **nextStep**: Suggest one clear, simple, and actionable next step they can take.
3.  **chartData**: Return the provided entries formatted as an array of objects with "date" and "value" keys.
`,
});

const trackProgressFlow = ai.defineFlow(
  {
    name: 'trackProgressFlow',
    inputSchema: TrackProgressInputSchema,
    outputSchema: TrackProgressOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

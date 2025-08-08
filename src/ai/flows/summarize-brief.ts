// Summarize the user's project brief using generative AI.

'use server';

/**
 * @fileOverview Summarizes a project brief using generative AI.
 *
 * - summarizeBrief - A function that summarizes a project brief.
 * - SummarizeBriefInput - The input type for the summarizeBrief function.
 * - SummarizeBriefOutput - The return type for the summarizeBrief function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeBriefInputSchema = z.object({
  brief: z
    .string()
    .describe('The project brief or mockup description to summarize.'),
});
export type SummarizeBriefInput = z.infer<typeof SummarizeBriefInputSchema>;

const SummarizeBriefOutputSchema = z.object({
  summary: z.string().describe('A summary of the key requirements and goals of the project brief.'),
});
export type SummarizeBriefOutput = z.infer<typeof SummarizeBriefOutputSchema>;

export async function summarizeBrief(input: SummarizeBriefInput): Promise<SummarizeBriefOutput> {
  return summarizeBriefFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeBriefPrompt',
  input: {schema: SummarizeBriefInputSchema},
  output: {schema: SummarizeBriefOutputSchema},
  prompt: `You are an expert project manager who specializes in summarizing project briefs for designers. Please read the project brief below and provide a concise summary of the key requirements and goals.

Project Brief:
{{{brief}}}`,
});

const summarizeBriefFlow = ai.defineFlow(
  {
    name: 'summarizeBriefFlow',
    inputSchema: SummarizeBriefInputSchema,
    outputSchema: SummarizeBriefOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

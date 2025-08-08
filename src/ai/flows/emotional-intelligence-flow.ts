'use server';
/**
 * @fileOverview An AI flow for developing emotional intelligence and resilience.
 *
 * - developEmotionalIntelligence - A function that provides coaching on a given scenario.
 * - DevelopEmotionalIntelligenceInput - The input type for the function.
 * - DevelopEmotionalIntelligenceOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DevelopEmotionalIntelligenceInputSchema = z.object({
  scenario: z.string().describe('A description of a situation or challenge where the user wants to improve their emotional intelligence or resilience.'),
});
export type DevelopEmotionalIntelligenceInput = z.infer<typeof DevelopEmotionalIntelligenceInputSchema>;

const DevelopEmotionalIntelligenceOutputSchema = z.object({
  response: z.string().describe('The AI life coach\'s guidance, including insights and actionable advice, in Markdown format.'),
});
export type DevelopEmotionalIntelligenceOutput = z.infer<typeof DevelopEmotionalIntelligenceOutputSchema>;

export async function developEmotionalIntelligence(input: DevelopEmotionalIntelligenceInput): Promise<DevelopEmotionalIntelligenceOutput> {
  return developEmotionalIntelligenceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'developEmotionalIntelligencePrompt',
  input: {schema: DevelopEmotionalIntelligenceInputSchema},
  output: {schema: DevelopEmotionalIntelligenceOutputSchema},
  prompt: `You are an expert life coach specializing in emotional intelligence and resilience. Your tone is empathetic, insightful, and encouraging.

Analyze the following scenario and provide guidance. Your response should be structured in Markdown and include:
1.  **Reflection**: A brief, empathetic acknowledgment of the user's situation and feelings.
2.  **Insight**: An explanation of the underlying emotional dynamics at play.
3.  **Actionable Steps**: 2-3 concrete, practical steps the user can take to handle the situation more effectively and build resilience.

Scenario:
"{{scenario}}"
`,
});

const developEmotionalIntelligenceFlow = ai.defineFlow(
  {
    name: 'developEmotionalIntelligenceFlow',
    inputSchema: DevelopEmotionalIntelligenceInputSchema,
    outputSchema: DevelopEmotionalIntelligenceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

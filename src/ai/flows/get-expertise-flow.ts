'use server';
/**
 * @fileOverview An AI flow that provides expert strategic recommendations.
 *
 * - getExpertise - A function that returns strategic advice.
 * - GetExpertiseInput - The input type for the getExpertise function.
 * - GetExpertiseOutput - The return type for the getExpertise function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetExpertiseInputSchema = z.object({
  problemStatement: z.string().describe('A description of the project, problem, or question for which expert advice is sought.'),
});
export type GetExpertiseInput = z.infer<typeof GetExpertiseInputSchema>;

const GetExpertiseOutputSchema = z.object({
  response: z.string().describe('The AI expert\'s strategic recommendations and insights in Markdown format.'),
});
export type GetExpertiseOutput = z.infer<typeof GetExpertiseOutputSchema>;

export async function getExpertise(input: GetExpertiseInput): Promise<GetExpertiseOutput> {
  return getExpertiseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getExpertisePrompt',
  input: {schema: GetExpertiseInputSchema},
  output: {schema: GetExpertiseOutputSchema},
  prompt: `You are a world-class AI consultant for a web development agency. Your purpose is to provide strategic recommendations and insights for client projects.

Analyze the following problem statement and provide a clear, concise, and actionable response. Structure your response in Markdown for readability.

Problem Statement:
"{{problemStatement}}"
`,
});

const getExpertiseFlow = ai.defineFlow(
  {
    name: 'getExpertiseFlow',
    inputSchema: GetExpertiseInputSchema,
    outputSchema: GetExpertiseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

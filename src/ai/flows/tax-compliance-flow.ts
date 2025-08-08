'use server';
/**
 * @fileOverview An AI flow for providing tax compliance information and optimization suggestions.
 *
 * - getTaxAdvice - A function that provides tax advice based on a user's query.
 * - GetTaxAdviceInput - The input type for the function.
 * - GetTaxAdviceOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetTaxAdviceInputSchema = z.object({
  query: z.string().describe('The user\'s question about tax compliance or optimization.'),
});
export type GetTaxAdviceInput = z.infer<typeof GetTaxAdviceInputSchema>;

const GetTaxAdviceOutputSchema = z.object({
  response: z.string().describe('The AI tax assistant\'s response, including information, suggestions, and a disclaimer, in Markdown format.'),
});
export type GetTaxAdviceOutput = z.infer<typeof GetTaxAdviceOutputSchema>;

export async function getTaxAdvice(input: GetTaxAdviceInput): Promise<GetTaxAdviceOutput> {
  return taxComplianceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'taxCompliancePrompt',
  input: {schema: GetTaxAdviceInputSchema},
  output: {schema: GetTaxAdviceOutputSchema},
  prompt: `You are an expert AI assistant for an accountancy firm. Your persona is professional, knowledgeable, and helpful.

A user has a question about tax compliance or optimization. Analyze their query and provide a clear, detailed, and helpful response in Markdown format.

Your response should:
1.  Directly address the user's question.
2.  Explain relevant tax laws or concepts in simple terms.
3.  Suggest potential tax optimization strategies if applicable.
4.  ALWAYS include the following disclaimer at the end of your response:

---
***Disclaimer:** This information is for educational purposes only and does not constitute professional financial or tax advice. Please consult with a qualified accountant or financial advisor before making any financial decisions.*

User's Query:
"{{query}}"
`,
});

const taxComplianceFlow = ai.defineFlow(
  {
    name: 'taxComplianceFlow',
    inputSchema: GetTaxAdviceInputSchema,
    outputSchema: GetTaxAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

'use server';
/**
 * @fileOverview An AI flow for generating technical documentation from code.
 *
 * - generateDocs - A function that handles the documentation generation process.
 * - GenerateDocsInput - The input type for the generateDocs function.
 * - GenerateDocsOutput - The return type for the generateDocs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDocsInputSchema = z.object({
  code: z
    .string()
    .describe('The source code of the component or function to document.'),
  componentName: z.string().describe('The name of the component or function.'),
});
export type GenerateDocsInput = z.infer<typeof GenerateDocsInputSchema>;

const GenerateDocsOutputSchema = z.object({
  documentation: z.string().describe('The generated technical documentation in Markdown format.'),
});
export type GenerateDocsOutput = z.infer<typeof GenerateDocsOutputSchema>;

export async function generateDocs(input: GenerateDocsInput): Promise<GenerateDocsOutput> {
  return generateDocsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDocsPrompt',
  input: {schema: GenerateDocsInputSchema},
  output: {schema: GenerateDocsOutputSchema},
  prompt: `You are an expert technical writer specializing in creating clear and concise documentation for web components.

Generate technical documentation for the following component named '{{componentName}}'.

The documentation should be in Markdown format and include the following sections:
- A brief overview of the component's purpose.
- A list of its props, including their types and a short description of what they do.
- A simple usage example in a code block.
- Any important notes or considerations.

Source Code:
\`\`\`
{{{code}}}
\`\`\`
`,
});

const generateDocsFlow = ai.defineFlow(
  {
    name: 'generateDocsFlow',
    inputSchema: GenerateDocsInputSchema,
    outputSchema: GenerateDocsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

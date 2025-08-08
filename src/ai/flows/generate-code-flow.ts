'use server';
/**
 * @fileOverview An AI flow for generating React component code from a description.
 *
 * - generateCode - A function that handles the code generation process.
 * - GenerateCodeInput - The input type for the generateCode function.
 * - GenerateCodeOutput - The return type for the generateCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCodeInputSchema = z.object({
  description: z.string().describe('A description of the React component to generate.'),
});
export type GenerateCodeInput = z.infer<typeof GenerateCodeInputSchema>;

const GenerateCodeOutputSchema = z.object({
  code: z.string().describe('The generated React component code, including necessary imports.'),
});
export type GenerateCodeOutput = z.infer<typeof GenerateCodeOutputSchema>;

export async function generateCode(input: GenerateCodeInput): Promise<GenerateCodeOutput> {
  return generateCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCodePrompt',
  input: {schema: GenerateCodeInputSchema},
  output: {schema: GenerateCodeOutputSchema},
  prompt: `You are an expert React/Next.js developer who creates clean, modern, and functional components using TypeScript, TailwindCSS, and shadcn/ui components.

Generate a single React component file based on the following description.

The component should:
- Be a client component ('use client').
- Use functional component syntax with hooks.
- Use shadcn/ui components where appropriate (e.g., Button, Card, Input).
- Use lucide-react for icons.
- Use TailwindCSS for styling.
- Be fully typed with TypeScript.
- Do not include any comments in the code.
- Provide only the code for the component.

Description:
"{{description}}"
`,
});

const generateCodeFlow = ai.defineFlow(
  {
    name: 'generateCodeFlow',
    inputSchema: GenerateCodeInputSchema,
    outputSchema: GenerateCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

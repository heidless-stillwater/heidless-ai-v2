'use server';
/**
 * @fileOverview An AI flow for providing a habit formation or breaking plan.
 *
 * - getHabitPlan - A function that provides a coaching plan for a given habit.
 * - GetHabitPlanInput - The input type for the function.
 * - GetHabitPlanOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetHabitPlanInputSchema = z.object({
  habit: z.string().describe('A description of the habit the user wants to form or break.'),
  action: z.enum(['form', 'break']).describe("Whether the user wants to 'form' a new habit or 'break' an existing one."),
  context: z.string().optional().describe('Any additional context about the user\'s lifestyle, challenges, or previous attempts.'),
});
export type GetHabitPlanInput = z.infer<typeof GetHabitPlanInputSchema>;

const GetHabitPlanOutputSchema = z.object({
  plan: z.string().describe('The AI habit coach\'s detailed plan, in Markdown format.'),
});
export type GetHabitPlanOutput = z.infer<typeof GetHabitPlanOutputSchema>;

export async function getHabitPlan(input: GetHabitPlanInput): Promise<GetHabitPlanOutput> {
  return getHabitPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getHabitPlanPrompt',
  input: {schema: GetHabitPlanInputSchema},
  output: {schema: GetHabitPlanOutputSchema},
  prompt: `You are an expert coach specializing in behavioral psychology and habit formation. Your tone is encouraging, scientific, and practical.

A user wants to {{action}} a habit.

Habit: "{{habit}}"
{{#if context}}
Additional Context: "{{context}}"
{{/if}}

Based on this, create a detailed, actionable plan in Markdown format. The plan should include the following sections:

1.  **Understanding Your 'Why'**: Start with an empathetic acknowledgment and help the user solidify their core motivation for this change.
2.  **The Science Behind It**: Briefly explain a relevant psychological principle (e.g., habit loops, implementation intentions, temptation bundling).
3.  **Your Action Plan**: Provide 3-5 clear, concrete, and incremental steps. If breaking a habit, include identifying triggers and replacement behaviors.
4.  **Tracking Success**: Suggest a simple method for tracking progress and celebrating small wins.
5.  **Overcoming Obstacles**: Anticipate one potential challenge and provide a strategy to overcome it.
`,
});

const getHabitPlanFlow = ai.defineFlow(
  {
    name: 'getHabitPlanFlow',
    inputSchema: GetHabitPlanInputSchema,
    outputSchema: GetHabitPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

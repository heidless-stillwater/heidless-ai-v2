'use server';
/**
 * @fileOverview An AI flow for generating personalized workout plans.
 *
 * - getWorkoutPlan - Generates a workout plan based on user inputs.
 * - GetWorkoutPlanInput - The input type for the function.
 * - GetWorkoutPlanOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import { GetWorkoutPlanInput, GetWorkoutPlanInputSchema, GetWorkoutPlanOutput, GetWorkoutPlanOutputSchema } from '@/ai/schemas/workout-plan-schema';

export type { GetWorkoutPlanInput, GetWorkoutPlanOutput };

export async function getWorkoutPlan(input: GetWorkoutPlanInput): Promise<GetWorkoutPlanOutput> {
  return workoutPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'workoutPlanPrompt',
  input: {schema: GetWorkoutPlanInputSchema},
  output: {schema: GetWorkoutPlanOutputSchema},
  prompt: `You are an expert fitness coach and personal trainer. Your task is to create a safe, effective, and personalized one-week workout plan based on the user's details.

User Profile:
- Goal: {{fitnessGoal}}
- Level: {{fitnessLevel}}
- Days Available: {{daysPerWeek}} per week
- Equipment: "{{availableEquipment}}"

Generate a structured one-week workout plan.
- Create a logical split based on the number of days (e.g., full body, upper/lower, push/pull/legs).
- Ensure rest days are included appropriately. For {{daysPerWeek}} < 7, fill the remaining days in the schedule with a "Rest Day" and no exercises.
- Select appropriate exercises based on the user's goal, level, and equipment.
- Provide clear sets, reps, and rest times for each exercise.
- In the 'notes' section, provide crucial advice in Markdown format:
  1.  **Warm-Up:** A brief general warm-up routine (e.g., 5-10 mins of light cardio and dynamic stretching).
  2.  **Cool-Down:** A brief cool-down routine (e.g., 5-10 mins of static stretching).
  3.  **Progressive Overload:** Briefly explain the principle of progressive overload (e.g., gradually increasing weight, reps, or sets over time).
  4.  **Disclaimer:** Include this exact sentence: "This is an AI-generated plan. Consult with a healthcare professional before starting any new fitness program. Listen to your body and stop if you feel pain."
`,
});

const workoutPlanFlow = ai.defineFlow(
  {
    name: 'workoutPlanFlow',
    inputSchema: GetWorkoutPlanInputSchema,
    outputSchema: GetWorkoutPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

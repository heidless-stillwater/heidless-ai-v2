/**
 * @fileOverview Shared Zod schemas and TypeScript types for the workout plan feature.
 */
import { z } from 'zod';

export const GetWorkoutPlanInputSchema = z.object({
  fitnessGoal: z.enum(['lose-weight', 'build-muscle', 'improve-endurance']).describe("The user's primary fitness goal."),
  fitnessLevel: z.enum(['beginner', 'intermediate', 'advanced']).describe("The user's current fitness level."),
  daysPerWeek: z.number().int().min(1).max(7).describe("How many days per week the user can work out."),
  availableEquipment: z.string().describe("A list of available equipment (e.g., 'Full gym access', 'Dumbbells and resistance bands', 'Bodyweight only')."),
});
export type GetWorkoutPlanInput = z.infer<typeof GetWorkoutPlanInputSchema>;

const ExerciseSchema = z.object({
    name: z.string().describe("The name of the exercise."),
    sets: z.number().int().describe("The number of sets."),
    reps: z.string().describe("The target repetition range (e.g., '8-12 reps')."),
    rest: z.string().describe("The recommended rest period between sets (e.g., '60-90 seconds')."),
});

const DailyWorkoutSchema = z.object({
    day: z.string().describe("The focus for the day (e.g., 'Day 1: Upper Body Push' or 'Rest Day')."),
    exercises: z.array(ExerciseSchema).optional().describe("A list of exercises for the workout day. Empty for rest days."),
});

export const GetWorkoutPlanOutputSchema = z.object({
  planName: z.string().describe("A catchy and descriptive name for the workout plan."),
  weeklySchedule: z.array(DailyWorkoutSchema).describe("A structured array representing the workout for each day of the week."),
  notes: z.string().describe("General advice including warm-up, cool-down, progressive overload, and a safety disclaimer, formatted in Markdown."),
});
export type GetWorkoutPlanOutput = z.infer<typeof GetWorkoutPlanOutputSchema>;

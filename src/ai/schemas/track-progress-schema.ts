/**
 * @fileOverview Shared Zod schemas and TypeScript types for the progress tracking feature.
 */
import { z } from 'zod';

export const ProgressEntrySchema = z.object({
  date: z.string().describe('The date of the progress entry in YYYY-MM-DD format.'),
  value: z.number().describe('A numerical value representing progress (e.g., weight, minutes studied, mood rating).'),
  notes: z.string().optional().describe('Optional notes for the entry.'),
});

export const TrackProgressInputSchema = z.object({
  goal: z.string().describe('The overall goal the user is tracking.'),
  entries: z.array(ProgressEntrySchema).describe('An array of progress entries.'),
});
export type TrackProgressInput = z.infer<typeof TrackProgressInputSchema>;

export const TrackProgressOutputSchema = z.object({
  analysis: z.string().describe('AI-generated analysis of the progress, identifying trends, offering encouragement, and insights in Markdown format.'),
  nextStep: z.string().describe('A suggested, actionable next step for the user.'),
  chartData: z.array(z.object({
    date: z.string(),
    value: z.number(),
  })).describe('The progress entries formatted for chart display.'),
});
export type TrackProgressOutput = z.infer<typeof TrackProgressOutputSchema>;

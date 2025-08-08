/**
 * @fileOverview Shared Zod schemas and TypeScript types for the custom site generator feature.
 */
import { z } from 'zod';

export const TemplateSchema = z.object({
  name: z.string(),
  category: z.string(),
  url: z.string().url(),
  description: z.string(),
  thumbnailUrl: z.string().url(),
});

export const CustomSiteGeneratorInputSchema = z.object({
  categoryPattern: z.string().optional(),
  templatePattern: z.string().optional(),
});
export type CustomSiteGeneratorInput = z.infer<typeof CustomSiteGeneratorInputSchema>;

export const CustomSiteGeneratorOutputSchema = z.object({
  templates: z.array(TemplateSchema),
});
export type CustomSiteGeneratorOutput = z.infer<typeof CustomSiteGeneratorOutputSchema>;

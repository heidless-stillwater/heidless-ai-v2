'use server';
/**
 * @fileOverview A flow for retrieving and filtering website templates.
 *
 * - getTemplates - A function that returns a list of website templates based on optional filters.
 * - CustomSiteGeneratorInput - The input type for the getTemplates function.
 * - CustomSiteGeneratorOutput - The return type for the getTemplates function.
 */
import { z } from 'zod';
import { ai } from '@/ai/genkit';
import { CustomSiteGeneratorInputSchema, CustomSiteGeneratorOutputSchema, type CustomSiteGeneratorInput, type CustomSiteGeneratorOutput, TemplateSchema } from '@/ai/schemas/custom-site-generator-schema';

export type { CustomSiteGeneratorInput, CustomSiteGeneratorOutput };

const allTemplates: z.infer<typeof TemplateSchema>[] = [
  {
    name: 't002-plumb-spa-v1',
    category: 'tradesman',
    url: 'https://idx-studio-1510340356-477976862873.europe-west2.run.app/',
    description: 'A clean and professional single-page application for plumbers and other tradespeople.',
    thumbnailUrl: 'https://storage.googleapis.com/heidless-ai-bucket/thumbnails/partial/t002-plumb-spa-v1-thumbnail-dark-partial.png',
  },
  {
    name: 't000-dental-v1',
    category: 'healthcare',
    url: 'https://idx-studio-1456950349-477976862873.europe-west2.run.app/',
    description: 'A modern and trustworthy website for dental practices, designed to attract new patients.',
    thumbnailUrl: 'https://storage.googleapis.com/heidless-ai-bucket/thumbnails/partial/t000-dental-v1-dark-partial.png',
  },
  {
    name: 't000-fitness-spa-v1',
    category: 'wellbeing',
    url: 'https://idx-studio-3228369809-477976862873.europe-west2.run.app/',
    description: 'A dynamic and motivating single-page application for fitness coaches and personal trainers.',
    thumbnailUrl: 'https://storage.googleapis.com/heidless-ai-bucket/thumbnails/partial/t000-fitness-spa-v1-light-partial.png',
  },
  {
    name: 't003-lifec-spa-v1',
    category: 'wellbeing',
    url: 'https://idx-studio-6382024385-477976862873.europe-west2.run.app/',
    description: 'An elegant and calming single-page website for life coaches and wellness experts.',
    thumbnailUrl: 'https://storage.googleapis.com/heidless-ai-bucket/thumbnails/partial/t003-lifec-spa-v1-dark-partial.png',
  },
  {
    name: 't003-lifec-web-v4',
    category: 'wellbeing',
    url: 'https://idx-studio-2337770808-477976862873.europe-west2.run.app/',
    description: 'A comprehensive multi-page website for established life coaching businesses.',
    thumbnailUrl: 'https://storage.googleapis.com/heidless-ai-bucket/thumbnails/partial/t003-lifec-web-v4-dark-partial.png',
  },
  {
    name: 't004-elec-spa-v1',
    category: 'tradesman',
    url: 'https://idx-studio-3333333333-477976862873.europe-west2.run.app/',
    description: 'A reliable and efficient single-page site for electricians, showcasing services and expertise.',
    thumbnailUrl: 'https://storage.googleapis.com/heidless-ai-bucket/thumbnails/partial/t004-elec-spa-v1-light-partial.png',
  },
];

const customSiteGeneratorFlow = ai.defineFlow(
  {
    name: 'customSiteGeneratorFlow',
    inputSchema: CustomSiteGeneratorInputSchema,
    outputSchema: CustomSiteGeneratorOutputSchema,
  },
  async (input) => {
    let filteredTemplates = allTemplates;

    if (input.categoryPattern && input.categoryPattern !== 'all') {
        filteredTemplates = filteredTemplates.filter(t => t.category === input.categoryPattern);
    }
    
    if (input.templatePattern) {
        const regex = new RegExp(input.templatePattern, 'i');
        filteredTemplates = filteredTemplates.filter(t => regex.test(t.name));
    }

    return {
      templates: filteredTemplates,
    };
  }
);


export async function getTemplates(
  input: CustomSiteGeneratorInput
): Promise<CustomSiteGeneratorOutput> {
  return customSiteGeneratorFlow(input);
}

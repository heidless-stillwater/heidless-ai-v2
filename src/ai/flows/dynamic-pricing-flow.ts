'use server';
/**
 * @fileOverview An AI flow for generating dynamic pricing promotions for a fast-food business.
 *
 * - getDynamicPromotion - Generates a promotion based on various business factors.
 * - DynamicPricingInput - The input type for the function.
 * - DynamicPricingOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DynamicPricingInputSchema = z.object({
  timeOfDay: z.enum(['breakfast', 'lunch-rush', 'afternoon-lull', 'dinner-peak', 'late-night']).describe('The current time of day.'),
  stockLevels: z.string().describe('A description of current stock levels, highlighting any items that are overstocked or understocked.'),
  weather: z.enum(['sunny', 'rainy', 'cold', 'hot']).describe('The current weather conditions.'),
  localEvents: z.string().optional().describe('Any local events happening that might affect customer traffic.'),
});
export type DynamicPricingInput = z.infer<typeof DynamicPricingInputSchema>;

const DynamicPricingOutputSchema = z.object({
  promotionName: z.string().describe('A catchy name for the generated promotion.'),
  promotionDetails: z.string().describe('A clear description of the offer (e.g., "Buy one get one free on all large pizzas").'),
  targetAudience: z.string().describe('The specific customer segment the promotion is aimed at.'),
  reasoning: z.string().describe('A brief explanation of the business logic behind why this promotion is a good idea given the current factors.'),
});
export type DynamicPricingOutput = z.infer<typeof DynamicPricingOutputSchema>;

export async function getDynamicPromotion(input: DynamicPricingInput): Promise<DynamicPricingOutput> {
  return dynamicPricingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dynamicPricingPrompt',
  input: {schema: DynamicPricingInputSchema},
  output: {schema: DynamicPricingOutputSchema},
  prompt: `You are an expert AI assistant for a fast-food restaurant manager. Your goal is to create profitable, short-term promotional offers based on a set of real-time factors.

Analyze the following factors and devise a single, compelling promotional offer. The offer should aim to either drive traffic during slow periods, move excess inventory, or capitalize on high-demand opportunities.

Current Factors:
- Time of Day: {{timeOfDay}}
- Weather: {{weather}}
- Current Stock: "{{stockLevels}}"
{{#if localEvents}}
- Local Events: "{{localEvents}}"
{{/if}}

Based on these factors, generate a promotion with a catchy name, clear details, a target audience, and a solid business reason for running it. For example, if it's an afternoon lull and stock of milkshakes is high, you might suggest a half-price milkshake offer to attract students.
`,
});

const dynamicPricingFlow = ai.defineFlow(
  {
    name: 'dynamicPricingFlow',
    inputSchema: DynamicPricingInputSchema,
    outputSchema: DynamicPricingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

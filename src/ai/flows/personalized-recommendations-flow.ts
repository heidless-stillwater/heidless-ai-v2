'use server';
/**
 * @fileOverview An AI flow for generating personalized menu recommendations for a fast-food business.
 *
 * - getPersonalizedRecommendation - Generates menu suggestions based on user preferences.
 * - PersonalizedRecommendationsInput - The input type for the function.
 * - PersonalizedRecommendationsOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  dietaryPreference: z.enum(['none', 'vegetarian', 'halal']).describe('The user\'s dietary preference.'),
  flavorProfile: z.enum(['none', 'spicy', 'mild', 'savory']).describe('The user\'s desired flavor profile.'),
  hungerLevel: z.enum(['snack', 'regular', 'large']).describe('The user\'s current hunger level.'),
});
export type PersonalizedRecommendationsInput = z.infer<typeof PersonalizedRecommendationsInputSchema>;

const RecommendationSchema = z.object({
    itemName: z.string().describe('The name of the recommended menu item.'),
    description: z.string().describe('A brief, enticing description of the item.'),
    reason: z.string().describe('The reason why this item was recommended based on the user\'s preferences.'),
});

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z.array(RecommendationSchema).describe('A list of 1 to 3 personalized menu recommendations.'),
});
export type PersonalizedRecommendationsOutput = z.infer<typeof PersonalizedRecommendationsOutputSchema>;

export async function getPersonalizedRecommendation(input: PersonalizedRecommendationsInput): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are a friendly and helpful AI assistant for a fast-food restaurant called "Best Kebab". Your goal is to give personalized menu recommendations to customers.

Here is our menu:
- Doner Kebab (Halal): Lamb, fresh salad, pita bread. (Savory)
- Chicken Kebab (Halal): Grilled chicken, fresh salad, pita bread. (Savory)
- Spicy Chicken Kebab (Halal): Spicy grilled chicken, fresh salad, chili sauce, pita bread. (Spicy)
- Veggie Kebab (Vegetarian): Falafel, hummus, fresh salad, pita bread. (Savory, Mild)
- Large Mixed Kebab (Halal): A mix of doner and chicken, extra large portion. (Savory)
- Burger: Beef patty, cheese, salad, brioche bun. (Savory)
- Spicy Burger: Beef patty, jalapeños, spicy sauce, cheese, brioche bun. (Spicy)
- Fries: Classic salted fries. (Snack, Mild)
- Onion Rings: Crispy fried onion rings. (Snack, Savory)
- Pizza Margherita (Vegetarian): Tomato, mozzarella, basil. (Mild)

Analyze the customer's preferences and suggest 1 to 3 items from the menu. For each suggestion, provide the item name, a brief description, and a compelling reason why it fits their choices.

Customer Preferences:
- Dietary Need: {{dietaryPreference}}
- Flavor Profile: {{flavorProfile}}
- Hunger Level: {{hungerLevel}}
`,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

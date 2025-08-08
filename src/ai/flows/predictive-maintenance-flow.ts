'use server';
/**
 * @fileOverview An AI flow for predicting dental equipment maintenance needs.
 *
 * - getMaintenancePrediction - Predicts failures and suggests maintenance.
 * - PredictiveMaintenanceInput - The input type for the function.
 * - PredictiveMaintenanceOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictiveMaintenanceInputSchema = z.object({
  equipmentType: z.enum(['autoclave', 'xray-unit', 'compressor', 'dental-chair']).describe('The type of dental equipment.'),
  ageInMonths: z.number().int().positive().describe('The age of the equipment in months.'),
  weeklyUsageHours: z.number().positive().describe('The average number of hours the equipment is used per week.'),
  errorLog: z.string().optional().describe('A brief log of any recent error codes or unusual behavior.'),
});
export type PredictiveMaintenanceInput = z.infer<typeof PredictiveMaintenanceInputSchema>;

const RecommendedActionSchema = z.object({
    action: z.string().describe('The specific maintenance action recommended.'),
    reason: z.string().describe('The reason why this action is being recommended.'),
});

const PredictiveMaintenanceOutputSchema = z.object({
  riskAssessment: z.enum(['Low', 'Moderate', 'High']).describe("The AI's assessment of the immediate failure risk."),
  predictedFailure: z.string().describe("A specific prediction of what is likely to fail and a rough timeline (e.g., 'Compressor motor burnout within 3-6 months')."),
  recommendedActions: z.array(RecommendedActionSchema).describe('An array of recommended maintenance actions to prevent the predicted failure.'),
});
export type PredictiveMaintenanceOutput = z.infer<typeof PredictiveMaintenanceOutputSchema>;

export async function getMaintenancePrediction(input: PredictiveMaintenanceInput): Promise<PredictiveMaintenanceOutput> {
  return predictiveMaintenanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictiveMaintenancePrompt',
  input: {schema: PredictiveMaintenanceInputSchema},
  output: {schema: PredictiveMaintenanceOutputSchema},
  prompt: `You are an expert AI technician specializing in the predictive maintenance of dental equipment.
Your task is to analyze data for a piece of equipment and predict potential failures, assess the risk level, and recommend proactive maintenance.

Analyze the following equipment data:
- Equipment Type: {{equipmentType}}
- Age: {{ageInMonths}} months
- Weekly Usage: {{weeklyUsageHours}} hours/week
{{#if errorLog}}
- Recent Errors/Behavior: "{{errorLog}}"
{{/if}}

Based on this data, provide a structured maintenance prediction.
- For high usage and/or older equipment, the risk should be higher.
- Error logs should significantly increase the risk assessment.
- The predicted failure should be specific and plausible for the given equipment type.
- Recommendations should be clear, actionable, and directly related to mitigating the predicted failure.
`,
});

const predictiveMaintenanceFlow = ai.defineFlow(
  {
    name: 'predictiveMaintenanceFlow',
    inputSchema: PredictiveMaintenanceInputSchema,
    outputSchema: PredictiveMaintenanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

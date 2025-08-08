'use server';
/**
 * @fileOverview An AI flow for generating preliminary dental treatment plans.
 *
 * - getTreatmentPlan - Generates a plan based on patient symptoms.
 * - GetTreatmentPlanInput - The input type for the function.
 * - GetTreatmentPlanOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetTreatmentPlanInputSchema = z.object({
  symptoms: z.string().describe("A description of the patient's current symptoms and primary concern."),
  history: z.string().optional().describe("A brief summary of the patient's relevant dental history."),
});
export type GetTreatmentPlanInput = z.infer<typeof GetTreatmentPlanInputSchema>;

const ProcedureSchema = z.object({
    name: z.string().describe("The name of the recommended dental procedure."),
    description: z.string().describe("A brief, easy-to-understand description of the procedure."),
});

const GetTreatmentPlanOutputSchema = z.object({
  potentialDiagnosis: z.string().describe("A possible diagnosis based on the provided symptoms. This should be phrased carefully as a possibility, not a certainty."),
  recommendedProcedures: z.array(ProcedureSchema).describe("An array of recommended procedures to address the issue."),
  estimatedCost: z.string().describe("An estimated cost range for the entire treatment plan (e.g., '£200 - £400')."),
  disclaimer: z.string().describe("A mandatory disclaimer stating this is not a real diagnosis and a professional dentist must be consulted."),
});
export type GetTreatmentPlanOutput = z.infer<typeof GetTreatmentPlanOutputSchema>;

export async function getTreatmentPlan(input: GetTreatmentPlanInput): Promise<GetTreatmentPlanOutput> {
  return treatmentPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'treatmentPlanPrompt',
  input: {schema: GetTreatmentPlanInputSchema},
  output: {schema: GetTreatmentPlanOutputSchema},
  prompt: `You are an expert AI dental assistant. Your role is to generate a *preliminary, informational* treatment plan based on a patient's self-reported symptoms.

You must be extremely careful not to provide a definitive diagnosis or medical advice.

Analyze the following patient information:
- Symptoms: "{{symptoms}}"
{{#if history}}
- Dental History: "{{history}}"
{{/if}}

Based on this, generate a possible treatment plan. The plan must include:
1.  **potentialDiagnosis**: A *possible* diagnosis. Start this with "Based on your description, one possibility could be...".
2.  **recommendedProcedures**: A list of 1-3 common procedures that might be involved in treating such an issue.
3.  **estimatedCost**: A rough, non-binding cost estimate for the procedures.
4.  **disclaimer**: You must *always* return the following text for the disclaimer field, exactly as written: "IMPORTANT: This is a preliminary, AI-generated guide and is NOT a substitute for a professional diagnosis. You must consult with a qualified dentist for an accurate assessment and treatment plan."
`,
});

const treatmentPlanFlow = ai.defineFlow(
  {
    name: 'treatmentPlanFlow',
    inputSchema: GetTreatmentPlanInputSchema,
    outputSchema: GetTreatmentPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

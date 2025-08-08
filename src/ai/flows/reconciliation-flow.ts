'use server';
/**
 * @fileOverview An AI flow for reconciling two sets of transaction data.
 *
 * - reconcileTransactions - Reconciles transactions from two sources.
 * - ReconciliationInput - The input type for the function.
 * - ReconciliationOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TransactionSchema = z.object({
  id: z.string().describe('A unique identifier for the transaction.'),
  date: z.string().describe('The date of the transaction (e.g., YYYY-MM-DD).'),
  description: z.string().describe('A description of the transaction.'),
  amount: z.number().describe('The transaction amount.'),
});

const ReconciliationInputSchema = z.object({
  source1Name: z.string().describe('The name of the first data source (e.g., "Bank Statement").'),
  source1Data: z.string().describe('The first set of transaction data, typically in CSV format.'),
  source2Name: z.string().describe('The name of the second data source (e.g., "Company Records").'),
  source2Data: z.string().describe('The second set of transaction data, typically in CSV format.'),
});
export type ReconciliationInput = z.infer<typeof ReconciliationInputSchema>;

const ReconciliationOutputSchema = z.object({
  matched: z.array(z.object({
    source1: TransactionSchema,
    source2: TransactionSchema,
  })).describe('An array of transactions that were successfully matched between the two sources.'),
  unmatchedSource1: z.array(TransactionSchema).describe('An array of transactions from the first source that could not be matched.'),
  unmatchedSource2: z.array(TransactionSchema).describe('An array of transactions from the second source that could not be matched.'),
  summary: z.string().describe('A brief summary of the reconciliation process, highlighting key findings and potential issues.'),
});
export type ReconciliationOutput = z.infer<typeof ReconciliationOutputSchema>;

export async function reconcileTransactions(input: ReconciliationInput): Promise<ReconciliationOutput> {
  return reconciliationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'reconciliationPrompt',
  input: {schema: ReconciliationInputSchema},
  output: {schema: ReconciliationOutputSchema},
  prompt: `You are an expert AI accountant specializing in financial reconciliation.
Your task is to compare two sets of transaction data and identify matches, discrepancies, and items that do not appear in the other list.

- Source 1 Name: {{source1Name}}
- Source 2 Name: {{source2Name}}

You will be given two sets of data, likely in CSV format. You need to parse them and then perform the reconciliation.
Matching should be based on a combination of date, amount, and similarity in description. A perfect match is not always possible, so use your judgment to find the most likely pairs.

For each transaction, you must provide a unique ID. You can generate one if it's not present.

After comparing, you must return a structured JSON object with three lists:
1.  'matched': A list of pairs of transactions that you have successfully matched.
2.  'unmatchedSource1': A list of all transactions from {{source1Name}} that have no match in {{source2Name}}.
3.  'unmatchedSource2': A list of all transactions from {{source2Name}} that have no match in {{source1Name}}.

Finally, provide a brief 'summary' of the reconciliation, noting the total number of matched items and any significant discrepancies.

Data for {{source1Name}}:
'''
{{{source1Data}}}
'''

Data for {{source2Name}}:
'''
{{{source2Data}}}
'''
`,
});

const reconciliationFlow = ai.defineFlow(
  {
    name: 'reconciliationFlow',
    inputSchema: ReconciliationInputSchema,
    outputSchema: ReconciliationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

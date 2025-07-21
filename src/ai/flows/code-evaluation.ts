'use server';

/**
 * @fileOverview This file defines a Genkit flow for evaluating code based on security, readability, and efficiency.
 *
 * - codeEvaluation - A function that accepts code and returns an evaluation based on the prompt.
 * - CodeEvaluationInput - The input type for the codeEvaluation function.
 * - CodeEvaluationOutput - The return type for the codeEvaluation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CodeEvaluationInputSchema = z.object({
  code: z.string().describe('The code snippet to evaluate.'),
});
export type CodeEvaluationInput = z.infer<typeof CodeEvaluationInputSchema>;

const CodeEvaluationOutputSchema = z.object({
  security: z.string().describe('Feedback on the security aspects of the code.'),
  readability: z.string().describe('Feedback on the readability of the code.'),
  efficiency: z.string().describe('Feedback on the efficiency of the code.'),
  overallScore: z.number().describe('The overall score of the code, as a percentage from 0 to 100.'),
});
export type CodeEvaluationOutput = z.infer<typeof CodeEvaluationOutputSchema>;

export async function codeEvaluation(input: CodeEvaluationInput): Promise<CodeEvaluationOutput> {
  return codeEvaluationFlow(input);
}

const codeEvaluationPrompt = ai.definePrompt({
  name: 'codeEvaluationPrompt',
  input: {schema: CodeEvaluationInputSchema},
  output: {schema: CodeEvaluationOutputSchema},
  prompt: `You are an AI code evaluation tool. You will be given a code snippet, and you will evaluate it based on its security, readability, and efficiency. Provide feedback for each of these categories.

Code:
{{{code}}}

Output a JSON object with keys for security, readability, efficiency, and overallScore.  The first three keys should be strings, and overallScore should be a number between 0 and 100.
`,
});

const codeEvaluationFlow = ai.defineFlow(
  {
    name: 'codeEvaluationFlow',
    inputSchema: CodeEvaluationInputSchema,
    outputSchema: CodeEvaluationOutputSchema,
  },
  async input => {
    const {output} = await codeEvaluationPrompt(input);
    return output!;
  }
);

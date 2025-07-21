'use server';

/**
 * @fileOverview AI prompt tuning flow for admins to refine feedback.
 *
 * - adjustAiPrompt - Allows admins to adjust AI prompts for code evaluation and lab analysis.
 * - AdjustAiPromptInput - The input type for the adjustAiPrompt function.
 * - AdjustAiPromptOutput - The return type for the adjustAiPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdjustAiPromptInputSchema = z.object({
  promptType: z.enum(['codeEvaluation', 'labAnalysis']).describe('The type of prompt to adjust.'),
  newPrompt: z.string().describe('The new prompt text to use.'),
});
export type AdjustAiPromptInput = z.infer<typeof AdjustAiPromptInputSchema>;

const AdjustAiPromptOutputSchema = z.object({
  success: z.boolean().describe('Whether the prompt was successfully updated.'),
  message: z.string().describe('A message indicating the result of the update.'),
});
export type AdjustAiPromptOutput = z.infer<typeof AdjustAiPromptOutputSchema>;

export async function adjustAiPrompt(input: AdjustAiPromptInput): Promise<AdjustAiPromptOutput> {
  return adjustAiPromptFlow(input);
}

const adjustAiPromptFlow = ai.defineFlow(
  {
    name: 'adjustAiPromptFlow',
    inputSchema: AdjustAiPromptInputSchema,
    outputSchema: AdjustAiPromptOutputSchema,
  },
  async input => {
    // In a real application, this would update a database or configuration file.
    // For this example, we'll just log the new prompt and return a success message.
    console.log(`Admin updating ${input.promptType} prompt to: ${input.newPrompt}`);

    // Simulate a successful update.
    return {
      success: true,
      message: `Successfully updated ${input.promptType} prompt.`, // Removed extraneous characters
    };
  }
);

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
  promptType: z.enum(['codeEvaluation', 'labAnalysis']).describe('조정할 프롬프트 유형입니다.'),
  newPrompt: z.string().describe('사용할 새 프롬프트 텍스트입니다.'),
});
export type AdjustAiPromptInput = z.infer<typeof AdjustAiPromptInputSchema>;

const AdjustAiPromptOutputSchema = z.object({
  success: z.boolean().describe('프롬프트가 성공적으로 업데이트되었는지 여부입니다.'),
  message: z.string().describe('업데이트 결과를 나타내는 메시지입니다.'),
});
export type AdjustAiPromptOutput = z.infer<typeof AdjustAiPromptOutputSchema>;

export async function adjustAiPrompt(input: AdjustAiPromptInput): Promise<AdjustAiPromptOutput> {
  return adjustAiPromptFlow(input);
}

const adjustAiPromptFlow = ai.defineFlow(
  {
    name: 'adjustAiPromptFlow',
    inputSchema: AdjustAiPromptInputSchema,
    outputSchema: AdjustAiAIPromptOutputSchema,
  },
  async input => {
    // 실제 애플리케이션에서는 데이터베이스나 구성 파일을 업데이트합니다.
    // 이 예제에서는 새 프롬프트를 기록하고 성공 메시지를 반환합니다.
    console.log(`관리자가 ${input.promptType} 프롬프트를 다음으로 업데이트합니다: ${input.newPrompt}`);

    // 성공적인 업데이트를 시뮬레이션합니다.
    return {
      success: true,
      message: `${input.promptType} 프롬프트를 성공적으로 업데이트했습니다.`,
    };
  }
);

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
  code: z.string().describe('평가할 코드 스니펫입니다.'),
});
export type CodeEvaluationInput = z.infer<typeof CodeEvaluationInputSchema>;

const CodeEvaluationOutputSchema = z.object({
  security: z.string().describe('코드의 보안 측면에 대한 피드백입니다.'),
  readability: z.string().describe('코드의 가독성에 대한 피드백입니다.'),
  efficiency: z.string().describe('코드의 효율성에 대한 피드백입니다.'),
  overallScore: z.number().describe('코드의 종합 점수, 0에서 100까지의 백분율입니다.'),
});
export type CodeEvaluationOutput = z.infer<typeof CodeEvaluationOutputSchema>;

export async function codeEvaluation(input: CodeEvaluationInput): Promise<CodeEvaluationOutput> {
  return codeEvaluationFlow(input);
}

const codeEvaluationPrompt = ai.definePrompt({
  name: 'codeEvaluationPrompt',
  input: {schema: CodeEvaluationInputSchema},
  output: {schema: CodeEvaluationOutputSchema},
  prompt: `당신은 AI 코드 평가 도구입니다. 코드 스니펫이 주어지면 보안, 가독성, 효율성을 기준으로 평가합니다. 각 카테고리에 대한 피드백을 제공하세요.

코드:
{{{code}}}

보안, 가독성, 효율성, overallScore를 키로 갖는 JSON 객체를 출력하세요. 처음 세 키는 문자열이어야 하고, overallScore는 0에서 100 사이의 숫자여야 합니다.
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

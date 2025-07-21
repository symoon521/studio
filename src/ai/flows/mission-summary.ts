'use server';

/**
 * @fileOverview Summarizes mission objectives, required skills, and success criteria.
 *
 * - summarizeMission - A function that summarizes mission details.
 * - MissionSummaryInput - The input type for the summarizeMission function.
 * - MissionSummaryOutput - The return type for the summarizeMission function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MissionSummaryInputSchema = z.object({
  title: z.string().describe('미션의 제목입니다.'),
  description: z.string().describe('미션의 전체 설명입니다.'),
  objectives: z.string().describe('미션의 목표입니다.'),
  requiredSkills: z.string().describe('미션을 완료하는 데 필요한 기술(쉼표로 구분)입니다.'),
  successCriteria: z.string().describe('미션을 성공적으로 완료하기 위한 기준입니다.'),
});
export type MissionSummaryInput = z.infer<typeof MissionSummaryInputSchema>;

const MissionSummaryOutputSchema = z.object({
  summary: z.string().describe('미션 세부 정보의 간결한 요약입니다.'),
});
export type MissionSummaryOutput = z.infer<typeof MissionSummaryOutputSchema>;

export async function summarizeMission(input: MissionSummaryInput): Promise<MissionSummaryOutput> {
  return missionSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'missionSummaryPrompt',
  input: {schema: MissionSummaryInputSchema},
  output: {schema: MissionSummaryOutputSchema},
  prompt: `당신은 다른 엔지니어들을 위해 미션을 요약하는 데 능숙한 전문 데브옵스 엔지니어입니다.

  개발자가 미션을 빠르게 이해하고 자신의 학습 목표와 일치하는지 결정할 수 있도록 목표, 필요 기술, 성공 기준에 초점을 맞춰 다음 미션 세부 정보를 요약하세요. 요약은 세 문장을 넘지 않아야 합니다.

  미션 제목: {{{title}}}
  설명: {{{description}}}
  목표: {{{objectives}}}
  필요 기술: {{{requiredSkills}}}
  성공 기준: {{{successCriteria}}}`,
});

const missionSummaryFlow = ai.defineFlow(
  {
    name: 'missionSummaryFlow',
    inputSchema: MissionSummaryInputSchema,
    outputSchema: MissionSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

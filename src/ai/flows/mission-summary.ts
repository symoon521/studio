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
  title: z.string().describe('The title of the mission.'),
  description: z.string().describe('The full description of the mission.'),
  objectives: z.string().describe('The objectives of the mission.'),
  requiredSkills: z.string().describe('The skills required to complete the mission, comma separated.'),
  successCriteria: z.string().describe('The criteria for successfully completing the mission.'),
});
export type MissionSummaryInput = z.infer<typeof MissionSummaryInputSchema>;

const MissionSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the mission details.'),
});
export type MissionSummaryOutput = z.infer<typeof MissionSummaryOutputSchema>;

export async function summarizeMission(input: MissionSummaryInput): Promise<MissionSummaryOutput> {
  return missionSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'missionSummaryPrompt',
  input: {schema: MissionSummaryInputSchema},
  output: {schema: MissionSummaryOutputSchema},
  prompt: `You are an expert DevOps engineer who is good at summarizing missions for other engineers. 

  Summarize the following mission details, focusing on the objectives, required skills, and success criteria, so a developer can quickly understand the mission and decide if it aligns with their learning goals. The summary should be no more than three sentences.

  Mission Title: {{{title}}}
  Description: {{{description}}}
  Objectives: {{{objectives}}}
  Required Skills: {{{requiredSkills}}}
  Success Criteria: {{{successCriteria}}}`,
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

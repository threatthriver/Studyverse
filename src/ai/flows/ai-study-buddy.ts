'use server';

/**
 * @fileOverview An AI Study Buddy agent.
 *
 * - getStudyBuddyAssistance - A function that gets assistance from the AI Study Buddy.
 * - GetStudyBuddyAssistanceInput - The input type for the getStudyBuddyAssistance function.
 * - GetStudyBuddyAssistanceOutput - The return type for the getStudyBuddyAssistance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetStudyBuddyAssistanceInputSchema = z.object({
  question: z.string().describe('The question to ask the AI Study Buddy.'),
  studyMaterial: z.string().describe('The study material to use as context.'),
});
export type GetStudyBuddyAssistanceInput = z.infer<typeof GetStudyBuddyAssistanceInputSchema>;

const GetStudyBuddyAssistanceOutputSchema = z.object({
  answer: z.string().describe('The answer from the AI Study Buddy.'),
});
export type GetStudyBuddyAssistanceOutput = z.infer<typeof GetStudyBuddyAssistanceOutputSchema>;

export async function getStudyBuddyAssistance(input: GetStudyBuddyAssistanceInput): Promise<GetStudyBuddyAssistanceOutput> {
  return getStudyBuddyAssistanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getStudyBuddyAssistancePrompt',
  input: {schema: GetStudyBuddyAssistanceInputSchema},
  output: {schema: GetStudyBuddyAssistanceOutputSchema},
  prompt: `You are an AI Study Buddy. You are here to help students learn.

  You will answer questions about the material provided.

  Study Material: {{{studyMaterial}}}

  Question: {{{question}}}

  Answer: `,
});

const getStudyBuddyAssistanceFlow = ai.defineFlow(
  {
    name: 'getStudyBuddyAssistanceFlow',
    inputSchema: GetStudyBuddyAssistanceInputSchema,
    outputSchema: GetStudyBuddyAssistanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

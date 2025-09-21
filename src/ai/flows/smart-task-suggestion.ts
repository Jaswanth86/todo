'use server';

/**
 * @fileOverview A smart task suggestion AI agent.
 *
 * - smartTaskSuggestion - A function that suggests task categories or priorities based on the task description.
 * - SmartTaskSuggestionInput - The input type for the smartTaskSuggestion function.
 * - SmartTaskSuggestionOutput - The return type for the smartTaskSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartTaskSuggestionInputSchema = z.object({
  description: z
    .string()
    .describe('The description of the task for which suggestions are needed.'),
});
export type SmartTaskSuggestionInput = z.infer<typeof SmartTaskSuggestionInputSchema>;

const SmartTaskSuggestionOutputSchema = z.object({
  categorySuggestion: z
    .string()
    .describe('A suggested category for the task based on the description.'),
  prioritySuggestion: z
    .string()
    .describe('A suggested priority for the task based on the description.'),
});
export type SmartTaskSuggestionOutput = z.infer<typeof SmartTaskSuggestionOutputSchema>;

export async function smartTaskSuggestion(input: SmartTaskSuggestionInput): Promise<SmartTaskSuggestionOutput> {
  return smartTaskSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartTaskSuggestionPrompt',
  input: {schema: SmartTaskSuggestionInputSchema},
  output: {schema: SmartTaskSuggestionOutputSchema},
  prompt: `You are a task management assistant that suggests task categories and priorities based on the given task description.

  Description: {{{description}}}

  Consider the description provided and suggest a relevant category and priority for the task.
  If the description does not provide enough information to confidently suggest a category or priority, leave the suggestion blank.
  Give the suggestions in JSON format.`,
});

const smartTaskSuggestionFlow = ai.defineFlow(
  {
    name: 'smartTaskSuggestionFlow',
    inputSchema: SmartTaskSuggestionInputSchema,
    outputSchema: SmartTaskSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

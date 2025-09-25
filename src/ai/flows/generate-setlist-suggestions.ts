// src/ai/flows/generate-setlist-suggestions.ts
'use server';

/**
 * @fileOverview AI-powered setlist suggestion generator for event organizers.
 *
 * - generateSetlistSuggestions - A function that generates setlist suggestions based on event details.
 * - GenerateSetlistSuggestionsInput - The input type for the generateSetlistSuggestions function.
 * - GenerateSetlistSuggestionsOutput - The return type for the generateSetlistSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSetlistSuggestionsInputSchema = z.object({
  eventStyle: z
    .string()
    .describe('The style of the event, e.g., concert, festival, private party.'),
  eventDuration: z
    .string()
    .describe('The duration of the event in minutes or hours, e.g., 90 minutes, 2 hours.'),
  eventFlow: z
    .string()
    .describe(
      'Description of the event flow or desired mood, e.g., high-energy opening, emotional mid-section, grand finale.'
    ),
  albumTracks: z
    .string()
    .describe('A list of song choices from albums'),
  concertClassics: z
    .string()
    .describe('A list of concert classic choices'),
});

export type GenerateSetlistSuggestionsInput = z.infer<
  typeof GenerateSetlistSuggestionsInputSchema
>;

const GenerateSetlistSuggestionsOutputSchema = z.object({
  setlist: z
    .string()
    .describe('A suggested setlist, including song titles and order.'),
  rationale: z
    .string()
    .describe('Explanation of why the songs in the setlist were chosen.'),
});

export type GenerateSetlistSuggestionsOutput = z.infer<
  typeof GenerateSetlistSuggestionsOutputSchema
>;

export async function generateSetlistSuggestions(
  input: GenerateSetlistSuggestionsInput
): Promise<GenerateSetlistSuggestionsOutput> {
  return generateSetlistSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSetlistSuggestionsPrompt',
  input: {schema: GenerateSetlistSuggestionsInputSchema},
  output: {schema: GenerateSetlistSuggestionsOutputSchema},
  prompt: `You are an AI assistant that suggests setlists for music events.

  Consider the following details about the event:
  - Style: {{{eventStyle}}}
  - Duration: {{{eventDuration}}}
  - Flow: {{{eventFlow}}}
  - Potential album tracks: {{{albumTracks}}}
  - Potential concert classics: {{{concertClassics}}}

  Based on these details, suggest a setlist with song titles and the order they should be played in.
  Also, explain why you chose these songs for the setlist.
  Format the output as follows:
  Setlist: [Song 1, Song 2, Song 3, ...]
  Rationale: [Explanation of song choices and order]`,
});

const generateSetlistSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateSetlistSuggestionsFlow',
    inputSchema: GenerateSetlistSuggestionsInputSchema,
    outputSchema: GenerateSetlistSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

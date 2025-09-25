'use server';

import {
  generateSetlistSuggestions,
  type GenerateSetlistSuggestionsInput,
  type GenerateSetlistSuggestionsOutput,
} from '@/ai/flows/generate-setlist-suggestions';

export async function generateSetlistSuggestionsAction(
  input: GenerateSetlistSuggestionsInput
): Promise<GenerateSetlistSuggestionsOutput> {
  try {
    const result = await generateSetlistSuggestions(input);
    return result;
  } catch (error) {
    console.error('Error in generateSetlistSuggestionsAction:', error);
    throw new Error('Échec de la génération des suggestions de setlist.');
  }
}

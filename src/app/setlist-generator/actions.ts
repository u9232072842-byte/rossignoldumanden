'use server';

import {
  generateSetlistSuggestions,
  type GenerateSetlistSuggestionsOutput,
  type GenerateSetlistSuggestionsInput,
} from '@/ai/flows/generate-setlist-suggestions';

export interface GenerateSetlistSuggestionsActionState {
  data: GenerateSetlistSuggestionsOutput | null;
  error: string | null;
  timestamp: number;
}

export async function generateSetlistSuggestionsAction(
  _prevState: GenerateSetlistSuggestionsActionState,
  formData: FormData
): Promise<GenerateSetlistSuggestionsActionState> {
  try {
    const input: GenerateSetlistSuggestionsInput = {
      eventType: formData.get('eventType') as string,
      durationInMinutes: Number(formData.get('durationInMinutes')),
      audienceMood: formData.get('audienceMood') as string,
    };
    const setlist = await generateSetlistSuggestions(input);
    return { data: setlist, error: null, timestamp: Date.now() };
  } catch (error) {
    console.error('Erreur dans generateSetlistSuggestionsAction:', error);
    const errorMessage = error instanceof Error ? error.message : "Une erreur inconnue est survenue.";
    return { data: null, error: `Échec de la génération des suggestions de setlist. Erreur: ${errorMessage}`, timestamp: Date.now() };
  }
}

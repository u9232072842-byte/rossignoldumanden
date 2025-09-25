'use server';
/**
 * @fileOverview Un agent IA pour générer des suggestions de setlists pour Djessou Mama Diabate.
 *
 * - generateSetlistSuggestions - Une fonction qui gère le processus de génération de setlist.
 * - GenerateSetlistSuggestionsInput - Le type d'entrée pour la fonction generateSetlistSuggestions.
 * - GenerateSetlistSuggestionsOutput - Le type de retour pour la fonction generateSetlistSuggestions.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateSetlistSuggestionsInputSchema = z.object({
  eventType: z.string().describe("Le type d'événement (ex: Festival, Concert Intime, Cérémonie)."),
  durationInMinutes: z.number().describe("La durée souhaitée du concert en minutes."),
  audienceMood: z.string().describe("L'ambiance souhaitée pour le public (ex: Festif, Émotionnel, Spirituel)."),
});
export type GenerateSetlistSuggestionsInput = z.infer<typeof GenerateSetlistSuggestionsInputSchema>;

const SongSchema = z.object({
  title: z.string().describe("Le titre de la chanson."),
  reason: z.string().describe("La raison pour laquelle cette chanson a été choisie pour la setlist."),
});

const GenerateSetlistSuggestionsOutputSchema = z.object({
  setlist: z.array(SongSchema).describe("La liste des chansons suggérées."),
  introduction: z.string().describe("Un court texte d'introduction pour la setlist."),
  encore: z.array(SongSchema).describe("Les chansons suggérées pour le rappel."),
});
export type GenerateSetlistSuggestionsOutput = z.infer<typeof GenerateSetlistSuggestionsOutputSchema>;

export async function generateSetlistSuggestions(input: GenerateSetlistSuggestionsInput): Promise<GenerateSetlistSuggestionsOutput> {
  return generateSetlistFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSetlistPrompt',
  input: { schema: GenerateSetlistSuggestionsInputSchema },
  output: { schema: GenerateSetlistSuggestionsOutputSchema },
  prompt: `
    Vous êtes un directeur musical expert pour l'artiste malienne de renommée mondiale, Djessou Mama Diabate, "Le Rossignol du Manding".
    Votre tâche est de créer une setlist parfaite pour un concert à venir en fonction des critères suivants :

    Type d'événement : {{{eventType}}}
    Durée du concert : {{{durationInMinutes}}} minutes
    Ambiance souhaitée : {{{audienceMood}}}

    Djessou Mama Diabate est connue pour sa voix puissante, son mélange de tradition mandingue et de sons modernes. Ses chansons célèbres incluent des titres comme "Denko", "Fakoly", "M'baudy", "Bani", et "Wassolon". Vous pouvez utiliser ces chansons et d'autres de son répertoire supposé.

    Veuillez générer une setlist qui correspond aux critères. Pour chaque chanson, fournissez une brève raison de son inclusion.
    Incluez également un court texte d'introduction et des suggestions pour un rappel (encore).
    Structurez votre réponse exactement selon le schéma de sortie JSON fourni.
  `,
});

const generateSetlistFlow = ai.defineFlow(
  {
    name: 'generateSetlistFlow',
    inputSchema: GenerateSetlistSuggestionsInputSchema,
    outputSchema: GenerateSetlistSuggestionsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error("La génération de la setlist a échoué.");
    }
    return output;
  }
);

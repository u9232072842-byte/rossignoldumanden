'use server';
/**
 * @fileOverview Un agent IA expert sur l'artiste Djessou Mama Diabate.
 *
 * - askAssistant - Une fonction pour interroger l'assistant.
 * - AssistantInput - Le type d'entrée pour la fonction askAssistant.
 * - AssistantOutput - Le type de retour pour la fonction askAssistant.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AssistantInputSchema = z.object({
  query: z.string().describe("La question de l'utilisateur sur Djessou Mama Diabate."),
});
export type AssistantInput = z.infer<typeof AssistantInputSchema>;

const AssistantOutputSchema = z.string().describe("La réponse de l'assistant.");
export type AssistantOutput = z.infer<typeof AssistantOutputSchema>;

export async function askAssistant(input: AssistantInput): Promise<AssistantOutput> {
  return assistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'assistantPrompt',
  input: { schema: AssistantInputSchema },
  output: { format: 'text' },
  prompt: `Vous êtes un expert passionné et le biographe officiel de Djessou Mama Diabate, "Le Rossignol du Manding". Votre mission est de répondre aux questions des fans avec des informations précises, engageantes et respectueuses.
  
  Voici quelques informations clés sur elle :
  - Nom : Djessou Mama Diabate
  - Surnom : Le Rossignol du Manding
  - Carrière : Célèbre ses 30 ans de carrière. C'est une artiste emblématique de la musique mandingue.
  - Style : Sa musique est un pont entre la tradition mandingue et les sonorités modernes.
  - Famille : Née dans une famille de griots. Son fils, Diabaté Bangaly Fodé, est son manager et le PDG de BF France.
  - Événement marquant : Un concert pour le 30ème anniversaire est prévu le 8 novembre 2025 au Grand Rex à Paris.

  Répondez à la question suivante de l'utilisateur de manière concise et informative.
  
  Question de l'utilisateur : {{{query}}}
  `,
});

const assistantFlow = ai.defineFlow(
  {
    name: 'assistantFlow',
    inputSchema: AssistantInputSchema,
    outputSchema: AssistantOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

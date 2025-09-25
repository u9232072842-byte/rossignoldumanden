'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Music, Sparkles } from 'lucide-react';
import { generateSetlistSuggestionsAction } from './actions';
import type { GenerateSetlistSuggestionsOutput } from '@/ai/flows/generate-setlist-suggestions';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  eventStyle: z.string().min(3, "Le style de l'événement est requis."),
  eventDuration: z.string().min(1, "La durée de l'événement est requise."),
  eventFlow: z.string().min(10, "La description du déroulement de l'événement est requise."),
  albumTracks: z.string().min(10, 'Veuillez fournir quelques titres d’albums.'),
  concertClassics: z.string().min(10, 'Veuillez fournir quelques classiques de concert.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function SetlistGeneratorPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerateSetlistSuggestionsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventStyle: '',
      eventDuration: '',
      eventFlow: '',
      albumTracks: '',
      concertClassics: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await generateSetlistSuggestionsAction(values);
      setResult(response);
    } catch (error) {
      console.error('Erreur lors de la génération de la setlist:', error);
      toast({
        title: 'Erreur',
        description: 'Échec de la génération des suggestions de setlist. Veuillez réessayer.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-12 md:py-24 max-w-4xl mx-auto">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <Sparkles className="h-12 w-12 text-primary" />
        <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-6xl">
          Générateur de Setlist IA
        </h1>
        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
          Créez la performance parfaite. Décrivez votre événement, fournissez des choix de chansons, et laissez notre IA créer une setlist sur mesure pour vous.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Détails de l'événement</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="eventStyle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Style de l'événement</FormLabel>
                      <FormControl>
                        <Input placeholder="ex: Concert acoustique, Festival, Fête privée" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="eventDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Durée de l'événement</FormLabel>
                      <FormControl>
                        <Input placeholder="ex: 90 minutes, 2 heures" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="eventFlow"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Déroulement / Ambiance souhaitée</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="ex: Ouverture énergique, section médiane émouvante, grand final..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="albumTracks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titres d'albums (séparés par des virgules)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Chanson A, Chanson B, Chanson C..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="concertClassics"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Classiques de concert (séparés par des virgules)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Classique X, Classique Y, Classique Z..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Génération en cours...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Générer la Setlist
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {result && (
        <div className="mt-12">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                        <Music className="w-6 h-6 text-primary"/>
                        Votre Setlist Suggérée
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="font-bold text-lg mb-2">Setlist</h3>
                        <p className="text-muted-foreground whitespace-pre-wrap">{result.setlist}</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-2">Justification</h3>
                        <p className="text-muted-foreground whitespace-pre-wrap">{result.rationale}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      )}
    </div>
  );
}

'use client';

import { useFormState, useFormStatus } from 'react-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useState, useEffect } from 'react';
import {
  generateSetlistSuggestionsAction,
  type GenerateSetlistSuggestionsActionState,
} from './actions';
import { ListMusic, Loader2, Wand2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const initialState: GenerateSetlistSuggestionsActionState = {
  data: null,
  error: null,
  timestamp: Date.now(),
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Génération en cours...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-5 w-5" />
          Générer la Setlist
        </>
      )}
    </Button>
  );
}

export default function SetlistGeneratorPage() {
  const [state, formAction] = useFormState(
    generateSetlistSuggestionsAction,
    initialState
  );
  const [duration, setDuration] = useState(60);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Erreur de Génération',
        description: state.error,
      });
    }
  }, [state.error, state.timestamp, toast]);


  return (
    <div className="container py-12 md:py-24">
      <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
        <div>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-3xl">Générateur de Setlist IA</CardTitle>
              <CardDescription>
                Créez la setlist parfaite pour n'importe quelle occasion en utilisant la puissance de l'IA.
              </CardDescription>
            </CardHeader>
            <form action={formAction}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="eventType">Type d'événement</Label>
                  <Select name="eventType" defaultValue="Concert Intime">
                    <SelectTrigger id="eventType">
                      <SelectValue placeholder="Sélectionnez un type d'événement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Festival">Festival en plein air</SelectItem>
                      <SelectItem value="Concert Intime">Concert Intime</SelectItem>
                      <SelectItem value="Cérémonie Officielle">Cérémonie Officielle</SelectItem>
                      <SelectItem value="Mariage">Célébration (Mariage)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="audienceMood">Ambiance souhaitée</Label>
                   <Select name="audienceMood" defaultValue="Festif">
                    <SelectTrigger id="audienceMood">
                      <SelectValue placeholder="Sélectionnez une ambiance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Festif">Festif et Dansant</SelectItem>
                      <SelectItem value="Émotionnel">Émotionnel et Profond</SelectItem>
                      <SelectItem value="Spirituel">Spirituel et Inspirant</SelectItem>
                       <SelectItem value="Énergique">Énergique et Puissant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="durationInMinutes">Durée du concert</Label>
                        <span className="text-sm font-medium text-primary">{duration} minutes</span>
                    </div>
                    <Input id="durationInMinutes" name="durationInMinutes" type="hidden" value={duration} />
                    <Slider
                        defaultValue={[60]}
                        max={180}
                        min={20}
                        step={5}
                        onValueChange={(value) => setDuration(value[0])}
                    />
                </div>

              </CardContent>
              <CardFooter>
                <SubmitButton />
              </CardFooter>
            </form>
          </Card>
        </div>
        <div className="space-y-6">
            <h2 className="font-headline text-3xl font-bold">Votre Setlist Suggérée</h2>
            {state.data ? (
                <Card className="bg-secondary/50">
                    <CardContent className="p-6 space-y-6">
                        <div>
                            <h3 className="font-headline text-xl mb-2">Introduction</h3>
                            <p className="text-muted-foreground">{state.data.introduction}</p>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="font-headline text-xl mb-4">Setlist Principale</h3>
                            <ul className="space-y-4">
                                {state.data.setlist.map((song, index) => (
                                    <li key={index} className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">{index + 1}</div>
                                        <div>
                                            <p className="font-bold">{song.title}</p>
                                            <p className="text-sm text-muted-foreground">{song.reason}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                         {state.data.encore && state.data.encore.length > 0 && (
                            <>
                                <Separator />
                                <div>
                                    <h3 className="font-headline text-xl mb-4">Rappel</h3>
                                    <ul className="space-y-4">
                                        {state.data.encore.map((song, index) => (
                                            <li key={`encore-${index}`} className="flex items-start gap-4">
                                                 <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold">R</div>
                                                <div>
                                                    <p className="font-bold">{song.title}</p>
                                                    <p className="text-sm text-muted-foreground">{song.reason}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                         )}

                    </CardContent>
                </Card>
            ) : (
                <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg h-full">
                    <ListMusic className="w-16 h-16 text-muted-foreground mb-4" />
                    <h3 className="font-headline text-xl font-semibold">En attente de vos instructions</h3>
                    <p className="text-muted-foreground mt-2">
                        Remplissez le formulaire pour que l'IA puisse composer une setlist sur mesure pour vous.
                    </p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}

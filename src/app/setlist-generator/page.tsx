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
  eventStyle: z.string().min(3, 'Event style is required.'),
  eventDuration: z.string().min(1, 'Event duration is required.'),
  eventFlow: z.string().min(10, 'Event flow description is required.'),
  albumTracks: z.string().min(10, 'Please provide some album tracks.'),
  concertClassics: z.string().min(10, 'Please provide some concert classics.'),
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
      console.error('Error generating setlist:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate setlist suggestions. Please try again.',
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
          AI Setlist Generator
        </h1>
        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
          Craft the perfect performance. Describe your event, provide song choices, and let our AI create a tailored setlist for you.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Event Details</CardTitle>
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
                      <FormLabel>Event Style</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Acoustic Concert, Festival, Private Party" {...field} />
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
                      <FormLabel>Event Duration</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 90 minutes, 2 hours" {...field} />
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
                    <FormLabel>Desired Event Flow / Mood</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., High-energy opening, emotional mid-section, grand finale..."
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
                    <FormLabel>Album Tracks (comma separated)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Song A, Song B, Song C..." {...field} />
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
                    <FormLabel>Concert Classics (comma separated)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Classic X, Classic Y, Classic Z..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Setlist
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
                        Your Suggested Setlist
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="font-bold text-lg mb-2">Setlist</h3>
                        <p className="text-muted-foreground whitespace-pre-wrap">{result.setlist}</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-2">Rationale</h3>
                        <p className="text-muted-foreground whitespace-pre-wrap">{result.rationale}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      )}
    </div>
  );
}

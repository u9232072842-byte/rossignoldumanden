import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-artist');
  const eventImage = PlaceHolderImages.find(p => p.id === 'event-paris');

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="relative w-full h-[60vh] md:h-[80vh]">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover object-top"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="relative container h-full flex flex-col items-start justify-end pb-12 md:pb-24 text-left">
            <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
              Le Rossignol du Manding
            </h1>
            <p className="mt-4 max-w-2xl text-lg md:text-xl text-foreground/80">
              Célébrant 30 ans de la voix d'or de Djessou Manding. Vivez l'héritage, la musique, l'âme.
            </p>
            <div className="mt-6">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="#events">Voir les événements à venir</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="events" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">Événements à venir</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Rejoignez-nous pour des nuits inoubliables de musique et de célébration.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-1 md:gap-12 lg:max-w-none lg:grid-cols-1 mt-12">
              <Card className="w-full max-w-4xl mx-auto overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="md:flex">
                  <div className="md:w-1/2 relative h-64 md:h-auto">
                    {eventImage && (
                       <Image
                        src={eventImage.imageUrl}
                        alt={eventImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={eventImage.imageHint}
                      />
                    )}
                  </div>
                  <div className="md:w-1/2 flex flex-col">
                    <CardHeader>
                      <Badge variant="default" className="w-fit bg-accent text-accent-foreground mb-2">Événement en vedette</Badge>
                      <CardTitle className="font-headline text-3xl">Célébration du 30ème anniversaire</CardTitle>
                      <CardDescription className="text-lg">Une soirée exclusive pour célébrer l'héritage de Djessou Manding.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-grow">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium">8 novembre 2025</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium">Paris, France</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                       <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Link href="/events/30th-anniversary-paris">
                          Acheter des billets <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

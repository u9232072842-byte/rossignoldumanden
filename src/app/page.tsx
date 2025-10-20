
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Calendar, MapPin, Music, Video } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import * as React from 'react';

export default function Home() {
  const heroImages = PlaceHolderImages.filter(p => p.id.startsWith('hero-'));
  const eventImage = PlaceHolderImages.find(p => p.id === 'event-paris-flyer');
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-portrait');
  const managerImage = PlaceHolderImages.find(p => p.id === 'manager-portrait');

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  )

  const videos = [
    { id: 'dyClhH06wBU', title: "N'na (Clip Officiel)" },
    { id: '3JZ_D3ELwOQ', title: 'En coulisses de la tournée' },
    { id: 'HsrSBg3VxzM', title: 'CONCERT ZENITH' },
    { id: 'wCJLo1FpogQ', title: 'Performance Live Acoustique' },
    { id: 'kJQP7kiw5Fk', title: 'Interview exclusive' },
    { id: '1HZKW4-s9GU', title: "L'ENFANT BENI (Clip Officiel)" },
    { id: 'KSUKFT5btCw', title: 'A Fidé (Clip Officiel)' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="relative w-full h-[90vh] md:h-[90vh]">
          <Carousel
            className="w-full h-full"
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {heroImages.map((image) => (
                <CarouselItem key={image.id}>
                  <div className="relative h-[90vh] md:h-[90vh]">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      fill
                      className="object-contain object-center"
                      priority={image.id === 'hero-artist'}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
           <div className="absolute inset-0 flex flex-col items-center justify-end text-center p-4 pb-20 md:pb-24">
             <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
              Djessou Mama Diabate
            </h1>
            <p className="mt-2 text-lg md:text-xl text-white font-medium" style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.6)' }}>Le Rossignol du Manding</p>
            <p className="mt-4 max-w-2xl text-md md:text-lg text-white" style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.6)' }}>
              Célébrant 30 ans de la voix d'or. Vivez l'héritage, la musique, l'âme.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="text-lg">
                <Link href="#events">Voir l'événement à venir</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-16 md:py-24 bg-card/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <Card className="shadow-2xl text-center lg:text-left p-4 bg-card/80 border-accent/20">
                <CardHeader>
                  <CardTitle className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl">
                    La Voix d'une Génération
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground md:text-xl/relaxed">
                    Depuis trois décennies, Djessou Mama Diabate, surnommée affectueusement "Le Rossignol du Manding", captive les publics du monde entier avec sa voix soul et ses mélodies envoûtantes. Sa musique est un pont entre la tradition mandingue et les sonorités modernes, créant une expérience sonore unique et intemporelle.
                  </p>
                  <p className="text-muted-foreground md:text-xl/relaxed">
                    Née au cœur d'une famille de griots, la musique a toujours été sa vocation. Cet anniversaire de 30 ans de carrière n'est pas seulement une célébration de sa musique, mais aussi un hommage à un héritage culturel riche qu'elle continue de partager avec passion et générosité.
                  </p>
                </CardContent>
              </Card>
              <div className="flex items-center justify-center">
                <div className="relative p-2 rounded-xl bg-card shadow-2xl transition-transform duration-500 hover:scale-105 hover:rotate-[-3deg] glowing-border">
                  {aboutImage && (
                    <Image
                      src={aboutImage.imageUrl}
                      alt={aboutImage.description}
                      width={400}
                      height={500}
                      className="rounded-lg object-cover aspect-[4/5]"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="events" className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="outline" className="text-primary border-primary/50">Événement unique</Badge>
                <h2 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl">Événements à venir</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Rejoignez-nous pour des nuits inoubliables de musique et de célébration.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-1 md:gap-12 lg:max-w-none lg:grid-cols-1 mt-12">
              <Card className="w-full max-w-5xl mx-auto overflow-hidden shadow-2xl hover:shadow-primary/20 transition-shadow duration-300 border-border/50">
                <div className="grid md:grid-cols-2">
                   <div className="flex items-center justify-center p-4">
                    {eventImage && (
                      <Image
                        src={eventImage.imageUrl}
                        alt={eventImage.description}
                        width={600}
                        height={800}
                        className="rounded-lg object-contain"
                      />
                    )}
                  </div>
                  <div className="flex flex-col p-6 md:p-8">
                    <CardHeader className="p-0">
                      <Badge variant="default" className="w-fit bg-primary mb-4 text-primary-foreground">Événement en vedette</Badge>
                      <CardTitle className="font-headline text-3xl">Célébration du 30ème anniversaire</CardTitle>
                      <CardDescription className="text-lg text-muted-foreground mt-2">Ce projet est le symbole d’une grande diversité musicale. Rejoignez Djessou Mama Diabate pour une nuit inoubliable.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-grow my-8 p-0">
                      <div className="flex items-center gap-4">
                        <Calendar className="w-6 h-6 text-primary" />
                        <span className="font-medium text-lg">8 novembre 2025 - 20h00</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <MapPin className="w-6 h-6 text-primary" />
                        <span className="font-medium text-lg">3 rue de la Pointe, 93230 Romainville</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-0">
                      <Button asChild size="lg" className="w-full text-lg">
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

        <section id="manager" className="w-full py-16 md:py-24 bg-card/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="flex items-center justify-center order-last lg:order-first">
                 <div className="relative p-2 rounded-xl bg-card shadow-2xl transition-transform duration-500 hover:scale-105 hover:rotate-[3deg] glowing-border">
                  {managerImage && (
                    <Image
                      src={managerImage.imageUrl}
                      alt={managerImage.description}
                      width={400}
                      height={500}
                      className="rounded-lg object-cover aspect-[4/5]"
                    />
                  )}
                </div>
              </div>
              <Card className="shadow-2xl text-center lg:text-left p-4 bg-card/80 border-accent/20">
                <CardHeader>
                  <CardTitle className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl">
                    Management
                  </CardTitle>
                  <CardDescription className="text-xl">Diabaté Bangaly Fodé</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground md:text-xl/relaxed">
                    Fils de la légendaire Djessou Mama Diabate, Diabaté Bangaly Fodé a hérité de la passion familiale pour la musique et la culture mandingue. En tant que PDG de BF France, il est le pilier derrière la stratégie de carrière et le développement international de l'artiste.
                  </p>
                  <p className="text-muted-foreground md:text-xl/relaxed">
                    Alliant une vision moderne du management à un profond respect de l'héritage culturel, il œuvre pour que la voix de sa mère continue de résonner à travers le monde, assurant la pérennité de son art pour les générations futures.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="media" className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                 <Badge variant="outline" className="text-primary border-primary/50">Contenu Exclusif</Badge>
                <h2 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl">Vidéos &amp; Clips</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Découvrez les derniers clips et performances live.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 grid-cols-1 sm:grid-cols-2 lg:gap-12 mt-12">
              {videos.slice(0, 4).map((video) => (
                <Card key={video.id} className="overflow-hidden shadow-lg hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 glowing-border">
                  <div className="aspect-video relative">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full"
                    ></iframe>
                  </div>
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">{video.title}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
    
    

    

    

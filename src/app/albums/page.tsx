
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';

export default function AlbumsPage() {
  const albums = [
    {
      id: 'album-nna',
      title: "N'na",
      year: 2005,
      image: PlaceHolderImages.find(p => p.id === 'album-nna'),
    },
    {
      id: 'album-kouroussaka',
      title: "Kouroussaka",
      year: 2010,
      image: PlaceHolderImages.find(p => p.id === 'album-kouroussaka'),
    },
    {
      id: 'album-foly',
      title: "Foly",
      year: 2018,
      image: PlaceHolderImages.find(p => p.id === 'album-foly'),
    },
     {
      id: 'album-heritage',
      title: "Héritage",
      year: 2023,
      image: PlaceHolderImages.find(p => p.id === 'album-heritage'),
    },
  ];

  return (
    <div className="container py-12 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-6xl">Discographie</h1>
        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
          Découvrez les albums qui ont marqué 30 ans de carrière du Rossignol du Manding.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {albums.map(album => (
          <Card key={album.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader className="p-0">
              <div className="aspect-square relative">
                {album.image && (
                  <Image
                    src={album.image.imageUrl}
                    alt={album.image.description}
                    fill
                    className="object-cover"
                    data-ai-hint={album.image.imageHint}
                  />
                )}
              </div>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <CardTitle className="font-headline text-xl">{album.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{album.year}</p>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button className="w-full" disabled>
                Bientôt disponible
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

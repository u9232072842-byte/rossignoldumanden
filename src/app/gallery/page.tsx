
'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog"
import { useState } from 'react';

type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};


export default function GalleryPage() {
  const galleryImages = PlaceHolderImages.filter(p => p.id.startsWith('gallery-'));
  const [selectedImage, setSelectedImage] = useState<ImagePlaceholder | null>(null);

  return (
    <div className="container py-12 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-6xl">Galerie</h1>
        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
          Plongez dans l'univers de Djessou Mama Diabate à travers une collection de moments capturés.
        </p>
      </div>

      <Dialog>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {galleryImages.map(image => (
            <DialogTrigger key={image.id} asChild onClick={() => setSelectedImage(image)}>
              <Card  className="overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
                  <div className="aspect-square relative">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      width={500}
                      height={500}
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                  </div>
              </Card>
            </DialogTrigger>
          ))}
        </div>
        {selectedImage && (
             <DialogContent className="max-w-3xl p-0 border-0">
                <DialogHeader>
                  <DialogTitle className="sr-only">{selectedImage.description}</DialogTitle>
                   <DialogDescription className="sr-only">
                    Image en plein écran: {selectedImage.description}
                  </DialogDescription>
                </DialogHeader>
                <div className="relative aspect-video">
                    <Image
                        src={selectedImage.imageUrl}
                        alt={selectedImage.description}
                        fill
                        className="object-contain"
                    />
                </div>
             </DialogContent>
        )}
      </Dialog>
    </div>
  );
}


'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { notFound, useParams, useRouter } from 'next/navigation';
import { getProducts } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import type { Product } from '@/lib/types';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useUser } from '@/firebase/auth/use-user';
import { useToast } from '@/hooks/use-toast';

export default function ProductDetailPage() {
  const params = useParams();
  const products = getProducts();
  const product = products.find((p) => p.id === String(params.id));
  const { addToCart } = useCart();
  const { user } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product?.variants?.size?.[0]);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product?.variants?.color?.[0]);

  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    if (!user) {
        toast({
            variant: "destructive",
            title: "Connexion requise",
            description: "Vous devez être connecté pour ajouter des articles au panier.",
        });
        router.push('/login');
        return;
    }
    
    addToCart({
      ...product,
      size: selectedSize,
      color: selectedColor
    });
  }

  return (
    <div className="container py-12 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div className="flex items-center justify-center">
            <Carousel
              plugins={[plugin.current]}
              className="w-full max-w-md"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent>
                {product.images.map((image) => (
                  <CarouselItem key={image.id}>
                    <Card className="overflow-hidden shadow-lg">
                      <div className="relative aspect-square w-full">
                        <Image
                          src={image.imageUrl}
                          alt={image.description}
                          width={500}
                          height={500}
                          className="object-cover"
                        />
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
            </Carousel>
        </div>
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-wider">{product.category}</p>
            <h1 className="text-4xl font-headline font-bold mt-1">{product.name}</h1>
            <p className="text-3xl font-semibold text-foreground mt-4">{product.price.toFixed(2)} €</p>
          </div>
          <Separator />
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          
          <div className="space-y-6">
            {product.variants?.size && (
              <div>
                <Label className="text-lg font-medium">Taille</Label>
                <RadioGroup
                  value={selectedSize}
                  onValueChange={setSelectedSize}
                  className="flex gap-2 mt-2"
                >
                  {product.variants.size.map(size => (
                    <RadioGroupItem key={size} value={size} id={`size-${size}`} className="sr-only" />
                  ))}
                  {product.variants.size.map(size => (
                    <Label
                      key={size}
                      htmlFor={`size-${size}`}
                      className={cn(
                        "flex items-center justify-center rounded-md border-2 p-3 h-12 w-12 cursor-pointer",
                        "hover:border-primary",
                        selectedSize === size ? "border-primary bg-primary/10" : "border-border"
                      )}
                    >
                      {size}
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            )}
            
            {product.variants?.color && (
                <div>
                    <Label className="text-lg font-medium">Couleur</Label>
                     <div className="flex gap-3 mt-2">
                        {product.variants.color.map(color => (
                            <button
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={cn(
                                    "h-10 w-10 rounded-full border-2 transition-transform duration-200",
                                    selectedColor === color ? 'ring-2 ring-offset-2 ring-primary scale-110' : 'ring-0',
                                    'hover:scale-110'
                                )}
                                style={{backgroundColor: color, borderColor: color}}
                                aria-label={`Select color ${color}`}
                            />
                        ))}
                    </div>
                </div>
            )}
          </div>

          <Button size="lg" className="h-14 text-lg w-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Ajouter au panier
          </Button>
        </div>
      </div>
    </div>
  );
}

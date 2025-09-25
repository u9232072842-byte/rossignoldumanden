import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ShoppingCart } from 'lucide-react';

export default function ShopPage() {
  const products = [
    {
      id: 1,
      name: "Anniversary Tour T-Shirt",
      price: 35.00,
      image: PlaceHolderImages.find(p => p.id === 'merch-tshirt'),
    },
    {
      id: 2,
      name: "'Golden Voice' Vinyl LP",
      price: 45.00,
      image: PlaceHolderImages.find(p => p.id === 'merch-vinyl'),
    },
    {
      id: 3,
      name: "Limited Edition Concert Poster",
      price: 25.00,
      image: PlaceHolderImages.find(p => p.id === 'merch-poster'),
    },
  ];

  return (
    <div className="container py-12 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-6xl">Official Merchandise</h1>
        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
          Take a piece of the magic home with you. Exclusive items available for a limited time.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <Card key={product.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader className="p-0">
              <div className="aspect-square relative">
                {product.image && (
                  <Image
                    src={product.image.imageUrl}
                    alt={product.image.description}
                    fill
                    className="object-cover"
                    data-ai-hint={product.image.imageHint}
                  />
                )}
              </div>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <CardTitle className="font-headline text-xl">{product.name}</CardTitle>
              <p className="text-lg font-semibold text-primary mt-2">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

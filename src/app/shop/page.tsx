
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Product } from '@/lib/types';
import { getProducts } from '@/lib/products';

export default function ShopPage() {
  const products: Product[] = getProducts();

  const categories = [
    { value: 'all', label: 'Tous' },
    { value: 'vestimentaire', label: 'Vêtements' },
    { value: 'musique', label: 'Musique & Culture' },
    { value: 'accessoires', label: 'Accessoires' },
    { value: 'decoration', label: 'Décoration' },
  ];

  const renderProductGrid = (category: string) => {
    const filteredProducts = category === 'all'
      ? products
      : products.filter(p => p.category === category);

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map(product => (
          <Card key={product.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader className="p-0">
              <div className="aspect-square relative">
                {product.images && product.images.length > 0 && (
                  <Image
                    src={product.images[0].imageUrl}
                    alt={product.images[0].description}
                    fill
                    className="object-cover"
                    data-ai-hint={product.images[0].imageHint}
                  />
                )}
              </div>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <CardTitle className="font-headline text-xl">{product.name}</CardTitle>
              <p className="text-lg font-semibold text-primary mt-2">{product.price.toFixed(2)} €</p>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href={`/shop/${product.id}`}>
                  Voir le produit <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-6xl">Boutique Officielle</h1>
        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
          Emportez un morceau de la magie chez vous. Articles exclusifs disponibles pour une durée limitée.
        </p>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList>
            {categories.map(cat => (
              <TabsTrigger key={cat.value} value={cat.value}>{cat.label}</TabsTrigger>
            ))}
          </TabsList>
        </div>
        {categories.map(cat => (
          <TabsContent key={cat.value} value={cat.value}>
            {renderProductGrid(cat.value)}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}


'use client';

import { useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProducts } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import type { Product } from '@/lib/types';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const products = getProducts();
  const product = products.find((p) => p.id === params.id);
  const { addToCart } = useCart();
  
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product?.variants?.size?.[0]);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product?.variants?.color?.[0]);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    const itemToAdd: Product & { size?: string, color?: string } = { ...product };
    if (selectedSize) itemToAdd.size = selectedSize;
    if (selectedColor) itemToAdd.color = selectedColor;
    addToCart(itemToAdd);
  }

  return (
    <div className="container py-12 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div className="flex items-center justify-center">
            <Card className="overflow-hidden shadow-lg">
                <div className="relative aspect-square w-full max-w-lg">
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
            </Card>
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
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger className="w-full mt-2 h-12 text-base">
                        <SelectValue placeholder="Sélectionnez une taille" />
                    </SelectTrigger>
                    <SelectContent>
                        {product.variants.size.map(size => (
                            <SelectItem key={size} value={size}>{size}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              </div>
            )}
            
            {product.variants?.color && (
                <div>
                    <Label className="text-lg font-medium">Couleur</Label>
                     <div className="flex gap-2 mt-2">
                        {product.variants.color.map(color => (
                            <Button 
                                key={color} 
                                variant={selectedColor === color ? 'default' : 'outline'}
                                size="icon"
                                onClick={() => setSelectedColor(color)}
                                className="h-10 w-10 rounded-full"
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

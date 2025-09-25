
'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export function Cart() {
  const {
    cartItems,
    cartCount,
    totalPrice,
    updateQuantity,
    removeFromCart,
    isCartOpen,
    setCartOpen,
  } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-primary rounded-full">
              {cartCount}
            </span>
          )}
          <span className="sr-only">Panier</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Votre Panier ({cartCount})</SheetTitle>
        </SheetHeader>
        {cartItems.length > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto pr-4 -mr-4">
              <div className="divide-y divide-border">
                {cartItems.map(item => {
                  const cartItemId = `${item.product.id}-${item.size || ''}-${item.color || ''}`;
                  return (
                    <div key={cartItemId} className="flex items-start gap-4 py-4">
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                        {item.product.images && item.product.images.length > 0 && (
                           <Image
                            src={item.product.images[0].imageUrl}
                            alt={item.product.images[0].description}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-base">{item.product.name}</h3>
                        <p className="text-sm font-bold text-primary">
                          {item.product.price.toFixed(2)} €
                        </p>
                        <div className="text-sm text-muted-foreground mt-1 space-x-2">
                          {item.size && <Badge variant="secondary">Taille: {item.size}</Badge>}
                          {item.color && <Badge variant="secondary" style={{ backgroundColor: item.color, color: '#fff'}}>Couleur</Badge>}
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(cartItemId, item.quantity - 1)}
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </Button>
                          <span className="font-bold text-sm w-5 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                             onClick={() => updateQuantity(cartItemId, item.quantity + 1)}
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive h-7 w-7"
                        onClick={() => removeFromCart(cartItemId)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )
                })}
              </div>
            </div>
            <SheetFooter className="mt-auto pt-4 border-t">
              <div>
                <div className="flex justify-between font-bold text-lg mb-4">
                  <span>Total</span>
                  <span>{totalPrice.toFixed(2)} €</span>
                </div>
                <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setCartOpen(false)}>
                  <Link href="/checkout">
                    Procéder au paiement
                  </Link>
                </Button>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Votre panier est vide.</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

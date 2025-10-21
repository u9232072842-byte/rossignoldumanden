
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { createCheckoutSession } from '@/ai/flows/stripe-flow';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase/auth/use-user';
import { Skeleton } from '@/components/ui/skeleton';

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user, loading: userLoading } = useUser();
  const router = useRouter();
  
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: ''});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!userLoading && !user) {
      toast({
        variant: "destructive",
        title: "Connexion requise",
        description: "Vous devez être connecté pour accéder au paiement.",
      });
      router.push('/login');
    }
  }, [user, userLoading, router, toast]);

  useEffect(() => {
    if (user) {
        setCustomerInfo(prev => ({
            ...prev,
            name: user.displayName || prev.name,
            email: user.email || prev.email,
        }));
    }
  }, [user]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [id]: value }));
  }

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const lineItems = cartItems.map(item => ({
        name: item.product.name,
        description: `${item.size ? `Taille: ${item.size}` : ''} ${item.color ? `Couleur: ${item.color}` : ''}`.trim(),
        amount: Math.round(item.product.price * 100), // Stripe expects amount in cents
        quantity: item.quantity,
        images: item.product.images.length > 0 ? [item.product.images[0].imageUrl] : [],
      }));

      const { url } = await createCheckoutSession({ lineItems, metadata: { customer_name: customerInfo.name, customer_email: customerInfo.email, userId: user?.uid } });
      
      if (url) {
        clearCart();
        router.push(url);
      } else {
         toast({
            variant: "destructive",
            title: "Erreur de paiement",
            description: "Impossible d'initier la session de paiement. Veuillez réessayer.",
        });
      }

    } catch (error) {
       console.error("Stripe checkout error:", error);
       toast({
            variant: "destructive",
            title: "Erreur inattendue",
            description: "Une erreur s'est produite lors du paiement. Veuillez contacter le support.",
        });
    } finally {
        setIsLoading(false);
    }
  };

  if(userLoading) {
    return (
        <div className="container py-12 md:py-24">
             <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                <div className="space-y-6">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-64 w-full" />
                </div>
                <div className="space-y-6">
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-48 w-full" />
                </div>
             </div>
        </div>
    )
  }
  
  if(cartItems.length === 0 && !userLoading){
    return (
        <div className="container py-12 md:py-24 text-center">
             <h1 className="text-3xl font-headline font-bold mb-2">Votre panier est vide</h1>
            <p className="text-muted-foreground mb-4">
                Ajoutez des articles à votre panier pour pouvoir passer une commande.
            </p>
            <Button asChild>
                <Link href="/shop">Visiter la boutique</Link>
            </Button>
        </div>
    )
  }

  return (
    <div className="container py-12 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Order Summary */}
        <div className="space-y-6">
            <h1 className="text-3xl font-headline font-bold">Résumé de la commande</h1>
            <Card>
                <CardContent className="p-6 space-y-4">
                    {cartItems.map(item => {
                         const cartItemId = `${item.product.id}-${item.size || ''}-${item.color || ''}`;
                         return (
                            <div key={cartItemId} className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="relative h-16 w-16 rounded-md overflow-hidden">
                                        {item.product.images && item.product.images.length > 0 && (
                                            <Image
                                                src={item.product.images[0].imageUrl}
                                                alt={item.product.images[0].description}
                                                width={64}
                                                height={64}
                                                className="object-cover"
                                            />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-semibold">{item.product.name}</p>
                                        <div className="text-sm text-muted-foreground mt-1 space-x-1">
                                            {item.size && <Badge variant="secondary">Taille: {item.size}</Badge>}
                                            {item.color && <Badge variant="secondary" style={{ backgroundColor: item.color, color: '#fff' }}>Couleur</Badge>}
                                        </div>
                                         <p className="text-sm text-muted-foreground">Quantité: {item.quantity}</p>
                                    </div>
                                </div>
                                <p className="font-semibold">{(item.product.price * item.quantity).toFixed(2)} €</p>
                            </div>
                         );
                    })}
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>{totalPrice.toFixed(2)} €</span>
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* Customer & Payment Info */}
        <div className="space-y-6">
            <h1 className="text-3xl font-headline font-bold">Paiement</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Informations client</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div>
                        <Label htmlFor="name">Nom complet</Label>
                        <Input id="name" type="text" placeholder="Votre nom complet" value={customerInfo.name} onChange={handleInputChange} disabled={isLoading}/>
                    </div>
                    <div>
                        <Label htmlFor="email">Adresse e-mail</Label>
                        <Input id="email" type="email" placeholder="Votre e-mail" value={customerInfo.email} onChange={handleInputChange} disabled={isLoading} />
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Informations de paiement</CardTitle>
                    <CardDescription>Paiement sécurisé par Stripe.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handlePayment} disabled={!customerInfo.name || !customerInfo.email || isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Payer {totalPrice.toFixed(2)} €
                    </Button>
                </CardContent>
                 <CardFooter>
                    <p className="text-xs text-muted-foreground">
                        Vous serez redirigé vers une page de paiement sécurisée Stripe.
                    </p>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}

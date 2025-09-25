
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, CreditCard } from 'lucide-react';

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState('form'); // form, confirmation
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: ''});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [id]: value }));
  }

  const handlePayment = () => {
    // In a real app, you would process the payment here.
    // For this simulation, we'll just move to the confirmation step.
    setStep('confirmation');
    clearCart(); // Clear the cart after "payment"
  };

  if (step === 'confirmation') {
    return (
      <div className="container py-12 md:py-24 text-center">
        <Card className="max-w-2xl mx-auto p-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-headline font-bold mb-2">Merci pour votre commande !</h1>
            <p className="text-muted-foreground mb-4">
                Votre commande a été passée avec succès. Un e-mail de confirmation a été envoyé à {customerInfo.email}.
            </p>
            <Button asChild>
                <a href="/">Retour à l'accueil</a>
            </Button>
        </Card>
      </div>
    );
  }
  
  if(cartItems.length === 0 && step !== 'confirmation'){
    return (
        <div className="container py-12 md:py-24 text-center">
             <h1 className="text-3xl font-headline font-bold mb-2">Votre panier est vide</h1>
            <p className="text-muted-foreground mb-4">
                Ajoutez des articles à votre panier pour pouvoir passer une commande.
            </p>
            <Button asChild>
                <a href="/shop">Visiter la boutique</a>
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
                    {cartItems.map(item => (
                    <div key={item.product.id} className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="relative h-16 w-16 rounded-md overflow-hidden">
                                {item.product.image && (
                                    <Image
                                        src={item.product.image.imageUrl}
                                        alt={item.product.image.description}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                            </div>
                            <div>
                                <p className="font-semibold">{item.product.name}</p>
                                <p className="text-sm text-muted-foreground">Quantité: {item.quantity}</p>
                            </div>
                        </div>
                        <p className="font-semibold">{(item.product.price * item.quantity).toFixed(2)} €</p>
                    </div>
                    ))}
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
                        <Input id="name" type="text" placeholder="Votre nom complet" value={customerInfo.name} onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label htmlFor="email">Adresse e-mail</Label>
                        <Input id="email" type="email" placeholder="Votre e-mail" value={customerInfo.email} onChange={handleInputChange} />
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Informations de paiement</CardTitle>
                    <CardDescription>Sélectionnez votre mode de paiement.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={handlePayment} disabled={!customerInfo.name || !customerInfo.email}>
                        Payer {totalPrice.toFixed(2)} € avec Stripe
                    </Button>
                    <Button size="lg" className="w-full bg-sky-600 hover:bg-sky-700 text-white" onClick={handlePayment} disabled={!customerInfo.name || !customerInfo.email}>
                        Payer {totalPrice.toFixed(2)} € avec PayPal
                    </Button>
                </CardContent>
                 <CardFooter>
                    <p className="text-xs text-muted-foreground">
                        Ceci est une simulation. Aucune transaction réelle ne sera effectuée.
                    </p>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}

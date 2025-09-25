
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Heart, Gift, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DonatePage() {
  const supportImage = PlaceHolderImages.find(p => p.id === 'hero-artist');
  const [amount, setAmount] = useState(20);
  const [customAmount, setCustomAmount] = useState('');
  const [step, setStep] = useState('amount'); // amount, payment, confirmation
  
  const suggestedAmounts = [10, 20, 50, 100];

  const handleAmountClick = (value: number) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    if (value && !isNaN(Number(value))) {
        setAmount(Number(value));
    }
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  }

  const renderContent = () => {
    switch(step) {
      case 'amount':
        return (
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                <Gift className="w-6 h-6 text-primary" />
                Faire une donation
              </CardTitle>
              <CardDescription>Choisissez un montant ou entrez le vôtre.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                  {suggestedAmounts.map(sa => (
                      <Button
                          key={sa}
                          type="button"
                          variant={amount === sa && !customAmount ? 'default' : 'outline'}
                          className={cn("h-16 text-lg font-bold", amount === sa && !customAmount && 'bg-primary hover:bg-primary/90')}
                          onClick={() => handleAmountClick(sa)}
                      >
                          {sa} €
                      </Button>
                  ))}
              </div>
              <div>
                <Label htmlFor="customAmount" className="sr-only">Montant personnalisé</Label>
                <Input 
                  id="customAmount" 
                  type="number" 
                  placeholder="Ou entrez un montant"
                  className="h-16 text-lg text-center font-bold"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  min="1"
                  />
              </div>
            </CardContent>
            <CardFooter>
               <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-14 text-lg">
                  Procéder au paiement de {amount} € <CreditCard className="ml-2 h-5 w-5" />
              </Button>
            </CardFooter>
          </form>
        );
      case 'payment':
        return (
          <CardContent className="p-8">
              <h3 className="font-headline text-xl mb-4 text-center">Paiement simulé</h3>
              <p className="text-center text-muted-foreground mb-6">Sélectionnez un mode de paiement pour finaliser votre don de {amount} €.</p>
              <div className="space-y-4">
                  <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setStep('confirmation')}>
                      Payer avec Stripe
                  </Button>
                  <Button size="lg" className="w-full bg-sky-600 hover:bg-sky-700 text-white" onClick={() => setStep('confirmation')}>
                      Payer avec PayPal
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => setStep('amount')}>
                    Retour
                  </Button>
              </div>
          </CardContent>
        );
      case 'confirmation':
        return (
          <CardContent className="p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
              <Heart className="w-16 h-16 text-primary mb-4" />
              <h3 className="font-headline text-2xl mb-2">Merci du fond du cœur !</h3>
              <p className="text-muted-foreground">Votre soutien est infiniment apprécié. Grâce à vous, la musique continue de vibrer.</p>
          </CardContent>
        );
      default:
        return null;
    }
  }

  return (
    <div className="container py-12 md:py-24">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto items-center">
        <div>
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">Soutenez la Musique</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Votre générosité contribue directement à la création de nouvelles œuvres, au financement des tournées et à la préservation de l'héritage musical mandingue. Chaque don, petit ou grand, est une pierre précieuse ajoutée à l'édifice de 30 ans de carrière.
          </p>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg mt-8">
            {supportImage && (
              <Image
                src={supportImage.imageUrl}
                alt={supportImage.description}
                width={800}
                height={450}
                className="object-cover object-top"
              />
            )}
          </div>
        </div>
        <Card className="shadow-lg">
          {renderContent()}
        </Card>
      </div>
    </div>
  );
}

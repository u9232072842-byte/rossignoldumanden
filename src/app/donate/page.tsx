
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Heart, Gift, CreditCard, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createCheckoutSession } from '@/ai/flows/stripe-flow';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase/auth/use-user';

export default function DonatePage() {
  const supportImage = PlaceHolderImages.find(p => p.id === 'hero-artist');
  const [amount, setAmount] = useState(20);
  const [customAmount, setCustomAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();
  
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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     if (!user) {
        toast({
            variant: "destructive",
            title: "Connexion requise",
            description: "Vous devez être connecté pour faire un don.",
        });
        router.push('/login');
        return;
    }
    setIsLoading(true);
    try {
      const lineItems = [{
        name: 'Don pour Djessou Mama Diabate',
        description: 'Votre soutien à l\'artiste et à sa musique.',
        amount: Math.round(amount * 100),
        quantity: 1,
      }];
      
      const { url } = await createCheckoutSession({ lineItems, metadata: { type: 'donation', userId: user.uid } });

      if (url) {
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
        description: "Une erreur s'est produite. Veuillez contacter le support.",
      });
    } finally {
      setIsLoading(false);
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
                          disabled={isLoading}
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
                  disabled={isLoading}
                  />
              </div>
            </CardContent>
            <CardFooter>
               <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-14 text-lg" disabled={isLoading || amount < 1}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CreditCard className="mr-2 h-5 w-5" />}
                  Procéder au paiement de {amount} €
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}

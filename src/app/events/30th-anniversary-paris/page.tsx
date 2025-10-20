
'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Calendar, MapPin, Ticket, CreditCard, Minus, Plus, Download, Clock, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import TicketComponent from '@/components/ticket';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { createCheckoutSession } from '@/ai/flows/stripe-flow';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function EventDetailPage() {
  const eventImage = PlaceHolderImages.find((p) => p.id === 'event-paris-flyer');
  const [ticketCount, setTicketCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const ticketRefs = useRef<Array<HTMLDivElement | null>>([]);
  const { toast } = useToast();
  const router = useRouter();


  const ticketPrice = 25.00;
  const eventDate = "8 novembre 2025";
  const eventTime = "20h00";
  const eventLocation = "3 rue de la Pointe, 93230 Romainville";


  const handleTicketChange = (amount: number) => {
    setTicketCount((prev) => Math.max(1, prev + amount));
  };

  const handlePayment = async () => {
    setIsLoading(true);
    try {
        const lineItems = [{
            name: "Billet: Célébration du 30ème anniversaire",
            description: `Date: ${eventDate} à ${eventTime}`,
            amount: Math.round(ticketPrice * 100),
            quantity: ticketCount,
            images: eventImage ? [eventImage.imageUrl] : [],
        }];

        const { url } = await createCheckoutSession({ 
            lineItems, 
            metadata: { 
                type: 'ticket', 
                event: '30th-anniversary-paris',
                quantity: String(ticketCount)
            } 
        });

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
            description: "Une erreur s'est produite lors du paiement. Veuillez contacter le support.",
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="container py-12 md:py-24">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto">
        <div>
          <div className="relative aspect-[9/16] w-full max-w-md mx-auto overflow-hidden rounded-lg shadow-lg bg-black p-2">
            {eventImage && (
              <Image
                src={eventImage.imageUrl}
                alt={eventImage.description}
                fill
                className="object-contain"
              />
            )}
          </div>
          <div className="mt-8">
            <h1 className="font-headline text-4xl font-bold">Célébration du 30ème anniversaire</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Ce projet est le symbole d’une grande diversité musicale. Rejoignez Djessou Mama Diabate pour une nuit inoubliable.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="font-medium">{eventDate}</span>
              </div>
               <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <span className="font-medium">{eventTime}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-medium">{eventLocation}</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                <Ticket className="w-6 h-6 text-primary" />
                Achetez vos billets
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Prix du billet</span>
                  <span className="font-bold">{ticketPrice.toFixed(2)} €</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Quantité</span>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleTicketChange(-1)} disabled={isLoading}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-bold w-8 text-center">{ticketCount}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleTicketChange(1)} disabled={isLoading}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-xl">
                  <span className="font-headline">Total</span>
                  <span className="font-bold">{(ticketPrice * ticketCount).toFixed(2)} €</span>
                </div>
                <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handlePayment} disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CreditCard className="ml-2 h-4 w-4" />}
                  Procéder au paiement
                </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

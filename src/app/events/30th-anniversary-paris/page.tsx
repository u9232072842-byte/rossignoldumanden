'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Calendar, MapPin, Ticket, CreditCard, Minus, Plus, Download } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import TicketComponent from '@/components/ticket';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function EventDetailPage() {
  const eventImage = PlaceHolderImages.find((p) => p.id === 'event-paris');
  const [ticketCount, setTicketCount] = useState(1);
  const [purchaseStep, setPurchaseStep] = useState('details'); // details, payment, confirmation
  const ticketRef = useRef(null);

  const ticketPrice = 75;

  const handleTicketChange = (amount: number) => {
    setTicketCount((prev) => Math.max(1, prev + amount));
  };

  const handleDownloadPdf = async () => {
    const element = ticketRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('billet-djessou-mama-diabate.pdf');
  };

  const renderStep = () => {
    switch (purchaseStep) {
      case 'details':
        return (
          <>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Prix du billet</span>
              <span className="font-bold">${ticketPrice}.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Quantité</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleTicketChange(-1)}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-bold w-8 text-center">{ticketCount}</span>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleTicketChange(1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-xl">
              <span className="font-headline">Total</span>
              <span className="font-bold">${ticketPrice * ticketCount}.00</span>
            </div>
            <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setPurchaseStep('payment')}>
              Procéder au paiement <CreditCard className="ml-2 h-4 w-4" />
            </Button>
          </>
        );
      case 'payment':
        return (
            <>
                <h3 className="font-headline text-xl mb-4 text-center">Paiement simulé</h3>
                <p className="text-center text-muted-foreground mb-6">Sélectionnez un mode de paiement pour finaliser votre achat.</p>
                <div className="space-y-4">
                    <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setPurchaseStep('confirmation')}>
                        Payer avec Stripe
                    </Button>
                    <Button size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white" onClick={() => setPurchaseStep('confirmation')}>
                        Payer avec Orange Money
                    </Button>
                </div>
            </>
        );
      case 'confirmation':
        const ticketId = `DMD-30ANS-${Date.now()}`;
        return (
          <div className="text-center">
            <h3 className="font-headline text-2xl mb-2">Achat confirmé !</h3>
            <p className="text-muted-foreground mb-4">Votre billet est prêt. Téléchargez-le ci-dessous.</p>
            <div className="bg-white p-4 rounded-lg shadow-inner">
              <TicketComponent
                ref={ticketRef}
                ticketId={ticketId}
                eventName="Célébration du 30ème anniversaire"
                eventDate="8 novembre 2025"
                eventLocation="Grand Rex, Paris, France"
                quantity={ticketCount}
              />
            </div>
            <Button size="lg" className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handleDownloadPdf}>
              Télécharger le billet PDF <Download className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="container py-12 md:py-24">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto">
        <div>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
            {eventImage && (
              <Image
                src={eventImage.imageUrl}
                alt={eventImage.description}
                fill
                className="object-cover"
                data-ai-hint={eventImage.imageHint}
              />
            )}
          </div>
          <div className="mt-8">
            <h1 className="font-headline text-4xl font-bold">Célébration du 30ème anniversaire</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Un concert unique pour célébrer trois décennies de génie musical. Rejoignez Djessou Mama Diabate pour une nuit inoubliable au cœur de Paris.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="font-medium">8 novembre 2025</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-medium">Grand Rex, Paris, France</span>
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
                {renderStep()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

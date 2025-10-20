
'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, Download } from 'lucide-react';
import TicketComponent from '@/components/ticket';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from 'react';


function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  // This is a placeholder for fetching session details from Stripe
  // In a real app, you'd make a server-side call to Stripe with the session_id to get details.
  // For this example, we'll simulate the data we might get from a ticket purchase.
  const isTicketPurchase = true; // Simulate
  const ticketCount = 2; // Simulate
  const ticketRefs = useRef<Array<HTMLDivElement | null>>([]);


  const eventDate = "8 novembre 2025";
  const eventTime = "20h00";
  const eventLocation = "3 rue de la Pointe, 93230 Romainville";

  const handleDownloadPdf = async (element: HTMLElement | null, ticketId: string) => {
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`billet-${ticketId}.pdf`);
  };

  return (
      <div className="container py-12 md:py-24 text-center">
        <Card className="max-w-2xl mx-auto p-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <CardHeader className="p-0">
                <CardTitle className="text-3xl font-headline font-bold mb-2">Paiement réussi !</CardTitle>
                <CardDescription className="text-muted-foreground mb-4">
                    Merci pour votre confiance. Votre transaction a été effectuée avec succès.
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0 mt-6">
                {isTicketPurchase && (
                     <div className="space-y-8 max-h-[50vh] overflow-y-auto p-1 text-left">
                        <h3 className="font-headline text-xl font-bold text-center">Vos Billets</h3>
                        {Array.from({ length: ticketCount }).map((_, index) => {
                            const ticketId = `${sessionId}-${index + 1}`;
                            return (
                            <div key={ticketId} className="space-y-4">
                                <div className="bg-white p-4 rounded-lg shadow-inner">
                                <TicketComponent
                                    ref={(el) => (ticketRefs.current[index] = el)}
                                    ticketId={ticketId}
                                    eventName="Célébration du 30ème anniversaire"
                                    eventDate={`${eventDate} - ${eventTime}`}
                                    eventLocation={eventLocation}
                                    quantity={1}
                                />
                                </div>
                                <Button 
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" 
                                onClick={() => handleDownloadPdf(ticketRefs.current[index], ticketId)}
                                >
                                Télécharger le billet {index + 1} <Download className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                            );
                        })}
                    </div>
                )}
                 <Button asChild className="mt-8">
                    <Link href="/">Retour à l'accueil</Link>
                </Button>
            </CardContent>
        </Card>
      </div>
  );
}


export default function SuccessPage() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <SuccessContent />
        </Suspense>
    );
}


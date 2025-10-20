
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { XCircle } from 'lucide-react';

export default function CancelPage() {
  return (
    <div className="container py-12 md:py-24 text-center">
      <Card className="max-w-2xl mx-auto p-8">
          <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <CardHeader className="p-0">
              <CardTitle className="text-3xl font-headline font-bold mb-2">Paiement annulé</CardTitle>
              <CardDescription className="text-muted-foreground mb-4">
                  Votre transaction a été annulée. Vous n'avez pas été débité.
              </CardDescription>
          </CardHeader>
          <CardContent className="p-0 mt-6">
              <p className="text-muted-foreground mb-6">
                Vous pouvez retourner à votre panier ou à la page d'accueil pour continuer votre navigation.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild>
                    <Link href="/checkout">Voir mon panier</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/">Retour à l'accueil</Link>
                </Button>
              </div>
          </CardContent>
      </Card>
    </div>
  );
}

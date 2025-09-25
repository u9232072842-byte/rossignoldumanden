
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { Cart } from '@/components/cart';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
             <Image src="/images/logo.png" alt="Logo" width={40} height={40} className="rounded-full"/>
            <span className="hidden sm:inline-block font-headline text-2xl font-bold tracking-tighter">
              Djessou Mama Diabate
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/#events"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Événements
            </Link>
             <Link
              href="/gallery"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Galerie
            </Link>
            <Link
              href="/albums"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Albums
            </Link>
            <Link
              href="/shop"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Boutique
            </Link>
            <Link
              href="/donate"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Soutenir
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          <Cart />
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">Profil</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

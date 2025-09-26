
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Loader2 } from 'lucide-react';
import { Cart } from '@/components/cart';
import { useUser } from '@/firebase/auth/use-user';
import { signOutUser } from '@/firebase/auth/auth-functions';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { user, loading } = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOutUser();
    router.push('/');
  };

  const renderUserAuth = () => {
    if (loading) {
      return (
        <Button variant="ghost" size="icon" disabled>
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="sr-only">Chargement...</span>
        </Button>
      );
    }

    if (!user) {
      return (
        <Button variant="ghost" size="icon" asChild>
          <Link href="/login">
            <User className="h-5 w-5" />
            <span className="sr-only">Profil</span>
          </Link>
        </Button>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">Profil</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <p>Mon Compte</p>
            <p className="text-xs text-muted-foreground font-normal">{user.email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Déconnexion</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

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
          {renderUserAuth()}
        </div>
      </div>
    </header>
  );
}

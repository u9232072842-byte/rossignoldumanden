
'use client';

import { useState } from 'react';
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
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { User, LogOut, Loader2, Menu, Music, Calendar, ShoppingBag, Heart, Image as ImageIcon } from 'lucide-react';
import { Cart } from '@/components/cart';
import { useUser } from '@/firebase/auth/use-user';
import { signOutUser } from '@/firebase/auth/auth-functions';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { user, loading } = useUser();
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSignOut = async () => {
    await signOutUser();
    router.push('/');
  };

  const navLinks = [
    { href: '/#events', label: 'Événements', icon: Calendar },
    { href: '/gallery', label: 'Galerie', icon: ImageIcon },
    { href: '/shop', label: 'Boutique', icon: ShoppingBag },
    { href: '/donate', label: 'Soutenir', icon: Heart },
  ];

  const renderUserAuth = () => {
    if (loading) {
      return (
        <Button variant="ghost" size="icon" disabled>
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span className="sr-only">Chargement...</span>
        </Button>
      );
    }

    if (!user) {
      return (
        <Button variant="ghost" size="icon" asChild>
          <Link href="/login">
            <User className="h-5 w-5 hover:text-primary transition-colors" />
            <span className="sr-only">Profil</span>
          </Link>
        </Button>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-muted">
            <User className="h-5 w-5 text-primary" />
            <span className="sr-only">Profil</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <p>Mon Compte</p>
            <p className="text-xs text-muted-foreground font-normal">{user.email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Déconnexion</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <header className="w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center">
        <div className="flex items-center md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Ouvrir le menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-background/95">
              <div className="flex flex-col space-y-6">
                <Link href="/" className="mr-6 flex items-center space-x-3" onClick={() => setIsSheetOpen(false)}>
                  <Image src="/images/logo.png" alt="Logo" width={40} height={40} className="rounded-full border-2 border-primary/50" />
                  <span className="font-headline text-lg font-bold tracking-tighter">
                    Djessou Mama
                  </span>
                </Link>
                <nav className="flex flex-col space-y-3">
                  {navLinks.map(link => {
                    const LinkIcon = link.icon;
                    return (
                      <SheetClose key={link.href} asChild>
                        <Link
                          href={link.href}
                          className="flex items-center gap-4 rounded-lg px-3 py-3 text-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                          <LinkIcon className="h-5 w-5 text-primary" />
                          {link.label}
                        </Link>
                      </SheetClose>
                    );
                  })}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex flex-1 items-center justify-start md:justify-start">
          <Link href="/" className="mr-3 sm:mr-6 flex items-center space-x-2 sm:space-x-3 group">
            <Image src="/images/logo.png" alt="Logo" width={50} height={50} className="rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 border-2 border-primary/30" />
            <span className="text-xl sm:text-2xl font-headline font-bold tracking-tighter">
              Djessou Mama
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-md transition-colors hover:bg-muted text-muted-foreground hover:text-foreground text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
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

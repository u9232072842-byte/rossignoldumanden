
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { signIn, signUp } from '@/firebase/auth/auth-functions';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleAuthAction = async (action: 'signIn' | 'signUp') => {
    setLoading(true);
    try {
      if (action === 'signIn') {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      toast({
        title: 'Succès',
        description: `Vous êtes maintenant ${action === 'signIn' ? 'connecté' : 'inscrit'}.`,
      });
      router.push('/');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: error.message || "Une erreur s'est produite.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center py-12 md:py-24">
      <Tabs defaultValue="login" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Connexion</TabsTrigger>
          <TabsTrigger value="register">Inscription</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <form onSubmit={(e) => { e.preventDefault(); handleAuthAction('signIn'); }}>
              <CardHeader>
                <CardTitle>Connexion</CardTitle>
                <CardDescription>Accédez à votre compte pour continuer.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input id="login-email" type="email" placeholder="m@exemple.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} autoComplete="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Mot de passe</Label>
                  <Input id="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} autoComplete="current-password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Chargement...' : 'Se connecter'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card>
            <form onSubmit={(e) => { e.preventDefault(); handleAuthAction('signUp'); }}>
              <CardHeader>
                <CardTitle>Inscription</CardTitle>
                <CardDescription>Créez un nouveau compte en quelques secondes.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input id="register-email" type="email" placeholder="m@exemple.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} autoComplete="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Mot de passe</Label>
                  <Input id="register-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} autoComplete="new-password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Chargement...' : "S'inscrire"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

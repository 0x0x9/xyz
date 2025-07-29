import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-sm glass-card border-white/20 shadow-2xl shadow-accent/10">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-foreground">Connexion</CardTitle>
            <CardDescription className="text-muted-foreground">
              Accédez à votre compte pour continuer.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="email@exemple.com" required className="bg-white/5 border-white/20 focus:bg-white/10" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mot de passe</Label>
                <Link href="#" className="text-sm text-accent hover:underline">
                  Mot de passe oublié?
                </Link>
              </div>
              <Input id="password" type="password" required className="bg-white/5 border-white/20 focus:bg-white/10" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              Se connecter
            </Button>
             <p className="text-center text-sm text-muted-foreground">
                Pas encore de compte?{' '}
                <Link href="/subscribe" className="font-semibold text-accent hover:underline">
                    S'inscrire
                </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
export default LoginPage;

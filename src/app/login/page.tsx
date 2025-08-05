
'use client';

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useAuth } from "@/components/auth-component";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const LoginPage = () => {
    const { handleSignIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await handleSignIn(email, password);
        setLoading(false);
    };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onSubmit={onSubmit}
        >
            <Card className="w-full max-w-sm glass-card border-white/20 shadow-2xl shadow-primary/10">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-foreground">Connexion</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Accédez à votre compte (X)yzz.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="email@exemple.com" 
                    required 
                    className="bg-background/50 border-input focus:bg-background/80" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Link href="#" className="text-sm text-primary hover:underline">
                      Mot de passe oublié?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    required 
                    className="bg-background/50 border-input focus:bg-background/80"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Se connecter
                </Button>
                 <p className="text-center text-sm text-muted-foreground">
                    Pas encore de compte?{' '}
                    <Link href="/subscribe" className="font-semibold text-primary hover:underline">
                        S'inscrire
                    </Link>
                </p>
              </CardFooter>
            </Card>
        </motion.form>
      </main>
      <Footer />
    </div>
  );
}
export default LoginPage;

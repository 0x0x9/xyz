
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
import { Loader2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const ForgotPasswordPage = () => {
    const { handlePasswordReset } = useAuth();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await handlePasswordReset(email);
        setLoading(false);
    };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center container mx-auto px-4 py-24">
        <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, ease: "easeOut" }}
             className="w-full max-w-md"
        >
            <Card className="glass-card shadow-2xl shadow-primary/10 border-white/20">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-foreground">Mot de passe oublié ?</CardTitle>
                <CardDescription className="text-muted-foreground pt-2">
                  Pas de souci. Entrez votre email et nous vous enverrons un lien pour le réinitialiser.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit} className="space-y-4">
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
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={loading}>
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Envoyer le lien
                    </Button>
                </form>
              </CardContent>
              <CardFooter>
                 <Button variant="ghost" asChild className="w-full">
                    <Link href="/login">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour à la connexion
                    </Link>
                </Button>
              </CardFooter>
            </Card>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
export default ForgotPasswordPage;

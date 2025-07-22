import FusionClient from './client';
import { Zap } from 'lucide-react';

export default function FusionPage() {
    return (
        <>
            <section className="text-center mb-12">
                <div className="flex justify-center mb-6">
                    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-3 rounded-full w-fit animate-gradient-x">
                        <Zap className="h-8 w-8 text-white" />
                    </div>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient-x">
                (X)fusion
                </h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
                Votre espace de travail créatif. Mixez et combinez vos outils IA préférés sur une seule toile pour un flux de travail sans limites.
                </p>
            </section>
            
            <FusionClient />
        </>
    );
}

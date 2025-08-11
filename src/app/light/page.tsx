
import LightClient from './client';
import { Sparkles } from 'lucide-react';

export const metadata = {
  title: '(X)light - Votre Bibliothèque Créative',
  description: 'Un espace spirituel et minimaliste pour stimuler votre créativité avec des idées, des ambiances et des inspirations visuelles générées par l\'IA.',
};

const LightPage = () => {
    return (
        <>
            <section className="text-center mb-12">
                <div className="flex justify-center mb-6">
                    <div className="bg-gradient-to-r from-amber-200 via-violet-300 to-sky-300 p-3 rounded-full w-fit animate-gradient-x">
                        <Sparkles className="h-8 w-8 text-background" />
                    </div>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-violet-300 to-sky-300 animate-gradient-x">
                (X)light
                </h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
                Votre sanctuaire créatif. Explorez des ambiances, des images et des idées pour allumer l'étincelle de votre prochain projet.
                </p>
            </section>
            
            <LightClient />
        </>
    );
}

export default LightPage;

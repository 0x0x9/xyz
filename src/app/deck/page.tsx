import DeckClient from './client';
import { Presentation } from 'lucide-react';

export default function DeckPage() {
    return (
        <>
            <section className="text-center mb-12">
                <div className="flex justify-center mb-6">
                    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-3 rounded-full w-fit animate-gradient-x">
                        <Presentation className="h-8 w-8 text-white" />
                    </div>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x">
                (X)deck
                </h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
                Transformez vos idées en présentations percutantes. Donnez un sujet, l'IA s'occupe de la structure et du contenu.
                </p>
            </section>
            
            <DeckClient />
        </>
    );
}

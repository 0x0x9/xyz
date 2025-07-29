import StoryClient from './client';
import { BookMarked } from 'lucide-react';

export default function StoryPage() {
    return (
        <>
            <section className="text-center mb-12">
                <div className="flex justify-center mb-6">
                    <div className="bg-gradient-to-r from-teal-400 via-cyan-500 to-sky-600 p-3 rounded-full w-fit animate-gradient-x">
                        <BookMarked className="h-8 w-8 text-white" />
                    </div>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-500 to-sky-600 animate-gradient-x">
                (X)story
                </h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
                Votre architecte narratif personnel. Développez des mondes, des personnages et des intrigues captivantes avec l'aide de l'IA.
                </p>
            </section>
            
            <StoryClient />
        </>
    );
}

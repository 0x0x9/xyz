import AlphaClient from './client';
import { TerminalSquare } from 'lucide-react';

export default function AlphaPage() {
    return (
        <>
            <section className="text-center mb-12">
                <div className="flex justify-center mb-6">
                    <div className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 p-3 rounded-full w-fit animate-gradient-x">
                        <TerminalSquare className="h-8 w-8 text-white" />
                    </div>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 animate-gradient-x">
                (X).alpha
                </h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
                L'éditeur de code intelligent. Générez, éditez et prévisualisez vos projets et fichiers, assisté par l'IA.
                </p>
            </section>
            
            <AlphaClient />

        </>
    );
}

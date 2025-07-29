import TerminalClient from './client';
import { Terminal } from 'lucide-react';

const TerminalPage = () => {
    return (
        <>
            <section className="text-center mb-12">
                <div className="flex justify-center mb-6">
                    <div className="bg-gradient-to-r from-gray-400 via-gray-600 to-gray-800 p-3 rounded-full w-fit animate-gradient-x">
                        <Terminal className="h-8 w-8 text-white" />
                    </div>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-gray-600 to-gray-800 animate-gradient-x">
                (X)term
                </h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
                Une interface de ligne de commande pour interagir avec vos outils et vos fichiers.
                </p>
            </section>
            
            <TerminalClient />
        </>
    );
}

export default TerminalPage;

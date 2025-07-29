import ToneClient from './client';
import { Mic } from 'lucide-react';

const TonePage = () => {
    return (
        <>
            <section className="text-center mb-12">
                <div className="flex justify-center mb-6">
                    <div className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 p-3 rounded-full w-fit animate-gradient-x">
                        <Mic className="h-8 w-8 text-white" />
                    </div>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 animate-gradient-x">
                (X)tone
                </h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
                Trouvez la bonne voix pour votre marque. Décrivez votre projet et obtenez un guide de style pour communiquer avec impact et cohérence.
                </p>
            </section>
            
            <ToneClient />

        </>
    );
}

export default TonePage;

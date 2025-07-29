import ImageClient from './client';
import { Image as ImageIcon } from 'lucide-react';

const ImagePage = () => {
  return (
    <>
      <section className="text-center mb-12">
        <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-3 rounded-full w-fit animate-gradient-x">
                <ImageIcon className="h-8 w-8 text-white" />
            </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 animate-gradient-x">
          Générateur d'Image
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
          Créez des visuels uniques à partir de simples descriptions. Laissez votre imagination prendre vie.
        </p>
      </section>
      <ImageClient />
    </>
  );
}
export default ImagePage;

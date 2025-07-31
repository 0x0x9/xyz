import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import GalleryClient from "./client";
import { galleryItems } from "@/lib/gallery-data";

export const metadata = {
  title: '(X)hibit - La Galerie Communautaire',
  description: 'Explorez les créations de la communauté (X)yzz.ai. Images, designs et concepts générés avec nos outils IA.',
};

const GalleryPage = () => {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 md:px-6 py-28 md:py-36">
           <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              (X)hibit
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
             Les créations de notre communauté, propulsées par l'IA.
            </p>
          </div>
          <GalleryClient items={galleryItems} />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default GalleryPage;

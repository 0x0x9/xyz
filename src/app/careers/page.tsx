import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import CareersClient from "./client";
import { jobOpenings } from "@/lib/careers-data";

export const metadata = {
  title: 'Carrières - (X)yzz.ai',
  description: 'Rejoignez une équipe de passionnés qui révolutionnent le monde de la création.',
};

const CareersPage = () => {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 md:px-6 py-28 md:py-36">
           <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              Rejoignez Notre Aventure
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Nous cherchons des esprits brillants et passionnés pour nous aider à construire le futur de la créativité.
            </p>
          </div>
          <CareersClient openings={jobOpenings} />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default CareersPage;

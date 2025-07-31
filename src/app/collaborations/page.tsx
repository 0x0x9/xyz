
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import CollaborationsClient from "./client";

export const metadata = {
  title: 'Collaborations - (X)yzz.ai',
  description: 'Trouvez des partenaires, des freelances et des projets au sein de la communauté créative (X)yzz.ai.',
};

const CollaborationsPage = () => {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 md:px-6 py-28 md:py-36">
           <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              (X)collaborate
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Le point de rencontre des talents. Proposez vos services, trouvez des projets, et construisez le futur de la création.
            </p>
          </div>
          <CollaborationsClient />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default CollaborationsPage;

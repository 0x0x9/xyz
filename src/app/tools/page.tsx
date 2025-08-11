
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ToolsClient from "./client";

export const metadata = {
  title: "L'Écosystème (X)yzz.ai",
  description: "Découvrez nos environnements de travail et notre suite complète d'outils créatifs IA. La plateforme unifiée pour les créateurs.",
};

const ToolsPage = () => {
  return (
    <>
      <Header />
      <main className="flex-1">
        <ToolsClient />
      </main>
      <Footer />
    </>
  );
};

export default ToolsPage;

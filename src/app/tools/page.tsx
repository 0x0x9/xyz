
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ToolsClient from "./client";

export const metadata = {
  title: "Outils IA - (X)yzz.ai",
  description: "Explorez la suite complète d'outils créatifs IA de l'écosystème (X)yzz. De l'idée à la réalisation, accélérez votre workflow.",
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

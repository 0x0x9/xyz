import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const TermsOfServicePage = () => {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 md:px-6 py-28 md:py-36">
          <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 rounded-2xl">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6">
              Conditions Générales d'Utilisation
            </h1>
            <div className="prose prose-invert dark:prose-invert text-foreground/80 max-w-none prose-h2:text-foreground prose-h2:font-bold prose-a:text-accent hover:prose-a:text-accent/80 prose-strong:text-foreground">
              <p>Dernière mise à jour : 24 Juillet 2024</p>
              
              <p>
                En accédant et en utilisant le site web (X)yzz. et ses services, vous acceptez d'être lié par les présentes Conditions Générales d'Utilisation.
              </p>

              <h2>1. Utilisation des Services</h2>
              <p>
                Vous vous engagez à utiliser nos services conformément à toutes les lois et réglementations applicables. Vous êtes seul responsable du contenu que vous créez, téléchargez ou partagez via nos plateformes. Il est interdit d'utiliser nos services à des fins illégales ou non autorisées.
              </p>

              <h2>2. Comptes Utilisateurs</h2>
              <p>
                Pour accéder à certaines fonctionnalités, vous devez créer un compte. Vous êtes responsable de la confidentialité de vos informations de connexion et de toutes les activités qui se déroulent sous votre compte. Vous devez nous informer immédiatement de toute utilisation non autorisée de votre compte.
              </p>

              <h2>3. Propriété Intellectuelle</h2>
              <p>
                Le site, ses services, et tout son contenu original (à l'exception du contenu fourni par les utilisateurs), ses caractéristiques et ses fonctionnalités sont et resteront la propriété exclusive de (X)yzz. et de ses concédants de licence.
              </p>
              <p>
                En utilisant nos outils IA, vous accordez à (X)yzz. une licence pour utiliser, stocker, et traiter le contenu que vous fournissez afin de vous fournir le service. Vous conservez tous les droits sur votre contenu original.
              </p>
              
              <h2>4. Abonnements et Paiements</h2>
              <p>
                Certains de nos services sont facturés sur la base d'un abonnement. Les frais d'abonnement sont facturés à l'avance sur une base récurrente et périodique (mensuelle ou annuelle). Les abonnements se renouvellent automatiquement sauf si vous les annulez avant la fin de la période de facturation en cours.
              </p>

              <h2>5. Limitation de Responsabilité</h2>
              <p>
                En aucun cas (X)yzz., ni ses administrateurs, employés ou partenaires, ne pourront être tenus responsables de tout dommage indirect, accessoire, spécial, consécutif ou punitif résultant de votre accès ou de votre utilisation de nos services.
              </p>
              
              <h2>6. Résiliation</h2>
              <p>
                Nous pouvons résilier ou suspendre votre accès à nos services immédiatement, sans préavis ni responsabilité, pour quelque raison que ce soit, y compris, sans s'y limiter, si vous ne respectez pas les présentes Conditions.
              </p>

              <h2>7. Modifications des Conditions</h2>
              <p>
                Nous nous réservons le droit, à notre seule discrétion, de modifier ou de remplacer ces Conditions à tout moment. Nous nous efforcerons de fournir un préavis d'au moins 30 jours avant l'entrée en vigueur de toute nouvelle condition.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default TermsOfServicePage;


import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 md:px-6 py-28 md:py-36">
          <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 rounded-2xl">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6">
              Politique de Confidentialité
            </h1>
            <div className="prose prose-invert dark:prose-invert text-foreground/80 max-w-none prose-h2:text-foreground prose-h2:font-bold prose-a:text-accent hover:prose-a:text-accent/80 prose-strong:text-foreground">
              <p>Dernière mise à jour : 24 Juillet 2024</p>
              
              <p>
                Bienvenue sur (X)yzz. Votre vie privée est d'une importance capitale pour nous. Cette politique de confidentialité explique quelles informations nous collectons, comment nous les utilisons, et quels sont vos droits concernant vos données personnelles.
              </p>

              <h2>1. Informations que nous collectons</h2>
              <p>
                Nous collectons des informations lorsque vous créez un compte, effectuez un achat, ou utilisez nos services. Celles-ci peuvent inclure :
              </p>
              <ul>
                <li>Votre nom, adresse e-mail, et mot de passe.</li>
                <li>Les informations de paiement et de facturation.</li>
                <li>Les données d'utilisation de nos services, comme les outils IA que vous utilisez.</li>
                <li>Les communications que vous avez avec notre support client.</li>
              </ul>

              <h2>2. Comment nous utilisons vos informations</h2>
              <p>
                Les données collectées sont utilisées pour :
              </p>
              <ul>
                <li>Fournir, maintenir et améliorer nos services.</li>
                <li>Traiter vos transactions et vous envoyer les confirmations.</li>
                <li>Communiquer avec vous, y compris pour le marketing et la promotion de nos services.</li>
                <li>Personnaliser votre expérience sur notre plateforme.</li>
                <li>Assurer la sécurité de notre site et de nos utilisateurs.</li>
              </ul>

              <h2>3. Partage de vos informations</h2>
              <p>
                Nous ne vendons, ne louons ni ne partageons vos informations personnelles avec des tiers à des fins de marketing sans votre consentement explicite. Nous pouvons partager des informations avec des fournisseurs de services tiers qui nous aident à exploiter notre site (par exemple, les processeurs de paiement), mais ils sont tenus de protéger vos données.
              </p>
              
              <h2>4. Sécurité des données</h2>
              <p>
                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos informations personnelles contre l'accès non autorisé, la modification, la divulgation ou la destruction.
              </p>

              <h2>5. Vos droits</h2>
              <p>
                Vous avez le droit d'accéder, de corriger ou de supprimer vos données personnelles. Vous pouvez également vous opposer au traitement de vos données. Pour exercer ces droits, veuillez nous contacter à <a href="mailto:privacy@xyzz.">privacy@xyzz.</a>.
              </p>
              
               <h2>6. Modifications de cette politique</h2>
              <p>
                Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous vous notifierons de tout changement en publiant la nouvelle politique sur cette page.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

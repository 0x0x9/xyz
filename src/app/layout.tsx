import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import AnimatedBackground from '@/components/layout/animated-background';
import { PageTransitionProvider } from '@/hooks/use-page-transition';
import { FusionDockProvider } from '@/hooks/use-fusion-dock';
import { NotificationsProvider } from '@/hooks/use-notifications';
import { UIStateProvider } from '@/hooks/use-ui-state';
import { Inter, Space_Grotesk } from 'next/font/google';
import { cn } from '@/lib/utils';

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontHeadline = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
});


export const metadata: Metadata = {
  title: '(X)yzz. - L\'écosystème créatif. Réinventé.',
  description: 'Un écosystème web immersif pour les créatifs. Vente de matériel, logiciels, outils IA et une communauté dédiée.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={cn(
        "font-body antialiased relative min-h-screen bg-background",
        fontBody.variable,
        fontHeadline.variable
        )}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
          <UIStateProvider>
            <NotificationsProvider>
              <FusionDockProvider>
                <PageTransitionProvider>
                  <AnimatedBackground />
                  <div className="relative z-10 flex flex-col min-h-screen">
                    {children}
                  </div>
                  <Toaster />
                </PageTransitionProvider>
              </FusionDockProvider>
            </NotificationsProvider>
          </UIStateProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PulseStudio - (X)yzz.ai',
  description: 'Gérez vos projets créatifs, collaborez et discutez avec l\'assistante IA Oria.',
};

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-screen flex items-center justify-center p-4 md:p-6 bg-transparent">
        {children}
    </div>
  );
}

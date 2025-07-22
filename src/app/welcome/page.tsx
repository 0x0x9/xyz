import WelcomeClient from './client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function WelcomePage() {
    return (
        <>
            <Header />
            <main>
                <WelcomeClient />
            </main>
            <Footer />
        </>
    );
}


import HardwareClient from './client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function HardwarePage() {
    return (
        <>
            <Header />
            <main>
                <HardwareClient />
            </main>
            <Footer />
        </>
    );
}

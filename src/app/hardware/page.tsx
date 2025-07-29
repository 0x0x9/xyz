import HardwareClient from './client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const HardwarePage = () => {
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

export default HardwarePage;

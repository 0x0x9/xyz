
'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useRef, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface PageTransitionContextType {
    isTransitioning: boolean;
    performTransition: (href: string) => void;
}

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined);

export function PageTransitionProvider({ children }: { children: ReactNode }) {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const previousPathname = useRef(pathname);

    const performTransition = useCallback((href: string) => {
        if (pathname !== href) {
            setIsTransitioning(true);
            // Let exit animation run before navigating
            setTimeout(() => {
                router.push(href);
            }, 350); 
        }
    }, [pathname, router]);

    useEffect(() => {
        if (previousPathname.current !== pathname) {
            // Path has changed, this means navigation is complete.
            // We start the timer to hide the overlay.
            const timer = setTimeout(() => {
                setIsTransitioning(false);
            }, 400); // Should be less than total animation time

            previousPathname.current = pathname;
            return () => clearTimeout(timer);
        }
    }, [pathname]);

    return (
        <PageTransitionContext.Provider value={{ isTransitioning, performTransition }}>
            {children}
        </PageTransitionContext.Provider>
    );
}

export function usePageTransition() {
    const context = useContext(PageTransitionContext);
    if (context === undefined) {
        throw new Error('usePageTransition doit être utilisé à l\'intérieur d\'un PageTransitionProvider');
    }
    return context;
}

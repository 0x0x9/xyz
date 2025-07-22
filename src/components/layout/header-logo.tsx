'use client';
import { cn } from '@/lib/utils';
import { usePageTransition } from '@/hooks/use-page-transition';

export default function HeaderLogo({ className }: { className?: string }) {
    const { isTransitioning } = usePageTransition();

    return (
        <div className={cn(
            "relative w-8 h-8",
            isTransitioning && "animate-spin",
            className
        )}>
            <div className="header-logo-orb">
                <div className="blob one"></div>
                <div className="blob two"></div>
                <div className="blob three"></div>
            </div>
        </div>
    );
}

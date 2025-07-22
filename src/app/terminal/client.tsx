'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

const XTerminal = dynamic(() => import('@/components/terminal'), {
    ssr: false,
    loading: () => <TerminalSkeleton />,
});

function TerminalSkeleton() {
    return (
        <Card className="glass-card bg-black/80 max-w-4xl mx-auto min-h-[500px]">
            <CardContent className="p-4 h-[500px]">
                <Skeleton className="h-full w-full bg-black/50" />
            </CardContent>
        </Card>
    );
}

export default function TerminalClient({ openApp }: { openApp?: (appId: string) => void }) {
    return <XTerminal openApp={openApp} />;
}

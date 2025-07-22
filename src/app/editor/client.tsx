'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

const AlphaEditor = dynamic(() => import('@/components/code-editor'), {
    ssr: false,
    loading: () => <AlphaEditorSkeleton />,
});

function AlphaEditorSkeleton() {
    return (
        <Card className="glass-card overflow-hidden border-white/20">
            <div className="grid grid-cols-1 lg:grid-cols-12 h-[70vh]">
                <div className="lg:col-span-3 p-4 md:p-6 bg-black/5 dark:bg-black/10">
                    <Skeleton className="h-10 w-full mb-4" />
                    <Skeleton className="h-full w-full" />
                </div>
                <div className="lg:col-span-9 p-4 md:p-6 lg:border-l border-t lg:border-t-0 border-white/20">
                    <div className="flex items-center justify-between gap-2 mb-4">
                        <Skeleton className="h-9 w-44 rounded-lg" />
                        <div className="flex items-center gap-1">
                            <Skeleton className="h-9 w-24 rounded-md" />
                            <Skeleton className="h-9 w-24 rounded-md" />
                            <Skeleton className="h-9 w-24 rounded-md" />
                        </div>
                    </div>
                    <Skeleton className="h-[calc(100%-4rem)] w-full rounded-lg" />
                </div>
            </div>
        </Card>
    );
}

export default function AlphaClient() {
    return <AlphaEditor />;
}

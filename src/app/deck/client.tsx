'use client';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import type { GenerateDeckOutput } from '@/ai/types';

const DeckGenerator = dynamic(() => import('@/components/deck-generator'), {
    ssr: false,
    loading: () => <DeckGeneratorSkeleton />,
});

function DeckGeneratorSkeleton() {
    return (
        <Card className="glass-card">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Skeleton className="h-7 w-7 rounded-full" />
                    <div>
                        <Skeleton className="h-7 w-48" />
                        <Skeleton className="h-5 w-64 mt-2" />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Skeleton className="h-28 w-full" />
            </CardContent>
            <div className="flex justify-center p-6 pt-0">
                <Skeleton className="h-12 w-60" />
            </div>
        </Card>
    );
}

export default function DeckClient() {
    const searchParams = useSearchParams();
    const resultId = searchParams.get('resultId');

    const { initialResult, prompt } = useMemo(() => {
        if (typeof window === 'undefined' || !resultId) return { initialResult: null, prompt: null };
        const stored = localStorage.getItem(resultId);
        if (stored) {
            try {
                localStorage.removeItem(resultId);
                const parsedState = JSON.parse(stored);
                return { initialResult: parsedState.result as GenerateDeckOutput, prompt: parsedState.prompt };
            } catch (e) {
                console.error("Failed to parse stored DeckGenerator result", e);
            }
        }
        return { initialResult: null, prompt: null };
    }, [resultId]);

    return <DeckGenerator initialResult={initialResult} prompt={prompt} />;
}

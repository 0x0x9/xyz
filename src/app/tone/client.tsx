'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import type { GenerateToneOutput } from '@/ai/types';

const ToneGenerator = dynamic(() => import('@/components/tone-generator'), {
    ssr: false,
    loading: () => <ToneGeneratorSkeleton />,
});

function ToneGeneratorSkeleton() {
    return (
        <Card className="glass-card max-w-4xl mx-auto">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Skeleton className="h-7 w-7 rounded-full" />
                    <div>
                        <Skeleton className="h-7 w-64" />
                        <Skeleton className="h-5 w-72 mt-2" />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Skeleton className="h-28 w-full" />
            </CardContent>
            <div className="flex justify-center p-6 pt-0">
                <Skeleton className="h-12 w-48" />
            </div>
        </Card>
    );
}

export default function ToneClient() {
    const searchParams = useSearchParams();
    const resultId = searchParams.get('resultId');

    const { initialResult, prompt } = useMemo(() => {
        if (typeof window === 'undefined' || !resultId) return { initialResult: null, prompt: null };
        const stored = localStorage.getItem(resultId);
        if (stored) {
            try {
                localStorage.removeItem(resultId);
                const parsedState = JSON.parse(stored);
                return { initialResult: parsedState.result as GenerateToneOutput, prompt: parsedState.prompt };
            } catch (e) {
                console.error("Failed to parse stored ToneGenerator result", e);
            }
        }
        return { initialResult: null, prompt: null };
    }, [resultId]);

    return <ToneGenerator initialResult={initialResult} prompt={prompt} />;
}

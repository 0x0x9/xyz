'use client';

import dynamic from 'next/dynamic';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Palette, Mic } from 'lucide-react';
import type { GeneratePaletteOutput, GenerateToneOutput } from '@/ai/types';

const ToolSkeleton = ({title, description, icon: Icon}: {title: string, description: string, icon: React.ElementType}) => (
    <Card className="glass-card w-full h-full min-h-[400px]">
        <CardHeader>
             <div className="flex items-center gap-3">
                <Icon className="h-7 w-7 text-primary" />
                <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <Skeleton className="h-28 w-full" />
            <div className="flex justify-center mt-6">
                <Skeleton className="h-12 w-48" />
            </div>
        </CardContent>
    </Card>
);

const ToneGenerator = dynamic(() => import('@/components/tone-generator'), { ssr: false, loading: () => <ToolSkeleton title="(X)tone" description="Définissez la voix de votre marque." icon={Mic} /> });
const PaletteGenerator = dynamic(() => import('@/components/palette-generator'), { ssr: false, loading: () => <ToolSkeleton title="(X)palette" description="Composez des palettes de couleurs." icon={Palette} /> });


export default function BrandIdentityClient({ initialPalette, initialTone, prompt }: { initialPalette?: GeneratePaletteOutput, initialTone?: GenerateToneOutput, prompt?: string }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start h-full">
            <ToneGenerator initialResult={initialTone} prompt={prompt} />
            <PaletteGenerator initialResult={initialPalette} prompt={prompt} />
        </div>
    );
}

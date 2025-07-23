"use client";

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { listDocumentsAction } from '@/app/actions';
import type { Doc } from '@/ai/types';

const CloudClient = dynamic(() => import('./client'));
const SharingClient = dynamic(() => import('./sharing/client'));
const DocManager = dynamic(() => import('@/components/doc-manager'));
const ActivityClient = dynamic(() => import('./activity/client'));

function CloudPageContent() {
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab') || 'dashboard';

    const [docs, setDocs] = useState<Doc[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const fetchDocs = useCallback(async () => {
        setLoading(true);
        try {
            const result = await listDocumentsAction();
            setDocs(result || []);
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Erreur', description: error.message });
            setDocs([]);
        } finally {
            setLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        fetchDocs();
    }, [fetchDocs]);
    
    if (loading) {
         return (
            <div className="flex-1 p-6 pt-0 flex flex-col h-full space-y-8">
                <Skeleton className="h-10 w-72" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({length: 4}).map((_, i) => <Skeleton key={i} className="h-40 w-full" />)}
                </div>
                <Skeleton className="flex-1 w-full" />
            </div>
        );
    }

    const renderContent = () => {
        switch (tab) {
            case 'files':
                return <DocManager onDataChange={fetchDocs} />;
            case 'sharing':
                return <SharingClient docs={docs} onDataChange={fetchDocs} />;
            case 'activity':
                return <ActivityClient docs={docs} loading={loading} />;
            case 'dashboard':
            default:
                return <CloudClient docs={docs} loading={loading} onDataChange={fetchDocs} />;
        }
    }

    return (
        <div className="flex-1 p-6 pt-0 flex flex-col h-full">
            {renderContent()}
        </div>
    );
}

export default CloudPageContent;

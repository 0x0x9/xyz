'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const XosClient = dynamic(() => import('@/components/xos/client'), {
    ssr: false,
    loading: () => <div className="w-full h-full" />,
});

const XosPage = () => {
    return (
       <div className="w-full h-full">
            <Suspense fallback={null}>
                <XosClient />
            </Suspense>
       </div>
    );
}

export default XosPage;

    
'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const XosClient = dynamic(() => import('@/components/xos/client'), {
    ssr: false,
    loading: () => <div className="w-full h-full" />,
});

const XOSLoader = () => {
    return <XosClient />;
}

const XosPage = () => {
    return (
       <>
        <Suspense>
            <XOSLoader />
        </Suspense>
       </>
    );
}

export default XosPage;

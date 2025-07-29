'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import XosWallpaper from '@/components/xos-wallpaper';

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
        <XosWallpaper />
        <Suspense>
            <XOSLoader />
        </Suspense>
       </>
    );
}

export default XosPage;

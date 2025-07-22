'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const ImageGenerator = dynamic(() => import('@/components/image-generator'), {
  ssr: false,
  loading: () => <ImageGeneratorSkeleton />,
});

function ImageGeneratorSkeleton() {
  return (
    <div className="glass-card w-full max-w-4xl min-h-[70vh] mx-auto overflow-hidden p-0 flex flex-col">
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="text-center">
          <Skeleton className="mx-auto h-16 w-16 rounded-lg" />
          <Skeleton className="mt-4 h-5 w-64" />
        </div>
      </div>
      <div className="p-4 md:p-6 border-t border-white/10 shrink-0">
        <div className="flex items-start gap-4">
          <Skeleton className="flex-1 h-14 rounded-full" />
          <Skeleton className="h-14 w-48 rounded-full" />
          <Skeleton className="w-14 h-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function ImageClient() {
  return <ImageGenerator />;
}

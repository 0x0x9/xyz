'use client';

import { cn } from '@/lib/utils';
import OrbLoader from './orb-loader';

export default function AiLoadingAnimation({ isLoading, className }: { isLoading: boolean; className?: string }) {
  if (!isLoading) return null;

  return (
    <div className={cn("w-full h-full flex items-center justify-center", className)}>
      <OrbLoader />
    </div>
  );
}

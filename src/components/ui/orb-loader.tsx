'use client';

import { cn } from '@/lib/utils';

export default function OrbLoader({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div className="orb"></div>
    </div>
  );
}

'use client';

import { cn } from '@/lib/utils';

export default function OriaAnimation({ className }: { className?: string }) {
  return (
    <div className={cn(
      "relative",
      className
    )}>
        <div className="oria-orb">
            <div className="blob one"></div>
            <div className="blob two"></div>
            <div className="blob three"></div>
        </div>
    </div>
  );
}

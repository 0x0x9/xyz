
'use client';

import { cn } from '@/lib/utils';

function OriaCoreAnimation() {
    return (
        <div className="oria-orb">
            <div className="blob one"></div>
            <div className="blob two"></div>
            <div className="blob three"></div>
        </div>
    );
}

export default function OriaIconAnimation({ className }: { className?: string }) {
  return (
    <div className={cn(
      "relative rounded-full overflow-hidden",
      className
    )}>
        <OriaCoreAnimation />
    </div>
  );
}

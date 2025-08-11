
'use client';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useUIState } from '@/hooks/use-ui-state';

/**
 * An animated background with luminous prism effects that vary by route.
 *
 * This component creates a theme-aware background with multiple
 * moving and rotating colored halos, simulating a prism effect.
 * It detects the current route and applies a specific animation variant.
 */
export default function AnimatedBackground() {
  const pathname = usePathname();
  const { isAnimatedBg } = useUIState();

  const getVariant = () => {
    if (pathname.startsWith('/xos')) {
      return 'xos';
    }
    if (pathname.startsWith('/cloud')) {
      return 'xcloud';
    }
    return 'default';
  };

  const variant = getVariant();

  if (!isAnimatedBg) {
      return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-50 h-full w-full overflow-hidden bg-background">
      {variant === 'default' && (
        <>
          <div className="prism-light default-one"></div>
          <div className="prism-light default-two"></div>
          <div className="prism-light default-three"></div>
          <div className="prism-light default-four"></div>
          <div className="prism-light default-five"></div>
        </>
      )}
       {variant === 'xos' && (
        <>
          <div className="prism-light xos-one"></div>
          <div className="prism-light xos-two"></div>
          <div className="prism-light xos-three"></div>
          <div className="prism-light xos-four"></div>
        </>
      )}
       {variant === 'xcloud' && (
        <>
          <div className="prism-light xcloud-one"></div>
          <div className="prism-light xcloud-two"></div>
          <div className="prism-light xcloud-three"></div>
        </>
      )}
    </div>
  );
}

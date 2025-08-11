
'use client';

import { useUIState } from "@/hooks/use-ui-state";
import AnimatedBackground from "../layout/animated-background";

export default function XosWallpaper() {
    const { isAnimatedBg } = useUIState();

    if (!isAnimatedBg) {
        return <div className="fixed inset-0 -z-50 h-full w-full bg-background" />;
    }

    return <AnimatedBackground />;
}

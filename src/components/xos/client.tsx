
'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';

import XosDock from '@/components/xos/dock';
import XosWindow from '@/components/xos/window';
import DesktopIcons from './desktop-icons';

import { useWindowManager } from '@/hooks/use-window-manager';
import { useAppLauncher } from '@/hooks/use-app-launcher';

export default function XosClient() {
    const searchParams = useSearchParams();
    const isInitialLoad = useRef(true);

    const { windows, openWindow, closeWindow, bringToFront, toggleMinimize, updateWindowPosition, updateWindowSize, setWindows } = useWindowManager();
    
    const { launchAppFromUrl, launchFluxProject } = useAppLauncher(openWindow, closeWindow);

    const [isBooting, setIsBooting] = useState(true);
    const hasBooted = useRef(false);

    // Boot sequence
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsBooting(false);
            if (!hasBooted.current) {
                hasBooted.current = true;
                if (isInitialLoad.current) {
                    isInitialLoad.current = false;
                    const appToOpen = searchParams.get('open');
                    const resultId = searchParams.get('resultId');
                    
                    if (appToOpen) {
                        launchAppFromUrl(appToOpen, resultId);
                    } else {
                        // Load saved session or default apps
                        try {
                            const savedStateJSON = localStorage.getItem('xosSession');
                            if (savedStateJSON) {
                                const savedWindows = JSON.parse(savedStateJSON);
                                if (Array.isArray(savedWindows) && savedWindows.length > 0) {
                                    setWindows(savedWindows);
                                } else {
                                    openWindow('welcome');
                                    openWindow('oria');
                                }
                            } else {
                                openWindow('welcome');
                                openWindow('oria');
                            }
                        } catch (error) {
                            console.error("Failed to load XOS session:", error);
                            localStorage.removeItem('xosSession');
                            openWindow('welcome');
                            openWindow('oria');
                        }
                    }
                }
            }
        }, 100);
        
        return () => clearTimeout(timer);
    }, [launchAppFromUrl, openWindow, searchParams, setWindows]);

    // Save state to localStorage whenever windows change
    useEffect(() => {
        if (hasBooted.current && windows.length > 0) {
            try {
                const windowsToSave = windows.map(win => ({
                    id: win.id,
                    appId: win.appId,
                    zIndex: win.zIndex,
                    isMinimized: win.isMinimized,
                    props: win.props,
                    x: win.x,
                    y: win.y,
                    width: win.width,
                    height: win.height,
                }));
                localStorage.setItem('xosSession', JSON.stringify(windowsToSave));
            } catch (error) {
                console.error("Failed to save XOS session:", error);
            }
        } else if (hasBooted.current && windows.length === 0) {
            localStorage.removeItem('xosSession');
        }
    }, [windows]);

    return (
        <div className="absolute inset-0" >
            <DesktopIcons isBooting={isBooting} onOpenApp={openWindow} />

            <AnimatePresence>
                {windows.map(win => (
                    <XosWindow
                        key={win.id}
                        instance={win}
                        onClose={() => closeWindow(win.id)}
                        onFocus={() => bringToFront(win.id)}
                        onMinimize={() => toggleMinimize(win.id)}
                        onDragStop={(e, d) => updateWindowPosition(win.id, { x: d.x, y: d.y })}
                        onResizeStop={(e, dir, ref, delta, pos) => updateWindowSize(win.id, {
                            width: ref.style.width,
                            height: ref.style.height,
                            ...pos,
                        })}
                    >
                        {win.component}
                    </XosWindow>
                ))}
            </AnimatePresence>
            
            <XosDock windows={windows} onDockItemClick={toggleMinimize} />
        </div>
    );
}

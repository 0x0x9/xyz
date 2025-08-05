
'use client';

import { useState, useCallback, ReactNode, useEffect } from 'react';
import { ALL_APPS_CONFIG } from '@/lib/apps-config.tsx';

export type WindowInstance = {
    id: number;
    appId: string;
    title: string;
    icon: React.ElementType;
    component: React.ReactNode;
    zIndex: number;
    isMinimized: boolean;
    props?: Record<string, any>;
    x: number;
    y: number;
    width: number | string;
    height: number | string;
    isLoading?: boolean;
    loadingProgress?: number;
};

export function useWindowManager() {
    const [windows, setWindows] = useState<WindowInstance[]>([]);
    const [isBooting, setIsBooting] = useState(true);

    // Finish boot sequence after a short delay
    useEffect(() => {
        const timer = setTimeout(() => setIsBooting(false), 100);
        return () => clearTimeout(timer);
    }, []);
    
    // Save session on change
    useEffect(() => {
        if (isBooting) return; // Don't save during initial boot
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
    }, [windows, isBooting]);

    const closeWindow = useCallback((id: number) => {
        setWindows(prev => prev.filter(w => w.id !== id));
    }, []);

    const bringToFront = useCallback((id: number) => {
        setWindows(currentWindows => {
            const maxZ = currentWindows.reduce((max, w) => Math.max(max, w.zIndex), 9);
            const windowToFront = currentWindows.find(w => w.id === id);

            if (windowToFront && windowToFront.zIndex === maxZ + 1) {
                return currentWindows; // Already at the front
            }

            return currentWindows.map(w => w.id === id ? { ...w, zIndex: maxZ + 1 } : w);
        });
    }, []);

    const openWindow = useCallback((appId: string, props: Record<string, any> = {}) => {
        const appConfig = ALL_APPS_CONFIG.find(app => app.id === appId);
        if (!appConfig) {
            console.error(`App with id "${appId}" not found.`);
            return;
        }

        setWindows(currentWindows => {
            const maxZ = currentWindows.reduce((max, w) => Math.max(max, w.zIndex), 9);
            const newWindowId = Date.now() + Math.random();

            const componentProps = {
                ...props,
                openApp: openWindow,
                onClose: () => closeWindow(newWindowId),
            };

            const newWindow: WindowInstance = {
                id: newWindowId,
                appId: appConfig.id,
                title: appConfig.name,
                icon: appConfig.icon,
                zIndex: maxZ + 1,
                isMinimized: false,
                props: props, // Store original props for session restore
                x: (appConfig.defaultPos?.x ?? 200) + (currentWindows.length % 10 * 25),
                y: (appConfig.defaultPos?.y ?? 100) + (currentWindows.length % 10 * 25),
                width: appConfig.defaultSize?.width ?? 700,
                height: appConfig.defaultSize?.height ?? 500,
                component: appConfig.component(componentProps),
            };

            return [...currentWindows, newWindow];
        });
    }, [closeWindow]);


    const updateWindowPosition = useCallback((id: number, pos: { x: number, y: number }) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, x: pos.x, y: pos.y } : w));
    }, []);

     const updateWindowSize = useCallback((id: number, size: { width: number | string, height: number | string, x: number, y: number }) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, ...size } : w));
    }, []);

    const toggleMinimize = useCallback((id: number) => {
        setWindows(currentWindows => {
            const win = currentWindows.find(w => w.id === id);
            if (!win) return currentWindows;

            if (win.isMinimized) {
                const maxZ = currentWindows.reduce((max, w) => w.isMinimized ? max : Math.max(max, w.zIndex), 9);
                return currentWindows.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: maxZ + 1 } : w);
            } else {
                return currentWindows.map(w => w.id === id ? { ...w, isMinimized: true } : w);
            }
        });
    }, []);
    
    const setWindowsFromSession = useCallback((savedWindows: any[]) => {
         const restoredWindows = savedWindows.map(win => {
            const appConfig = ALL_APPS_CONFIG.find(app => app.id === win.appId);
            if (!appConfig) return null;

            const componentProps = {
                ...win.props,
                openApp: openWindow,
                onClose: () => closeWindow(win.id),
            };

            return {
                ...win,
                title: appConfig.name,
                icon: appConfig.icon,
                component: appConfig.component(componentProps),
            };
        }).filter(Boolean) as WindowInstance[];
        setWindows(restoredWindows);

    }, [openWindow, closeWindow]);

    return {
        windows,
        openWindow,
        closeWindow,
        bringToFront,
        toggleMinimize,
        updateWindowPosition,
        updateWindowSize,
        setWindows: setWindowsFromSession,
        isBooting,
    };
}

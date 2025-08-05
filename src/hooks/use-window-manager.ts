
'use client';

import { useState, useCallback } from 'react';
import { ALL_APPS_CONFIG } from '@/lib/apps-config';

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

    const closeWindow = useCallback((id: number) => {
        setWindows(prev => prev.filter(w => w.id !== id));
    }, []);

    const openWindow = useCallback((appId: string, props: Record<string, any> = {}) => {
        const appConfig = ALL_APPS_CONFIG.find(app => app.id === appId);
        if (!appConfig) {
            console.error(`App with id "${appId}" not found.`);
            return;
        }

        setWindows(currentWindows => {
            // Do not reuse windows with specific results/initial data, always open a new one.
            const canReuse = !props.initialResult && !props.initialProjectCodes && !props.initialFile;
            const existingWindow = canReuse ? currentWindows.find(w => w.appId === appId) : undefined;
            const maxZ = currentWindows.reduce((max, w) => Math.max(max, w.zIndex), 9);
            const newZ = maxZ + 1;

            if (existingWindow) {
                return currentWindows.map(w =>
                    w.id === existingWindow.id
                        ? { ...w, isMinimized: false, zIndex: newZ, props: { ...w.props, ...props} } // Merge props
                        : w
                );
            }
    
            const newWindowId = Date.now() + Math.random();
            const newWindow: WindowInstance = {
                id: newWindowId,
                appId: appConfig.id,
                title: appConfig.name,
                icon: appConfig.icon,
                zIndex: newZ,
                isMinimized: false,
                props,
                x: (appConfig.defaultPos?.x ?? 200) + (currentWindows.length * 20),
                y: (appConfig.defaultPos?.y ?? 100) + (currentWindows.length * 20),
                width: appConfig.defaultSize?.width ?? 700,
                height: appConfig.defaultSize?.height ?? 500,
                component: null, // Placeholder
            };

            // Pass the openWindow and closeWindow functions to the component
            const componentProps = {
                ...props,
                openApp: openWindow,
                onClose: () => closeWindow(newWindowId)
            };
            newWindow.component = appConfig.component(componentProps);

            return [...currentWindows, newWindow];
        });
    }, [closeWindow]);


    const updateWindowPosition = useCallback((id: number, pos: { x: number, y: number }) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, x: pos.x, y: pos.y } : w));
    }, []);

     const updateWindowSize = useCallback((id: number, size: { width: number | string, height: number | string, x: number, y: number }) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, ...size } : w));
    }, []);

    const bringToFront = useCallback((id: number) => {
        setWindows(currentWindows => {
            const maxZ = currentWindows.reduce((max, w) => Math.max(max, w.zIndex), 9);
            return currentWindows.map(w => w.id === id ? { ...w, zIndex: maxZ + 1 } : w);
        });
    }, []);

    const toggleMinimize = useCallback((id: number) => {
        setWindows(currentWindows => {
            const win = currentWindows.find(w => w.id === id);
            if (!win) return currentWindows;

            if (win.isMinimized) {
                // UN-MINIMIZING: bring to front
                const maxZ = currentWindows.reduce((max, w) => w.isMinimized ? max : Math.max(max, w.zIndex), 0);
                return currentWindows.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: maxZ + 1 } : w);
            } else {
                // MINIMIZING: just set the flag
                return currentWindows.map(w => w.id === id ? { ...w, isMinimized: true } : w);
            }
        });
    }, []);

    return {
        windows,
        openWindow,
        closeWindow,
        bringToFront,
        toggleMinimize,
        updateWindowPosition,
        updateWindowSize,
        setWindows
    };
}

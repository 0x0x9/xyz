'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface FusionDockContextType {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
    toolsToLoad: string | null;
    loadTools: (tools: string) => void;
}

const FusionDockContext = createContext<FusionDockContextType | undefined>(undefined);

export function FusionDockProvider({ children }: { children: ReactNode }) {
    const [isOpen, setOpen] = useState(false);
    const [toolsToLoad, setToolsToLoad] = useState<string | null>(null);

    const loadTools = (tools: string) => {
        setToolsToLoad(tools);
        setOpen(true);
    };

    return (
        <FusionDockContext.Provider value={{ isOpen, setOpen, toolsToLoad, loadTools }}>
            {children}
        </FusionDockContext.Provider>
    );
}

export function useFusionDock() {
    const context = useContext(FusionDockContext);
    if (context === undefined) {
        throw new Error('useFusionDock must be used within a FusionDockProvider');
    }
    return context;
}

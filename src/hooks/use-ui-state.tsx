'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface UIStateContextType {
    isBannerVisible: boolean;
    setBannerVisible: (isVisible: boolean) => void;
}

const UIStateContext = createContext<UIStateContextType | undefined>(undefined);

export function UIStateProvider({ children }: { children: ReactNode }) {
    const [isBannerVisible, setBannerVisible] = useState(true);

    return (
        <UIStateContext.Provider value={{ isBannerVisible, setBannerVisible }}>
            {children}
        </UIStateContext.Provider>
    );
}

export function useUIState() {
    const context = useContext(UIStateContext);
    if (context === undefined) {
        throw new Error('useUIState must be used within a UIStateProvider');
    }
    return context;
}

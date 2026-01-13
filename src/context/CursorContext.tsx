'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CursorContextType {
    cursorText: string | null;
    setCursorText: (text: string | null) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: ReactNode }) {
    const [cursorText, setCursorText] = useState<string | null>(null);

    return (
        <CursorContext.Provider value={{ cursorText, setCursorText }}>
            {children}
        </CursorContext.Provider>
    );
}

export function useCursor() {
    const context = useContext(CursorContext);
    if (!context) {
        throw new Error('useCursor must be used within a CursorProvider');
    }
    return context;
}

export function useCursorText(text: string) {
    const { setCursorText } = useCursor();

    useEffect(() => {
        setCursorText(text);
        return () => setCursorText(null);
    }, [text, setCursorText]);
}

'use client';
import { motion } from 'framer-motion';
import { useCursorText } from '../context/CursorContext';
import { useState } from 'react';

interface NavigationControlsProps {
    onBack: () => void;
}

export default function NavigationControls({ onBack }: NavigationControlsProps) {
    const [isHovered, setIsHovered] = useState(false);
    const { setCursorText } = useCursorText("Prev") || { setCursorText: () => { } }; // Fallback if context is undefined, though it shouldn't be

    // We use a manual handler for cursor text instead of the hook for conditional hover
    // actually useCursorText hook sets it on mount. 
    // Let's us the context directly via useCursor in the parent or just handle it here.
    // The requirement says "Ensure the GhostCursor reacts when hovering ... showing a small 'Prev' label".

    // Changing approach slightly: useCursor acts globally. 
    // I'll use the onMouseEnter/Leave to set text.

    return (
        <motion.button
            onClick={onBack}
            className="fixed top-8 left-8 z-[50] flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-md border border-white/10 bg-white/5 text-white shadow-lg transition-all hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            aria-label="Go Back"
        // The GhostCursor component automatically scales up for 'button' tags. 
        // We need to handle the text label manually or via a prop if GhostCursor supports it. 
        // Looking at GhostCursor.tsx, it reads from cursorText.
        // But useCursorText hook sets it for the *Scene*. 
        // We want it for the *Button*.
        // So we need to access the setter directly.
        >
            <span className="font-light text-2xl pb-1 group-hover:-translate-x-0.5 transition-transform">
                ←
            </span>
        </motion.button>
    );
}

'use client';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import { useState } from 'react';

interface NavigationControlsProps {
    onBack: () => void;
}

export default function NavigationControls({ onBack }: NavigationControlsProps) {
    const { setCursorText } = useCursor();

    return (
        <motion.button
            onClick={onBack}
            onMouseEnter={() => setCursorText("Prev")}
            onMouseLeave={() => setCursorText(null)}
            className="fixed top-8 left-8 z-[50] flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-md border border-white/10 bg-white/5 text-white shadow-lg transition-all hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            aria-label="Go Back"
        >
            <span className="font-light text-2xl pb-1 group-hover:-translate-x-0.5 transition-transform">
                ←
            </span>
        </motion.button>
    );
}

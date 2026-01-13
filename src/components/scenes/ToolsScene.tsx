import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import TrackToggle from '../TrackToggle';
import { useCursor } from '../../context/CursorContext';

interface ToolsSceneProps {
    onNext: () => void;
    onBack: () => void;
    activeTrack: 'DESIGN' | 'LOGIC';
    onTrackChange: (track: 'DESIGN' | 'LOGIC') => void;
}

// Data Sets
const LOGIC_TOOLS = [
    { name: "PYTHON", cat: "OPTIMIZATION", prof: "ADVANCED" },
    { name: "R", cat: "LOGIC CORE", prof: "EXPERT" },
    { name: "TYPESCRIPT", cat: "WEB SYSTEM", prof: "PROFICIENT" },
    { name: "NEXT.JS 15", cat: "FRAMEWORK", prof: "ADVANCED" },
    { name: "REACT", cat: "UI LIB", prof: "ADVANCED" },
    { name: "GSAP", cat: "ANIMATION", prof: "INTERMEDIATE" },
    { name: "GIT", cat: "VCS", prof: "EXPERT" },
    { name: "TURBOPACK", cat: "BUILD", prof: "INTERMEDIATE" },
    { name: "VS CODE", cat: "IDE", prof: "GOD MODE" },
];

const DESIGN_TOOLS = [
    { name: "FIGMA", cat: "SYSTEMS", prof: "EXPERT" },
    { name: "ADOBE SUITE", cat: "CREATIVE", prof: "ADVANCED" },
    { name: "SPLINE", cat: "3D WEB", prof: "LEARNING" },
    { name: "GSAP", cat: "MOTION", prof: "INTERMEDIATE" },
    { name: "FRAMER MOTION", cat: "INTERACTION", prof: "ADVANCED" },
];

export default function ToolsScene({ onNext, onBack, activeTrack, onTrackChange }: ToolsSceneProps) {
    const { setCursorText } = useCursor();
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <motion.div
            ref={containerRef}
            className={`w-full min-h-screen relative flex flex-col p-6 md:p-10 overflow-hidden transition-colors duration-700 ${activeTrack === 'DESIGN' ? 'bg-[#0a0a0a]' : 'bg-black'} overflow-y-auto`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Logic Track Background */}
            {activeTrack === 'LOGIC' && (
                <div className="absolute inset-0 z-0 bg-blueprint-grid opacity-30 pointer-events-none fixed" />
            )}

            {/* Design Track Background */}
            {activeTrack === 'DESIGN' && (
                <>
                    <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none fixed" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none fixed" />
                </>
            )}

            {/* Unified Header with Back Button and Stage Title */}
            <header className="absolute top-10 left-10 z-50 flex items-center gap-4">
                <button
                    onClick={onBack}
                    className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-white/5 text-white shadow-lg transition-all hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 group"
                    aria-label="Go Back"
                >
                    <span className="font-light text-2xl pb-1 group-hover:-translate-x-0.5 transition-transform">
                        ←
                    </span>
                </button>
                <motion.h1
                    className="text-xl md:text-2xl font-bold tracking-tighter text-white opacity-50 select-none"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 0.5, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    THE STACK
                </motion.h1>
            </header>

            {/* Toggle Switch */}
            <motion.div className="absolute right-6 md:right-10 z-50 top-10" layout>
                <TrackToggle activeTrack={activeTrack} onChange={onTrackChange} />
            </motion.div>

            {/* Content Area */}
            <div className="flex-1 w-full max-w-6xl mx-auto relative z-10 flex flex-col items-center justify-center pt-24 md:pt-32">

                {/* Section Title */}
                <motion.div
                    key={`${activeTrack}-title`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mb-16 text-center"
                >
                    {activeTrack === 'LOGIC' ? (
                        <div className="font-mono">
                            <h2 className="text-4xl md:text-6xl font-bold mb-2 text-white">SYSTEM MANIFEST</h2>
                            <p className="text-green-500 text-sm tracking-widest uppercase">&gt; Initializing Dependencies...</p>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-4xl md:text-6xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white">
                                The Creative Palette
                            </h2>
                            <p className="text-gray-400 font-light tracking-wide">Tools for digital alchemy.</p>
                        </div>
                    )}
                </motion.div>

                {/* LOGIC MODE: Terminal Grid */}
                {activeTrack === 'LOGIC' && (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6 font-mono">
                        {LOGIC_TOOLS.map((tool, i) => (
                            <motion.div
                                key={tool.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="group flex items-baseline justify-between border-b border-gray-800 pb-2 hover:border-green-500/50 transition-colors cursor-crosshair"
                                onMouseEnter={() => setCursorText(tool.prof)}
                                onMouseLeave={() => setCursorText("")}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                        &gt;
                                    </span>
                                    <span className="text-gray-300 group-hover:text-white transition-colors text-lg">
                                        {tool.name}
                                    </span>
                                </div>
                                <span className="text-xs text-gray-600 group-hover:text-green-400 transition-colors">
                                    [{tool.cat}]
                                </span>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* DESIGN MODE: Bento Glass */}
                {activeTrack === 'DESIGN' && (
                    <div className="w-full flex flex-wrap justify-center gap-6">
                        {DESIGN_TOOLS.map((tool, i) => (
                            <motion.div
                                key={tool.name}
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: [0, -10, 0], // Floating animation
                                }}
                                transition={{
                                    delay: i * 0.1,
                                    y: {
                                        duration: 4 + i, // Varied float duration
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                }}
                                className="glass-panel p-8 rounded-[2rem] flex flex-col items-center justify-center gap-4 hover:bg-white/10 transition-colors group cursor-none min-w-[200px] md:min-w-[240px]"
                                // Organic Shape Logic
                                style={{
                                    borderRadius: i % 2 === 0 ? '2rem 1rem 2rem 1rem' : '1rem 2rem 1rem 2rem'
                                }}
                                onMouseEnter={() => setCursorText(tool.prof)}
                                onMouseLeave={() => setCursorText("")}
                                whileHover={{ scale: 1.05 }}
                            >
                                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-tr from-white to-gray-400 group-hover:from-white group-hover:to-white">
                                    {tool.name}
                                </h3>
                                <p className="text-xs tracking-widest text-gray-400 uppercase group-hover:text-purple-300 transition-colors">
                                    {tool.cat}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer / Navigation */}
            <motion.div
                className="mt-auto pt-12 pb-10 flex justify-center shrink-0 z-50 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <button
                    onClick={onNext}
                    className="group flex items-center gap-3 text-gray-500 hover:text-white transition-colors text-sm uppercase tracking-[0.2em] font-light"
                >
                    Conclusion
                    <span className="group-hover:translate-x-1 transition-transform text-lg">→</span>
                </button>
            </motion.div>

        </motion.div>
    );
}

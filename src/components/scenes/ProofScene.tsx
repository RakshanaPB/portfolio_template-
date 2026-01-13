import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import CaseStudyDisplay from '../CaseStudyDisplay';
import MethodologySection from '../MethodologySection';
import ScrollHint from '../ScrollHint';
import TrackToggle from '../TrackToggle';
import ProjectCard from '../ProjectCard';
import { LOGIC_PROJECTS, DESIGN_PROJECTS } from '../../data/projects';
import { useCursor } from '../../context/CursorContext';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollToPlugin);
}

interface ProofSceneProps {
    onReset: () => void;
    onNext: () => void;
    onBack: () => void;
    activeTrack: 'DESIGN' | 'LOGIC';
    onTrackChange: (track: 'DESIGN' | 'LOGIC') => void;
}

export default function ProofScene({ onReset, onNext, onBack, activeTrack, onTrackChange }: ProofSceneProps) {
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
    const [showScrollHint, setShowScrollHint] = useState(false);
    const { setCursorText } = useCursor();
    const containerRef = useRef<HTMLDivElement>(null);

    const projects = activeTrack === 'LOGIC' ? LOGIC_PROJECTS : DESIGN_PROJECTS;
    const selectedProject = projects.find(p => p.id === selectedProjectId);

    // Auto-Scroll Logic
    useEffect(() => {
        if (selectedProjectId) {
            gsap.to(window, {
                duration: 0.8,
                scrollTo: { y: "#case-study-section", autoKill: false, offsetY: 50 },
                ease: "power2.inOut"
            });
        }
    }, [selectedProjectId]);

    // Conditional Scroll Hint Logic
    useEffect(() => {
        const checkScroll = () => {
            if (document.body.scrollHeight > window.innerHeight + 10) {
                setShowScrollHint(true);
            } else {
                setShowScrollHint(false);
            }
        };

        checkScroll();
        window.addEventListener('resize', checkScroll);
        // Check after layout updates
        const timer = setTimeout(checkScroll, 1000);

        return () => {
            window.removeEventListener('resize', checkScroll);
            clearTimeout(timer);
        };
    }, [activeTrack, selectedProjectId]);

    return (
        <motion.div
            ref={containerRef}
            className={`w-full h-full relative flex flex-col p-6 md:p-10 overflow-hidden transition-colors duration-700 ${activeTrack === 'DESIGN' ? 'bg-[#0a0a0a]' : 'bg-black'} overflow-y-auto`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Scanline Overlay - Logic Track Only */}
            {activeTrack === 'LOGIC' && (
                <div className="absolute inset-0 z-0 pointer-events-none opacity-10 fixed"
                    style={{
                        backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 2px, #00ff00 2px, #00ff00 4px)',
                        backgroundSize: '100% 4px'
                    }}
                >
                    <motion.div
                        className="w-full h-full bg-gradient-to-b from-transparent via-green-500/20 to-transparent"
                        animate={{ y: ['-100%', '100%'] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    />
                </div>
            )}

            {/* Noise Overlay - Design Track Only */}
            {activeTrack === 'DESIGN' && (
                <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-overlay fixed"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                />
            )}

            {/* Unified Header with Back Button Only */}
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
            </header>

            {/* Toggle Switch */}
            <motion.div className="absolute right-6 md:right-10 z-50 top-10" layout>
                <TrackToggle activeTrack={activeTrack} onChange={onTrackChange} />
            </motion.div>

            <div className="flex-1 flex flex-col items-center relative z-10 w-full max-w-7xl mx-auto pt-24 md:pt-20">

                {/* Section Title */}
                <motion.div
                    key={activeTrack}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-12 text-center"
                >
                    {activeTrack === 'LOGIC' ? (
                        <>
                            <h2 className="text-3xl md:text-5xl font-bold mb-2 text-white font-mono">System Architecture</h2>
                            <div className="h-1 w-20 bg-green-500 mx-auto mb-4" />
                            <p className="text-gray-400 font-mono text-sm">
                                &gt; Executing protocols... <span className="text-green-400">5 Modules Loaded</span>
                            </p>
                        </>
                    ) : (
                        <>
                            <h2 className="text-3xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                                Selected Works
                            </h2>
                            <div className="h-1 w-20 bg-purple-500 mx-auto mb-4" />
                            <p className="text-gray-400 font-light tracking-wide">
                                Curated experiences in interaction and motion.
                            </p>
                        </>
                    )}
                </motion.div>

                {/* 3+2 Grid Layout */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTrack}
                        className="grid grid-cols-1 md:grid-cols-6 gap-6 w-full mb-12"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                    >
                        {projects.map((project, index) => {
                            // Layout Logic:
                            // Index 0, 1, 2 -> Top Row (col-span-2)
                            // Index 3, 4 -> Bottom Row (col-span-2)
                            // Index 3 needs col-start-2 (to center pair)
                            // Index 4 needs col-start-4 (to center pair)

                            let gridClass = "md:col-span-2";
                            if (index === 3) gridClass += " md:col-start-2";
                            if (index === 4) gridClass += " md:col-start-4 lg:col-start-4"; // Explicitly ensure alignment

                            return (
                                <div key={project.id} className={`${gridClass} w-full`}>
                                    <ProjectCard
                                        project={project}
                                        activeTrack={activeTrack}
                                        onClick={setSelectedProjectId}
                                        index={index}
                                        isSelected={selectedProjectId === project.id}
                                    />
                                </div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>

                {/* Inline Case Study Section */}
                <div id="case-study-section" className="w-full min-h-[300px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {selectedProject ? (
                            <CaseStudyDisplay
                                key={selectedProject.id}
                                project={selectedProject}
                                activeTrack={activeTrack}
                                onClose={() => setSelectedProjectId(null)}
                            />
                        ) : (
                            // Placeholder State
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center text-gray-800 font-bold text-6xl uppercase tracking-tighter opacity-10 select-none py-20"
                            >
                                Select a Protocol
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>





            </div>

            <MethodologySection activeTrack={activeTrack} />

            <motion.div
                layout
                className="mt-12 mb-20 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                <button
                    onClick={onNext}
                    className="group flex items-center gap-3 text-gray-500 hover:text-white transition-colors text-sm uppercase tracking-[0.2em] font-light"
                >
                    NEXT PHASE
                    <span className="group-hover:translate-x-1 transition-transform text-lg">→</span>
                </button>

            </motion.div>

            {showScrollHint && <ScrollHint />}
        </motion.div>
    );
}


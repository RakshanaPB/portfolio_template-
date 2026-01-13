'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from "react-icons/io5";
import { Project } from '../data/projects';
import { useCursor } from '../context/CursorContext';

interface CaseStudyDisplayProps {
    project: Project;
    activeTrack: 'DESIGN' | 'LOGIC';
    onClose: () => void;
}

export default function CaseStudyDisplay({ project, activeTrack, onClose }: CaseStudyDisplayProps) {
    const { setCursorText } = useCursor();
    const isLogic = activeTrack === 'LOGIC';

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0, height: 0, y: 50 },
        visible: { opacity: 1, height: 'auto', y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any } },
        exit: { opacity: 0, height: 0, y: 50, transition: { duration: 0.4 } }
    };

    const contentVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { delay: 0.3, duration: 0.5 } }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full relative overflow-hidden"
        >
            <AnimatePresence mode="wait">
                {isLogic ? (
                    // LOGIC TRACK: THE TERMINAL
                    <motion.div
                        key="logic-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full rounded-sm border border-green-900/30 bg-black/90 p-8 md:p-12 relative overflow-hidden font-mono"
                    >
                        {/* Blueprint Grid Background */}
                        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                            style={{ backgroundImage: 'linear-gradient(#00ff0033 1px, transparent 1px), linear-gradient(90deg, #00ff0033 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            onMouseEnter={() => setCursorText("Close")}
                            onMouseLeave={() => setCursorText("")}
                            className="absolute top-6 right-6 z-20 text-green-500 hover:text-green-400 text-3xl transition-colors"
                        >
                            <IoClose />
                        </button>

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
                            {/* Left Col: Header & Data */}
                            <div className="lg:col-span-5 flex flex-col justify-center">
                                <div className="text-xs font-bold tracking-[0.2em] mb-4 uppercase text-green-500">
                                    &gt; EXEC_PROTOCOL: {project.type}
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tighter">
                                    {project.title}
                                </h2>
                                <p className="text-gray-400 text-sm leading-relaxed mb-8 border-l-2 border-green-900 pl-4">
                                    {project.description}
                                </p>

                                {/* Terminal Data Table (Specific for Samurai/Assassin or General) */}
                                <div className="bg-green-950/20 border border-green-900/50 p-4 rounded text-xs text-green-300 font-mono">
                                    <div className="flex justify-between border-b border-green-900/50 pb-2 mb-2 opacity-50">
                                        <span>METRIC</span>
                                        <span>VALUE</span>
                                    </div>
                                    <div className="flex justify-between py-1">
                                        <span>Performance Impact</span>
                                        <span className="font-bold">{project.metrics.value}</span>
                                    </div>
                                    <div className="flex justify-between py-1">
                                        <span>Optimization Target</span>
                                        <span>{project.metrics.label}</span>
                                    </div>
                                    <div className="flex justify-between py-1">
                                        <span>System Load</span>
                                        <span>NOMINAL</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Col: Comparison / Schematics */}
                            <div className="lg:col-span-7 bg-black border border-green-900/30 rounded p-6 relative">
                                <div className="absolute top-0 left-0 bg-green-900/20 text-green-500 text-[10px] px-2 py-1 uppercase tracking-widest">
                                    System Diagnostics
                                </div>

                                {project.id === 'samurai' || project.id === 'assassin' ? (
                                    <div className="h-full flex flex-col justify-center gap-6 mt-6">
                                        {/* Comparison Visualization */}
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                                    <span>Legacy Model (R)</span>
                                                    <span>14s Execution</span>
                                                </div>
                                                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                                    <div className="h-full bg-red-900/50 w-[80%]" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-xs text-green-400 mb-1">
                                                    <span>Optimized Agent (Python)</span>
                                                    <span>0.4s Execution</span>
                                                </div>
                                                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: '15%' }}
                                                        transition={{ duration: 1, delay: 0.5 }}
                                                        className="h-full bg-green-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center text-xs text-gray-600 mt-4">
                                            // 3400% EFFICIENCY GAIN CONFIRMED
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-full flex items-center justify-center text-green-900/50 text-6xl">
                                        {project.icon}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    // DESIGN TRACK: THE STUDIO
                    <motion.div
                        key="design-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full rounded-2xl bg-[#0f0f0f]/60 backdrop-blur-[30px] border border-white/10 p-8 md:p-12 relative overflow-hidden"
                    >
                        {/* Blob Background (Abstract) */}
                        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] animate-pulse pointer-events-none" />
                        <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            onMouseEnter={() => setCursorText("Close")}
                            onMouseLeave={() => setCursorText("")}
                            className="absolute top-6 right-6 z-20 text-white hover:text-gray-300 text-3xl transition-colors"
                        >
                            <IoClose />
                        </button>

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Left Col: Imagery */}
                            <div className="order-2 lg:order-1 relative rounded-xl overflow-hidden shadow-2xl aspect-video lg:aspect-square bg-gradient-to-br from-gray-800 to-black flex items-center justify-center group">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                <span className="text-9xl opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110">
                                    {project.icon}
                                </span>
                            </div>

                            {/* Right Col: Typography */}
                            <div className="order-1 lg:order-2 flex flex-col justify-center">
                                <motion.div variants={contentVariants} initial="hidden" animate="visible">
                                    <span className="text-sm font-light tracking-[0.2em] uppercase text-gray-400 mb-6 block">
                                        {project.type}
                                    </span>
                                    <h2 className="text-5xl md:text-7xl font-serif font-light mb-8 text-white leading-tight">
                                        {project.title}
                                    </h2>
                                    <p className="text-lg text-gray-300 font-sans font-light leading-relaxed mb-10 max-w-md">
                                        {project.description}
                                    </p>

                                    <div className="flex items-center gap-6">
                                        <div className="bg-white/5 backdrop-blur-md rounded-lg px-6 py-4 border border-white/10">
                                            <div className="text-3xl font-light text-white">{project.metrics.value}</div>
                                            <div className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">{project.metrics.label}</div>
                                        </div>
                                        <div className="w-px h-12 bg-white/10" />
                                        <div className="text-sm font-light text-gray-400 italic">
                                            "A masterclass in modern<br />digital aesthetics."
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

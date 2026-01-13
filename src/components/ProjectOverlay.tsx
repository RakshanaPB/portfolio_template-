'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";
import { Project } from '../data/projects';
import { useCursor } from '../context/CursorContext';

interface ProjectOverlayProps {
    project: Project;
    onClose: () => void;
}

export default function ProjectOverlay({ project, onClose }: ProjectOverlayProps) {
    const [showComparison, setShowComparison] = useState(false);
    const [comparisonKey, setComparisonKey] = useState(0);
    const { setCursorText } = useCursor();

    useEffect(() => {
        if (showComparison) {
            setComparisonKey(prev => prev + 1);
        }
    }, [showComparison]);

    return (
        <motion.div
            layoutId={`project-card-${project.id}`}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                onMouseEnter={() => setCursorText("Close")}
                onMouseLeave={() => setCursorText("")}
                className="absolute top-6 right-6 text-white text-4xl hover:rotate-90 transition-transform duration-500 z-[110] bg-white/10 rounded-full p-2 backdrop-blur-md"
            >
                <IoClose />
            </button>

            <motion.div
                className="w-full h-full max-h-[800px] max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >

                {/* Left Panel: The Story & Content */}
                <div className="flex flex-col h-full overflow-y-auto glass-panel p-8 rounded-2xl border border-white/10 relative z-10 bg-[#0f0f0f]/80">
                    <div className="flex items-center gap-4 mb-6">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl bg-gradient-to-br from-${project.accent}-500/20 to-transparent border border-${project.accent}-500/30`}>
                            {project.icon}
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white">{project.title}</h2>
                            <div className={`text-sm tracking-widest uppercase font-mono mt-1 text-${project.accent}-400`}>{project.type}</div>
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-2 text-white/90">Project Overview</h3>
                    <p className="text-gray-300 mb-8 leading-relaxed text-lg font-light">
                        {project.description}
                        <br /><br />
                        This project explores the boundaries of {project.type.toLowerCase()}, aiming to deliver {project.metrics.value} improvement in {project.metrics.label.toLowerCase()}.
                    </p>

                    {/* Dynamic Content Placeholder or Specific Content */}
                    <div className="bg-[#1e1e1e] rounded-lg p-6 font-mono text-sm text-gray-300 border border-white/5 shadow-inner mt-auto">
                        <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                            <span className="text-gray-500">System Metrics</span>
                            <span className={`text-${project.accent}-400 font-bold`}>LIVE</span>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span>Performance</span>
                                <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <div className={`h-full bg-${project.accent}-500 w-[90%]`}></div>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <span>Complexity</span>
                                <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <div className={`h-full bg-${project.accent}-500 w-[60%]`}></div>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <span>Innovation</span>
                                <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <div className={`h-full bg-${project.accent}-500 w-[85%]`}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Visual Context / Interactive Element */}
                <div className="flex flex-col h-full bg-[#0a0a0a] rounded-2xl border border-white/10 p-8 relative overflow-hidden flex items-center justify-center">

                    {/* Background Decor */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-${project.accent}-900/20 to-transparent opacity-50`} />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

                    {/* Central Icon / Graphic */}
                    <motion.div
                        className={`w-48 h-48 rounded- full border-4 border-${project.accent}-500/30 flex items-center justify-center text-8xl shadow-[0_0_100px_rgba(255,255,255,0.1)]`}
                        animate={{
                            boxShadow: [`0 0 20px rgba(var(--tw-colors-${project.accent}-500), 0.2)`, `0 0 60px rgba(var(--tw-colors-${project.accent}-500), 0.6)`, `0 0 20px rgba(var(--tw-colors-${project.accent}-500), 0.2)`],
                            scale: [1, 1.05, 1]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                    >
                        {project.icon}
                    </motion.div>

                    <div className="absolute bottom-8 left-8 right-8">
                        <div className="flex justify-between items-end">
                            <div>
                                <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">Impact</div>
                                <div className="text-4xl font-bold text-white">{project.metrics.value}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">Domain</div>
                                <div className="text-xl font-bold text-white">{project.metrics.label}</div>
                            </div>
                        </div>
                    </div>
                </div>

            </motion.div>
        </motion.div>
    );
}

'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";
import { Project } from '../data/projects';
import { useCursor } from '../context/CursorContext';

interface InlineCaseStudyProps {
    project: Project;
    activeTrack: 'DESIGN' | 'LOGIC';
    onClose: () => void;
}

export default function InlineCaseStudy({ project, activeTrack, onClose }: InlineCaseStudyProps) {
    const { setCursorText } = useCursor();
    const isLogic = activeTrack === 'LOGIC';

    return (
        <motion.div
            initial={{ opacity: 0, height: 0, y: 50 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: 50 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative overflow-hidden"
        >
            <div className={`w-full rounded-3xl overflow-hidden relative border ${isLogic ? 'border-green-900/30 bg-black/80' : 'border-white/10 bg-[#0f0f0f]/80 glass-panel'}`}>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    onMouseEnter={() => setCursorText("Close")}
                    onMouseLeave={() => setCursorText("")}
                    className={`absolute top-6 right-6 z-20 ${isLogic ? 'text-green-500 hover:text-green-400' : 'text-white hover:text-gray-300'} text-3xl transition-colors`}
                >
                    <IoClose />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8">

                    {/* Visual Side */}
                    <div className={`h-[300px] lg:h-auto relative overflow-hidden flex items-center justify-center p-10 ${isLogic ? 'bg-gray-900/20' : 'bg-gradient-to-br from-white/5 to-transparent'}`}>
                        {/* Background Decor */}
                        <div className={`absolute inset-0 opacity-30 ${isLogic ? 'bg-[url("/grid-pattern.svg")]' : 'noise-bg'}`} />

                        <motion.div
                            key={project.id}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className={`w-40 h-40 lg:w-64 lg:h-64 rounded-full flex items-center justify-center text-8xl lg:text-9xl border-4 ${isLogic ? `border-${project.accent}-500/30 text-${project.accent}-500` : `border-${project.accent}-500/20 text-white shadow-2xl`}`}
                        >
                            {project.icon}
                        </motion.div>
                    </div>

                    {/* Content Side */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className={`text-xs font-bold tracking-[0.2em] mb-4 uppercase ${isLogic ? `text-${project.accent}-500 font-mono` : 'text-gray-400'}`}>
                                {project.type}
                            </div>

                            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isLogic ? 'text-white font-mono' : 'text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400'}`}>
                                {project.title}
                            </h2>

                            <p className={`text-lg leading-relaxed mb-8 ${isLogic ? 'text-gray-400 font-mono text-sm' : 'text-gray-300 font-light'}`}>
                                {project.description}
                                <br /><br />
                                This project represents a deep dive into {project.type.toLowerCase()}, focusing on delivering measurable impact through {project.metrics.label.toLowerCase()} optimization.
                            </p>

                            {/* Metrics Grid */}
                            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/5">
                                <div>
                                    <div className={`text-3xl font-bold mb-1 ${isLogic ? `text-${project.accent}-400` : 'text-white'}`}>
                                        {project.metrics.value}
                                    </div>
                                    <div className="text-xs text-gray-500 uppercase tracking-widest">
                                        {project.metrics.label}
                                    </div>
                                </div>
                                <div>
                                    <div className={`text-3xl font-bold mb-1 ${isLogic ? `text-${project.accent}-400` : 'text-white'}`}>
                                        2025
                                    </div>
                                    <div className="text-xs text-gray-500 uppercase tracking-widest">
                                        Year
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

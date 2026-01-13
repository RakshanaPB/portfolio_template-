'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TrackToggle from '../TrackToggle';

interface CoreSceneProps {
    onNext: () => void;
    onBack: () => void;
    activeTrack: 'DESIGN' | 'LOGIC';
    onTrackChange: (track: 'DESIGN' | 'LOGIC') => void;
}

export default function CoreScene({ onNext, onBack, activeTrack, onTrackChange }: CoreSceneProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleNext = () => {
        onNext();
    };

    return (
        <motion.div
            ref={containerRef}
            className={`w-full min-h-screen relative flex flex-col p-4 md:p-10 transition-colors ${activeTrack === 'DESIGN' ? 'bg-[#0a0a0a]' : 'bg-[#000]'}`}
            style={{ transitionDuration: '800ms', transitionTimingFunction: 'linear' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Custom Header with Back Button */}
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

            {/* Main Content Area */}
            <div className="flex-grow flex flex-col items-center justify-center relative mt-32 mb-10 md:mt-0 md:mb-0">

                {/* Toggle Switch */}
                <div className="mt-10 mb-8 md:mt-0 md:mb-12">
                    <TrackToggle activeTrack={activeTrack} onChange={onTrackChange} />
                </div>

                {/* Content Container */}
                <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

                    {/* Visuals Column */}
                    <div className="relative h-[400px] w-full flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            {activeTrack === 'DESIGN' ? (
                                <motion.div
                                    key="design-blob"
                                    initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
                                    animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                                    exit={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
                                    className="absolute inset-0"
                                >
                                    {/* Organic Shapes */}
                                    <div className="w-full h-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 rounded-full blur-3xl opacity-30 animate-pulse" />
                                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400 rounded-full blur-2xl opacity-40 mix-blend-screen" />
                                    {/* Glass Card Mockup */}
                                    <div className="absolute inset-0 m-auto w-64 h-80 glass-panel rounded-2xl border border-white/20 flex flex-col p-6 rotate-[-6deg] hover:rotate-0 transition-transform duration-500">
                                        <div className="w-12 h-12 rounded-full bg-white/20 mb-4" />
                                        <div className="w-full h-4 rounded bg-white/20 mb-2" />
                                        <div className="w-2/3 h-4 rounded bg-white/10" />
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="logic-grid"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="w-full h-full border border-green-500/20 rounded-lg relative overflow-hidden bg-black/50"
                                >
                                    {/* Grid Lines */}
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />

                                    {/* Code Snippet */}
                                    <div className="absolute inset-0 p-6 font-mono text-xs text-green-400 overflow-hidden opacity-80">
                                        <p className="mb-2"><span className="text-pink-500">def</span> <span className="text-yellow-300">convert_model</span>(r_script):</p>
                                        <p className="pl-4 text-gray-500"># Transforming legacy R logic</p>
                                        <p className="pl-4 mb-2">python_model = <span className="text-blue-400">Model</span>()</p>
                                        <p className="pl-4 mb-2"><span className="text-pink-500">for</span> line <span className="text-pink-500">in</span> r_script:</p>
                                        <p className="pl-8 text-gray-500"># Optimizing for speed</p>
                                        <p className="pl-8">python_model.optimize(line)</p>
                                        <p className="pl-4"><span className="text-pink-500">return</span> python_model.deploy()</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Text Column */}
                    <div className="text-left z-10">
                        <motion.h2
                            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            Designer by Choice.<br />
                            <span className={activeTrack === 'DESIGN' ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600' : 'text-green-400 font-mono'}>
                                Engineer by Foundation.
                            </span>
                        </motion.h2>
                        <motion.p
                            className="text-gray-400 text-lg leading-relaxed mb-8"
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            I am a UI/UX designer focused on making complex systems feel simple. Currently, I'm taking high-level data models and turning them into fluid, interactive experiences.
                        </motion.p>

                        <button
                            onClick={handleNext}
                            className="group flex items-center gap-2 text-white font-semibold hover:gap-4 transition-all mt-2"
                        >
                            The Proof
                            <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    </div>

                </div>

            </div>
        </motion.div>
    );
}

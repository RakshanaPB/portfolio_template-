'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useCursor } from '../context/CursorContext';

interface MethodologySectionProps {
    activeTrack: 'DESIGN' | 'LOGIC';
}

export default function MethodologySection({ activeTrack }: MethodologySectionProps) {
    const { setCursorText } = useCursor();
    const [activeStep, setActiveStep] = useState<number | null>(null);
    const detailRef = useRef<HTMLDivElement>(null);
    const isLogic = activeTrack === 'LOGIC';

    const handleStepClick = (index: number) => {
        // Toggle: if clicking active, close it; otherwise open new
        const newStep = activeStep === index ? null : index;
        setActiveStep(newStep);

        if (newStep !== null) {
            // Wait for slight DOM expansion then scroll active details into view
            setTimeout(() => {
                if (detailRef.current) {
                    gsap.to(window, {
                        duration: 0.8,
                        scrollTo: { y: detailRef.current, offsetY: 150, autoKill: false },
                        ease: "power2.inOut"
                    });
                }
            }, 100);
        }
    };

    const steps = isLogic ? [
        {
            title: "PHASE 1: ANALYSIS",
            subtitle: "Identifying Bottlenecks",
            desc: "Deconstructing legacy R code to find performance choke points.",
            details: (
                <div className="font-mono text-sm text-green-400 space-y-4">
                    <div className="p-4 border border-green-900/50 bg-black rounded">
                        <div className="opacity-50 mb-2">// LEGACY_AUDIT.R</div>
                        <div className="text-red-400">- execute_turn() # 1400ms avg latency</div>
                        <div className="text-red-400">- stochastic_path() # O(n^2) complexity</div>
                        <div className="text-green-400">+ VECTORIZATION_REQUIRED = TRUE</div>
                    </div>
                    <p className="text-gray-400">
                        Analysis revealed that the R-based agent relied on iterative loop structures for pathfinding.
                        By shifting to NumPy vector operations, we identified a theoretical 50x speedup.
                    </p>
                </div>
            )
        },
        {
            title: "PHASE 2: MAPPING",
            subtitle: "Logic Translation",
            desc: "Rewriting stochastic algorithms into vectorized Python structures.",
            details: (
                <div className="font-mono text-sm text-blue-300 space-y-4">
                    <div className="p-4 border border-blue-900/50 bg-black rounded">
                        <div className="opacity-50 mb-2"># LOGIC_CORE.PY</div>
                        <div>def calculate_vectors(grid):</div>
                        <div className="pl-4 text-gray-500">"""Transforming state matrix"""</div>
                        <div className="pl-4">return np.dot(grid, weights.T)</div>
                    </div>
                    <p className="text-gray-400">
                        Direct logic mapping ensured that the "Samurai's" defensive behavior remained mathematically identical
                        while leveraging pre-compiled C binaries via Python libraries.
                    </p>
                </div>
            )
        },
        {
            title: "PHASE 3: OPTIMIZATION",
            subtitle: "The Assassin's Blade",
            desc: "Executing iteratively to reduce runtime from 14s to 0.4s.",
            details: (
                <div className="font-mono text-sm text-green-400 grid grid-cols-2 gap-4">
                    <div className="p-4 border border-green-900/50 bg-green-900/10 rounded text-center">
                        <div className="text-2xl font-bold">14.2s</div>
                        <div className="text-[10px] uppercase opacity-70">Legacy Runtime</div>
                    </div>
                    <div className="p-4 border border-green-500/50 bg-green-900/20 rounded text-center shadow-[0_0_15px_rgba(0,255,0,0.2)]">
                        <div className="text-2xl font-bold text-white">0.4s</div>
                        <div className="text-[10px] uppercase opacity-70">Optimized Runtime</div>
                    </div>
                    <div className="col-span-2 text-gray-400 mt-2">
                        &gt; SYSTEM_STATUS: <span className="text-green-400">OPTIMIZED</span>
                    </div>
                </div>
            )
        }
    ] : [
        {
            title: "Empathy & Research",
            subtitle: "Finding the Aura",
            desc: "Defining the mood, color palette, and emotional resonance.",
            details: (
                <div className="font-serif text-gray-300 space-y-6">
                    <div className="text-2xl italic text-purple-200">"The digital soul."</div>
                    <p>
                        We started by mapping the "Aura" — finding a color spectrum that felt both
                        electric (Neon) and grounded (Dark Mode). The 'Samurai Blue' represents focus,
                        while the 'Assassin Red' represents urgency.
                    </p>
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-600 shadow-lg ring-2 ring-white/10"></div>
                        <div className="w-12 h-12 rounded-full bg-purple-600 shadow-lg ring-2 ring-white/10"></div>
                        <div className="w-12 h-12 rounded-full bg-red-600 shadow-lg ring-2 ring-white/10"></div>
                    </div>
                </div>
            )
        },
        {
            title: "Prototyping",
            subtitle: "Shape & Motion",
            desc: "Iterating on fluid forms and high-fidelity interaction models.",
            details: (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-video bg-white/5 rounded backdrop-blur-md border border-white/10 flex items-center justify-center">
                            <span className="text-xs uppercase tracking-widest text-gray-500">Wireframe</span>
                        </div>
                        <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded backdrop-blur-md border border-white/20 shadow-xl flex items-center justify-center">
                            <span className="text-xs uppercase tracking-widest text-white">High-Fi</span>
                        </div>
                    </div>
                    <p className="font-light text-gray-300">
                        Moving from static wireframes to "Bento-Glass" layouts allowed us to test
                        how light and blur interact with the user's scroll depth.
                    </p>
                </div>
            )
        },
        {
            title: "Refinement",
            subtitle: "The Polish",
            desc: "Micro-interactions that make the digital feel organic.",
            details: (
                <div className="font-sans text-gray-300 space-y-4">
                    <div className="p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                        <h4 className="text-lg font-serif italic text-white mb-2">The Ghost Cursor</h4>
                        <p className="text-sm font-light">
                            Added a lag-based mapping to the custom cursor to simulate "weight",
                            making every hover interaction feel intentional and substantial.
                        </p>
                    </div>
                </div>
            )
        }
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`w-full max-w-7xl mx-auto py-24 px-6 md:px-0 relative mb-12 rounded-3xl overflow-hidden mt-32 transition-colors duration-700 ${isLogic ? 'bg-black/80 border border-green-900/30' : 'bg-white/5 border border-white/10 backdrop-blur-xl'}`}
            onMouseEnter={() => setCursorText("VIEW DETAILS")}
            onMouseLeave={() => setCursorText("")}
        >
            {/* Background Decor */}
            {isLogic && (
                <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />
            )}

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTrack}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10"
                >
                    <div className="text-center mb-16">
                        <span className={`text-xs font-bold tracking-[0.3em] uppercase ${isLogic ? 'text-green-500 font-mono' : 'text-purple-400 font-sans'}`}>
                            Methodology
                        </span>
                        <h2 className={`text-4xl md:text-5xl font-bold mt-4 ${isLogic ? 'text-white font-mono tracking-tighter' : 'text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 font-serif italic'}`}>
                            {isLogic ? "THE BLUEPRINT" : "The Creative Studio"}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative px-4 md:px-12">
                        {/* Connecting Line (Desktop) */}
                        <div className={`hidden md:block absolute top-[24px] left-12 right-12 h-px ${isLogic ? 'bg-green-900' : 'bg-white/10'}`} />

                        {steps.map((step, index) => (
                            <div
                                key={index}
                                onClick={() => handleStepClick(index)}
                                className={`relative flex flex-col items-center text-center group cursor-pointer`}
                            >
                                {/* Node Point */}
                                <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center text-sm font-bold bg-[#0a0a0a] z-10 mb-6 transition-all duration-300
                                    ${isLogic
                                        ? `border-green-900 text-green-500 group-hover:border-green-500 group-hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] ${activeStep === index ? 'bg-green-900/20 border-green-400 shadow-[0_0_25px_rgba(0,255,0,0.5)] scale-110' : ''}`
                                        : `border-white/10 text-white group-hover:border-purple-400 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] ${activeStep === index ? 'bg-purple-900/20 border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.5)] scale-110' : ''}`
                                    }`}
                                >
                                    {index + 1}
                                </div>

                                <h3 className={`text-xl font-bold mb-2 transition-colors ${activeStep === index ? (isLogic ? 'text-green-400' : 'text-purple-300') : (isLogic ? 'text-white' : 'text-white')} ${isLogic ? 'font-mono' : 'font-serif'}`}>
                                    {step.title}
                                </h3>
                                <div className={`text-xs uppercase tracking-widest mb-4 ${isLogic ? 'text-green-600' : 'text-purple-400'}`}>
                                    {step.subtitle}
                                </div>
                                <p className={`text-sm leading-relaxed max-w-xs ${isLogic ? 'text-gray-500 font-mono' : 'text-gray-300 font-light'}`}>
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Rich Detail Area (Accordion) */}
                    <AnimatePresence mode="wait">
                        {activeStep !== null && (
                            <motion.div
                                key={activeStep}
                                layout
                                ref={detailRef}
                                initial={{ opacity: 0, y: 10, height: 0 }}
                                animate={{ opacity: 1, y: 0, height: "auto" }}
                                exit={{ opacity: 0, y: -10, height: 0 }}
                                transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
                                className="w-full px-4 md:px-12 mt-12 overflow-hidden"
                            >
                                <div className={`w-full p-8 md:p-12 rounded-2xl relative border ${isLogic ? 'bg-green-950/10 border-green-500/30' : 'bg-white/5 border-white/10 backdrop-blur-md'}`}>
                                    {/* Decor Line */}
                                    <div className={`absolute top-0 left-0 w-1 h-full ${isLogic ? 'bg-green-500' : 'bg-purple-500'}`} />

                                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                                        <div className="md:w-1/3">
                                            <div className={`text-sm uppercase tracking-widest mb-2 ${isLogic ? 'text-green-500' : 'text-purple-400'}`}>Deep Dive</div>
                                            <h3 className={`text-3xl font-bold mb-4 ${isLogic ? 'text-white font-mono' : 'text-white font-serif'}`}>
                                                {steps[activeStep].title}
                                            </h3>
                                            <p className="text-gray-400 text-sm leading-relaxed">
                                                Additional context regarding this phase.
                                                {isLogic ? " Technical specifications and logic gates." : " Design rationale and aesthetic choices."}
                                            </p>
                                        </div>
                                        <div className="md:w-2/3 w-full">
                                            {steps[activeStep].details}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </motion.div>
            </AnimatePresence>
        </motion.section>
    );
}

'use client';
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export default function PerformanceDuel() {
    const rBarRef = useRef<HTMLDivElement>(null);
    const pyBarRef = useRef<HTMLDivElement>(null);
    const noveltyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // GSAP Sequences
        const ctx = gsap.context(() => {

            // Metric 1: Latency Slash
            const tl = gsap.timeline({ delay: 0.5 });

            // R fills slowly
            tl.to(rBarRef.current, {
                width: '100%',
                duration: 2.5,
                ease: "power1.inOut"
            })
                // Python slashes
                .to(pyBarRef.current, {
                    width: '40%',
                    duration: 0.4,
                    ease: "power4.out" // High velocity
                }, "-=1.0"); // Start before R finishes

            // Novelty Float (Yoyo)
            gsap.to(noveltyRef.current, {
                y: -10,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

        });

        return () => ctx.revert();
    }, []);

    // Metric 2: Radial Progress using SVG
    const radius = 40;
    const circumference = 2 * Math.PI * radius;

    return (
        <div className="w-full max-w-5xl mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 px-4">

            {/* Metric 1: Processing Latency */}
            <div className="glass-panel p-8 rounded-2xl relative overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10">
                <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-6">Processing Latency</h3>

                <div className="space-y-6">
                    {/* R Baseline */}
                    <div>
                        <div className="flex justify-between text-xs mb-2">
                            <span className="text-crimson-400 font-bold">R (Baseline)</span>
                            <span className="text-gray-500">100% Load</span>
                        </div>
                        <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                            <div ref={rBarRef} className="h-full bg-red-500/50 w-0" />
                        </div>
                    </div>

                    {/* Python Optimized */}
                    <div>
                        <div className="flex justify-between text-xs mb-2">
                            <span className="text-blue-400 font-bold">Python (Optimized)</span>
                            <span className="text-white">40% Load</span>
                        </div>
                        <div className="h-4 bg-gray-800 rounded-full overflow-hidden shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                            <div ref={pyBarRef} className="h-full bg-blue-500 w-0" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Metric 2: Predictive Precision */}
            <div className="glass-panel p-8 rounded-2xl relative flex flex-col items-center justify-center backdrop-blur-xl bg-white/5 border border-white/10">
                <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-6 absolute top-8 left-8">Predictive Precision</h3>

                <div className="relative w-48 h-48 flex items-center justify-center">
                    {/* Novelty Tag */}
                    <div
                        ref={noveltyRef}
                        className="absolute -top-6 -right-6 bg-white text-black text-[10px] font-bold px-3 py-1 rounded-full shadow-lg z-20"
                    >
                        Novelty: Integrated Feature Engineering
                    </div>

                    <svg className="w-full h-full rotate-[-90deg]">
                        {/* Track */}
                        <circle
                            cx="50%" cy="50%" r={radius}
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="8"
                            fill="transparent"
                        />
                        {/* Progress */}
                        <motion.circle
                            cx="50%" cy="50%" r={radius}
                            stroke="#3b82f6" // Electric Blue
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset: circumference - (0.98 * circumference) }}
                            transition={{
                                type: "spring",
                                stiffness: 50, // Heavy Spring
                                damping: 15,
                                delay: 0.5
                            }}
                            strokeLinecap="round"
                            style={{ filter: "drop-shadow(0 0 8px rgba(59,130,246,0.6))" }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-4xl font-bold text-white">98%</span>
                        <span className="text-xs text-blue-400">Accuracy</span>
                    </div>
                </div>
            </div>

        </div>
    );
}

'use client';
import { motion } from 'framer-motion';

interface AboutMeSceneProps {
    onNext: () => void;
    onBack: () => void;
    activeTrack: 'DESIGN' | 'LOGIC';
    onTrackChange: (track: 'DESIGN' | 'LOGIC') => void;
}

export default function AboutMeScene({ onNext, onBack }: AboutMeSceneProps) {

    return (
        <motion.div
            className="w-full min-h-screen relative flex flex-col overflow-x-hidden bg-black text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* 1. BACKGROUND ATMOSPHERE (Morphic Blobs) */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden fixed">
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-teal-900/5 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        x: [0, -50, 0],
                        y: [0, 100, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-900/5 rounded-full blur-[150px]"
                />
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
                    className="absolute top-[30%] left-[40%] w-[40vw] h-[40vw] bg-fuchsia-900/5 rounded-full blur-[100px]"
                />
            </div>


            {/* 3. HEADER */}
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
                <h2 className="text-sm font-mono tracking-widest text-white/40 uppercase">
                    ID VERIFICATION
                </h2>
            </header>

            {/* 4. MAIN CONTENT GRID */}
            <div className="flex-1 w-full max-w-[90vw] mx-auto z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center justify-center relative mt-32 mb-10 md:mt-0 md:mb-0">

                {/* LEFT: LIQUID PORTRAIT */}
                <div className="w-full h-full flex items-center justify-center relative p-4">
                    <motion.div
                        className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] max-w-[80vw] max-h-[80vw]"
                        animate={{
                            y: [-20, 20, -20],
                            rotate: [-1, 1, -1]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        {/* Blob SVG Mask Definition */}
                        <svg className="absolute w-0 h-0">
                            <defs>
                                <clipPath id="blob-mask" clipPathUnits="objectBoundingBox">
                                    <path d="M0.38,0.05 C0.5,0.01,0.65,0.02,0.75,0.11 C0.89,0.22,0.96,0.41,0.91,0.58 C0.86,0.75,0.71,0.92,0.54,0.96 C0.37,0.99,0.21,0.85,0.11,0.72 C0.01,0.57,-0.04,0.36,0.05,0.21 C0.13,0.08,0.25,0.08,0.38,0.05 Z" />
                                </clipPath>
                            </defs>
                        </svg>

                        {/* Image Container with Clip Path */}
                        <div
                            className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-500 relative overflow-hidden"
                            style={{ clipPath: 'url(#blob-mask)' }}
                        >
                            {/* PLACEHOLDER: Replace this div/img with your actual Next.js Image */}
                            <div className="w-full h-full object-cover opacity-80 mix-blend-overlay bg-noise" />
                            {/* <Image src="/your-portrait.jpg" fill alt="Portrait" className="object-cover" /> */}
                        </div>

                        {/* Decorative Rings around blob */}
                        <div className="absolute inset-[-20px] border border-white/10 rounded-full blur-xl animate-pulse" style={{ clipPath: 'url(#blob-mask)', transform: 'scale(1.1)' }} />
                    </motion.div>
                </div>

                {/* RIGHT: TYPOGRAPHY */}
                <div className="flex flex-col justify-center text-left space-y-8 max-w-xl mx-auto lg:mx-0 p-4">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h3 className="text-6xl md:text-8xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mb-2">
                            Hello.
                        </h3>
                        <p className="text-xl md:text-2xl text-purple-200 font-light">
                            I am Raks.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-6"
                    >
                        <div className="h-px w-24 bg-gradient-to-r from-green-500 to-transparent" />

                        <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light">
                            A Creative Technologist and Machine Learning Researcher. I bridge the gap between aesthetic beauty and technical rigour, specializing in <span className="text-white font-medium">Reinforcement Learning</span> and the optimization of PPO agents.
                        </p>

                        <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                            My mission is to push benchmarks, moving beyond standard accuracy to reach peak model performance.
                        </p>
                    </motion.div>
                </div>

            </div>

            {/* 5. FOOTER NAVIGATION */}
            <div className="w-full flex justify-center z-50 mt-auto pb-10 shrink-0">
                <button
                    onClick={onNext}
                    className="group flex items-center gap-3 text-white/50 hover:text-white transition-colors duration-500 uppercase tracking-[0.3em] text-xs"
                >
                    NEXT PHASE
                    <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                </button>
            </div>

        </motion.div>
    );
}

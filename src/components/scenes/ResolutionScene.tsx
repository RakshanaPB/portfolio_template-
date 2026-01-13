'use client';
import { useRef, useState, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import useSound from '../../hooks/useSound';
import { useCursorText } from '../../context/CursorContext';
import { FaLinkedin, FaGithub, FaBehance } from 'react-icons/fa';

interface ResolutionSceneProps {
    onReset: () => void;
}

export default function ResolutionScene({ onReset }: ResolutionSceneProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [emailCopied, setEmailCopied] = useState(false);

    // Set dynamic cursor text
    useCursorText("Get in Touch");

    const playPop = useSound('pop');

    const socials = [
        { name: "LinkedIn", url: "https://linkedin.com", icon: <FaLinkedin /> },
        { name: "GitHub", url: "https://github.com", icon: <FaGithub /> },
        { name: "Behance", url: "https://behance.net", icon: <FaBehance /> }
    ];

    // Magnetic Button Logic
    useLayoutEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = button.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const dx = e.clientX - centerX;
            const dy = e.clientY - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 150) {
                gsap.to(button, {
                    x: dx * 0.4,
                    y: dy * 0.4,
                    duration: 0.5,
                    ease: "power2.out"
                });
            } else {
                gsap.to(button, {
                    x: 0,
                    y: 0,
                    duration: 0.8,
                    ease: "elastic.out(1, 0.3)"
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("hello@yoursite.com");
        setEmailCopied(true);
        playPop();
        setTimeout(() => setEmailCopied(false), 2000);
    };

    // Hardened layout with explicit visibility and spring physics
    return (
        <motion.div
            ref={containerRef}
            className="flex flex-col items-center justify-center min-h-screen w-full bg-[#0a0a0a] text-white opacity-100 visible overflow-hidden relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            {/* Ambient Fixed Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-20 z-0" />

            {/* Main Content Container */}
            <div className="relative z-10 flex flex-col items-center gap-8 px-4 max-w-4xl w-full text-center">

                {/* Headline - using Spring physics instead of back.out string */}
                <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-2"
                >
                    Let's Build Something Better.
                </motion.h1>

                {/* Sub-headline */}
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mb-12"
                >
                    Fusing model logic with intuitive design.
                </motion.p>

                {/* Hero Button - Magnetic CTA */}
                <div className="relative h-[120px] w-full flex justify-center items-center">
                    <motion.button
                        ref={buttonRef}
                        onClick={handleCopyEmail}
                        className="relative group px-12 py-6 rounded-full border-2 border-white text-white font-semibold text-xl bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black hover:border-transparent hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                        style={{
                            zIndex: 999,
                            minWidth: '220px',
                            minHeight: '70px',
                            cursor: 'pointer'
                        }}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, type: "spring", bounce: 0.4 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {emailCopied ? "Email Copied!" : "Get in Touch"}
                    </motion.button>
                </div>

                {/* Social Icons */}
                <div className="flex gap-8 mt-12">
                    {socials.map((social, i) => (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noreferrer"
                            className="group flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-colors p-2"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.7 + (i * 0.1) }}
                                className="text-2xl"
                            >
                                {social.icon}
                            </motion.div>
                            {/* Small text label reveal */}
                            <div className="text-[10px] font-mono uppercase tracking-wider overflow-hidden h-[12px] flex opacity-0 group-hover:opacity-100 transition-opacity">
                                {social.name}
                            </div>
                        </a>
                    ))}
                </div>

            </div>

            {/* Reset / Navigation Back */}
            <motion.button
                onClick={onReset}
                className="absolute top-8 right-8 text-gray-600 hover:text-white transition-colors text-xs uppercase tracking-widest p-4"
                style={{ zIndex: 999 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                [ Restart Narrative ]
            </motion.button>
        </motion.div>
    );
}

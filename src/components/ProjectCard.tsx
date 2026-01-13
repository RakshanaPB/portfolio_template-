'use client';
import { motion } from 'framer-motion';
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { Project } from '../data/projects';

interface ProjectCardProps {
    project: Project;
    activeTrack: 'DESIGN' | 'LOGIC';
    onClick: (id: string) => void;
    index: number;
    isSelected: boolean;
}

export default function ProjectCard({ project, activeTrack, onClick, index, isSelected }: ProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Fix: Tilt Performance (Direct DOM)
    useLayoutEffect(() => {
        const card = cardRef.current;
        const content = contentRef.current;
        if (!card || !content) return;

        // GSAP QuickSetters for high performance updates
        const setRotateX = gsap.quickSetter(content, "rotateX", "deg");
        const setRotateY = gsap.quickSetter(content, "rotateY", "deg");

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // Calculate percentage (-0.5 to 0.5)
            const xPct = (mouseX / width) - 0.5;
            const yPct = (mouseY / height) - 0.5;

            // Calculate tilt degrees (limit to +/- 10)
            const tiltX = yPct * -20; // Inverted Y for X axis rotation
            const tiltY = xPct * 20;

            // Direct update for 0ms latency
            setRotateX(tiltX);
            setRotateY(tiltY);
        };

        const handleMouseLeave = () => {
            gsap.to(content, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: "power2.out",
                overwrite: 'auto'
            });
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const isLogic = activeTrack === 'LOGIC';

    return (
        <motion.div
            ref={cardRef}
            onClick={() => onClick(project.id)}
            className={`relative h-[320px] w-full cursor-pointer perspective-1000 ${isSelected ? 'z-20' : 'z-10'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
            style={{
                perspective: 1000,
                transformStyle: "preserve-3d"
            }}
        >
            <div
                ref={contentRef}
                className={`w-full h-full relative overflow-hidden transition-all duration-300 
                    ${isLogic ? 'rounded-sm border' : 'rounded-2xl shadow-xl'} 
                    ${isSelected
                        ? 'border-[#0070f3] shadow-[0_0_25px_rgba(0,112,243,0.6)] scale-[1.02]'
                        : (isLogic ? 'border-white/10' : 'border-transparent')
                    }`}
                style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    willChange: "transform"
                }}
            >
                {/* Background & Decor */}
                <div className={`absolute inset-0 z-0 transition-colors duration-500 ${isLogic ? 'bg-black' : 'bg-[#1a1a1a]'}`}>
                    {/* Logic: Grid Background */}
                    {isLogic && (
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle, ${project.accent} 1px, transparent 1px)`, backgroundSize: '16px 16px' }} />
                    )}
                    {/* Design: Gradient Mesh */}
                    {!isLogic && (
                        <div className={`absolute inset-0 bg-gradient-to-br from-${project.accent}-500/10 to-transparent opacity-50`} />
                    )}
                </div>

                {/* Content Container (Lifted in 3D) */}
                <div className="relative z-10 w-full h-full p-6 flex flex-col justify-between" style={{ transform: "translateZ(20px)" }}>

                    {/* Header */}
                    <div className="flex justify-between items-start">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${isLogic ? 'border border-gray-700 bg-gray-900' : 'bg-white/10 backdrop-blur-sm shadow-inner'}`}>
                            {project.icon}
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${isLogic ? 'bg-white/10 text-gray-300 font-mono' : 'bg-white/20 text-white'}`}>
                            {project.type}
                        </span>
                    </div>

                    {/* Body */}
                    <div className="mt-4">
                        <h3 className={`text-xl font-bold mb-2 ${isLogic ? 'font-mono text-white' : 'font-sans text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400'}`}>
                            {project.title}
                        </h3>
                        <p className={`text-sm leading-relaxed line-clamp-2 ${isLogic ? 'text-gray-500 font-mono' : 'text-gray-400 font-light'}`}>
                            {project.description}
                        </p>
                    </div>

                    {/* Footer / Metrics */}
                    <div className="pt-4 mt-auto border-t border-white/5 flex items-center gap-3">
                        <div className={`text-lg font-bold ${isLogic ? `text-${project.accent}-400` : `text-${project.accent}-400`}`}>
                            {project.metrics.value}
                        </div>
                        <div className="text-[10px] uppercase tracking-widest text-gray-600">
                            {project.metrics.label}
                        </div>
                    </div>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 z-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-t from-${project.accent}-500/10 to-transparent`} />

            </div>
        </motion.div>
    );
}

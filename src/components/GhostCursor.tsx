'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useCursor } from '../context/CursorContext';

export default function GhostCursor() {
    const [isMounted, setIsMounted] = useState(false);
    const { cursorText } = useCursor();
    const cursorRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const cursor = cursorRef.current;
        const textLabel = textRef.current;
        if (!cursor) return;

        // Initial Set
        gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 1, opacity: 1 });
        if (textLabel) gsap.set(textLabel, { xPercent: 10, yPercent: 10 });

        let idleTimer: NodeJS.Timeout;
        let isIdle = false;

        const startIdleAnimation = () => {
            if (isIdle) return;
            isIdle = true;
            gsap.to(cursor, {
                scale: 1.2, // Updated to 1.2 as requested
                duration: 0.8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                force3D: true
            });
        };

        const stopIdleAnimation = () => {
            if (!isIdle) return;
            isIdle = false;
            gsap.killTweensOf(cursor, "scale");
            gsap.to(cursor, {
                scale: 1,
                duration: 0.3,
                overwrite: true,
                force3D: true
            });
        };

        const resetIdleTimer = () => {
            if (isIdle) stopIdleAnimation();
            clearTimeout(idleTimer);
            idleTimer = setTimeout(startIdleAnimation, 500);
        };

        const moveCursor = (e: MouseEvent) => {
            resetIdleTimer();
            // Using translate3d for GPU acceleration
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                force3D: true,
                duration: 0.1,
                ease: "power2.out",
                overwrite: "auto"
            });

            if (textLabel) {
                gsap.to(textLabel, {
                    x: e.clientX,
                    y: e.clientY,
                    force3D: true,
                    duration: 0.15, // Slightly slower for follow effect
                    ease: "power2.out",
                    overwrite: "auto"
                });
            }
        };

        const handleHoverStart = (e: MouseEvent) => {
            resetIdleTimer();
            const target = e.target as HTMLElement;
            if (target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'a' || target.closest('button') || target.closest('a')) {
                gsap.to(cursor, {
                    scale: 4,
                    opacity: 0.5,
                    duration: 0.3,
                    overwrite: "auto",
                    force3D: true
                });
            }
        };

        const handleHoverEnd = () => {
            gsap.to(cursor, {
                scale: 1,
                opacity: 1,
                duration: 0.3,
                overwrite: "auto",
                force3D: true
            });
            resetIdleTimer();
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleHoverStart);
        window.addEventListener('mouseout', handleHoverEnd);

        // Start initial timer
        resetIdleTimer();

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleHoverStart);
            window.removeEventListener('mouseout', handleHoverEnd);
            clearTimeout(idleTimer);
        };
    }, [isMounted]);

    if (!isMounted) return null;

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-[10px] h-[10px] bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    WebkitFontSmoothing: 'antialiased',
                    transform: 'translate3d(0,0,0)'
                }}
            />
            <div
                ref={textRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] text-[10px] uppercase font-bold tracking-widest text-white mix-blend-difference whitespace-nowrap opacity-0"
                style={{
                    willChange: 'transform',
                    transform: 'translate3d(0,0,0)',
                    opacity: cursorText ? 1 : 0,
                    transition: 'opacity 0.3s ease'
                }}
            >
                {cursorText}
            </div>
        </>
    );
}

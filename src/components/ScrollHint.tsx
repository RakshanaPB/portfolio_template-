'use client';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

export default function ScrollHint() {
    const { scrollY } = useScroll();
    const [visible, setVisible] = useState(true);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50 && visible) {
            setVisible(false);
        } else if (latest <= 50 && !visible) {
            setVisible(true);
        }
    });

    return (
        <motion.div
            className="fixed bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.5 }}
        >
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Scroll to Explore</span>
            <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
                <motion.div
                    className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-white"
                    animate={{ y: ['-100%', '100%'] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                        repeatDelay: 0.5
                    }}
                />
            </div>
        </motion.div>
    );
}

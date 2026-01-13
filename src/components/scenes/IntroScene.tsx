'use client';
import { motion } from 'framer-motion';
import { Playfair_Display } from 'next/font/google';
import gsap from 'gsap';
import { useRef, useEffect } from 'react';
import useSound from '../../hooks/useSound';
import { useCursorText } from '../../context/CursorContext';

const playfair = Playfair_Display({ subsets: ['latin'] });

interface IntroSceneProps {
  onEnterStory: () => void;
  direction?: number;
}

export default function IntroScene({ onEnterStory, direction = 0 }: IntroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playPop = useSound('pop');

  // Set dynamic cursor text for this scene
  useCursorText("Click to Enter");

  const handleEnter = () => {
    playPop();
    onEnterStory();
  };

  const isBack = direction === -1;

  return (
    <motion.div
      className="h-screen w-full flex flex-col items-center justify-center cursor-none relative"
      onClick={handleEnter}
      initial={isBack ? { opacity: 0, y: -100 } : { opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <div className="text-center z-10 p-10 select-none">

        <motion.h1
          layoutId="brand-logo"
          className={`${playfair.className} text-6xl md:text-8xl font-black mb-4 tracking-tighter mix-blend-difference`}
        >
          RAKS
        </motion.h1>

        <motion.p
          className="text-gray-400 text-sm md:text-base tracking-[0.3em] uppercase opacity-80"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Building logic from chaos
        </motion.p>
      </div>

      {/* Decorative pulse ring to hint at interactivity */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full border border-white/5 pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

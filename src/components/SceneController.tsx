'use client';
import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import IntroScene from './scenes/IntroScene';
import AboutMeScene from './scenes/AboutmeScene';
import CoreScene from './scenes/CoreScene';
import ProofScene from './scenes/ProofScene';
import ToolsScene from './scenes/ToolsScene';
import ResolutionScene from './scenes/ResolutionScene';
import useSound from '../hooks/useSound';
import NavigationControls from './NavigationControls';

type Scene = 'INTRO' | 'ABOUTME' | 'CORE' | 'PROOF' | 'TOOLS' | 'RESOLUTION';
const SCENE_ORDER: Scene[] = ['INTRO', 'ABOUTME', 'CORE', 'PROOF', 'TOOLS', 'RESOLUTION'];

export default function SceneController() {
    const [currentScene, setCurrentScene] = useState<Scene>('INTRO');
    const [direction, setDirection] = useState<number>(0);
    const [activeTrack, setActiveTrack] = useState<'DESIGN' | 'LOGIC'>('DESIGN');
    const playWhoosh = useSound('whoosh');

    // Derived state for scene index to helper with "Back" logic
    const sceneIndex = SCENE_ORDER.indexOf(currentScene);

    useEffect(() => {
        if (currentScene !== 'INTRO') playWhoosh();
    }, [currentScene, playWhoosh]);

    // Scroll Management
    useEffect(() => {
        // Lock scroll initially during transition
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';

        // Unlock after transition (approx 1.2s + buffer)
        const timer = setTimeout(() => {
            document.body.style.overflowY = 'auto'; // allow vertical scroll
            document.body.style.overflowX = 'hidden'; // keep horizontal hidden
            document.body.style.height = 'auto';
            document.body.style.minHeight = '100vh';
        }, 1200);

        return () => clearTimeout(timer);
    }, [currentScene]);

    const changeScene = useCallback((scene: Scene, dir: number) => {
        setDirection(dir);
        setCurrentScene(scene);
        window.scrollTo(0, 0); // Reset scroll on scene change
    }, []);

    const goToAboutMe = () => changeScene('ABOUTME', 1);
    const goToCore = () => changeScene('CORE', 1);
    const goToProof = () => changeScene('PROOF', 1);
    const goToTools = () => changeScene('TOOLS', 1);
    const goToResolution = () => changeScene('RESOLUTION', 1);
    const reset = () => changeScene('INTRO', 1);

    const handleBack = useCallback(() => {
        if (sceneIndex > 0) {
            const prevScene = SCENE_ORDER[sceneIndex - 1];
            changeScene(prevScene, -1);
        }
    }, [sceneIndex, changeScene]);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (sceneIndex > 0 && (e.key === 'Escape' || e.key === 'Backspace')) {
                handleBack();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [sceneIndex, handleBack]);


    return (
        <main className="w-full min-h-screen relative bg-black text-white font-sans selection:bg-white/30 selection:text-white overflow-hidden">
            {/* Background Ambience or Grid */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-[#050505] to-black -z-10" />

            <AnimatePresence>
                {sceneIndex > 0 && currentScene !== 'ABOUTME' && currentScene !== 'CORE' && currentScene !== 'PROOF' && currentScene !== 'TOOLS' && (
                    <NavigationControls onBack={handleBack} />
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait" custom={direction}>
                {currentScene === 'INTRO' && (
                    <IntroScene key="intro" onEnterStory={goToAboutMe} direction={direction} />
                )}

                {currentScene === 'ABOUTME' && (
                    <AboutMeScene
                        key="aboutme"
                        onNext={goToCore}
                        onBack={handleBack}
                        activeTrack={activeTrack}
                        onTrackChange={setActiveTrack}
                    />
                )}

                {currentScene === 'CORE' && (
                    <CoreScene
                        key="core"
                        onNext={goToProof}
                        onBack={handleBack}
                        activeTrack={activeTrack}
                        onTrackChange={setActiveTrack}
                    />
                )}

                {currentScene === 'PROOF' && (
                    <ProofScene
                        key="proof"
                        onReset={reset} // Fallback if regular nav fails
                        onNext={goToTools} // Route to Tools instead of Resolution
                        onBack={handleBack}
                        activeTrack={activeTrack}
                        onTrackChange={setActiveTrack}
                    />
                )}

                {currentScene === 'TOOLS' && (
                    <ToolsScene
                        key="tools"
                        onNext={goToResolution} // Route to Resolution/Contact
                        onBack={handleBack}
                        activeTrack={activeTrack}
                        onTrackChange={setActiveTrack}
                    />
                )}

                {currentScene === 'RESOLUTION' && (
                    <ResolutionScene key="resolution" onReset={reset} />
                )}
            </AnimatePresence>
        </main>
    );
}

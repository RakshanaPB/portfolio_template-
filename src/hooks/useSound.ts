import { useCallback } from 'react';

// Placeholder or real paths. Ensure these files exist in public/sounds/ or similar.
// For now, we'll assume they might be added later, or we can use generic beep URLs if needed.
const SOUNDS = {
    pop: '/sounds/pop.mp3',
    whoosh: '/sounds/whoosh.mp3'
};

export default function useSound(soundName: keyof typeof SOUNDS) {
    const play = useCallback(() => {
        // Simple HTML5 Audio
        // wrap in try-catch to avoid errors if file missing
        try {
            const audio = new Audio(SOUNDS[soundName]);
            audio.volume = 0.2; // Keep it subtle
            audio.play().catch(e => {
                // Ignore auto-play errors or missing files during dev
                // console.warn("Sound play failed", e); 
            });
        } catch (e) {
            // ignore
        }
    }, [soundName]);

    return play;
}

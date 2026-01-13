'use client';

type Track = 'DESIGN' | 'LOGIC';

interface TrackToggleProps {
    activeTrack: Track;
    onChange: (track: Track) => void;
}

export default function TrackToggle({ activeTrack, onChange }: TrackToggleProps) {
    return (
        <div className="absolute top-0 right-0 md:top-10 md:right-10 z-[60] bg-white/5 backdrop-blur-md rounded-full p-1 border border-white/10 flex pointer-events-auto">
            <button
                onClick={() => onChange('DESIGN')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTrack === 'DESIGN' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
                Design
            </button>
            <button
                onClick={() => onChange('LOGIC')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTrack === 'LOGIC' ? 'bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 'text-gray-400 hover:text-white'}`}
            >
                Logic
            </button>
        </div>
    );
}

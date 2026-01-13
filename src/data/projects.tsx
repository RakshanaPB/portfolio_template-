import { ReactNode } from 'react';

export interface Project {
    id: string;
    title: string;
    type: string;
    icon: string;
    description: string;
    accent: string;
    metrics: { value: string; label: string };
    content?: ReactNode; // For the expanded view
}

export const LOGIC_PROJECTS: Project[] = [
    {
        id: 'samurai',
        title: 'The Samurai',
        type: 'LEGACY SYSTEM',
        icon: '🛡️',
        description: 'Represents precision and stability. The core Python model.',
        accent: 'blue',
        metrics: { value: '99.9%', label: 'Accuracy' }
    },
    {
        id: 'assassin',
        title: 'The Assassin',
        type: 'NOVEL AGENT',
        icon: '⚔️',
        description: 'Represents speed and agility. Novel improvements over R.',
        accent: 'red',
        metrics: { value: '100x', label: 'Faster' }
    },
    {
        id: 'architect',
        title: 'The Architect',
        type: 'SYSTEM DESIGN',
        icon: '📐',
        description: 'Scalable infrastructure for high-throughput simulations.',
        accent: 'indigo',
        metrics: { value: '10k+', label: 'Concurrency' }
    },
    {
        id: 'oracle',
        title: 'The Oracle',
        type: 'PREDICTIVE AI',
        icon: '🔮',
        description: 'Forecasting outcomes with advanced heuristics.',
        accent: 'purple',
        metrics: { value: '85%', label: 'Prediction' }
    },
    {
        id: 'sentry',
        title: 'The Sentry',
        type: 'SECURITY OPS',
        icon: '👁️',
        description: 'Real-time monitoring and anomaly detection.',
        accent: 'emerald',
        metrics: { value: '0ms', label: 'Breach' }
    }
];

export const DESIGN_PROJECTS: Project[] = [
    {
        id: 'portfolio-v1',
        title: 'Portfolio V1',
        type: 'UI EXPERIMENT',
        icon: '🎨',
        description: 'Exploration of glassmorphism and kinetic typography.',
        accent: 'pink',
        metrics: { value: 'Awwwards', label: 'Nominee' }
    },
    {
        id: 'finance-dash',
        title: 'Finance Dash',
        type: 'UX CASE STUDY',
        icon: '📊',
        description: 'Simplifying complex financial data for everyday users.',
        accent: 'orange',
        metrics: { value: '+40%', label: 'Engagement' }
    },
    {
        id: 'neon-city',
        title: 'Neon City',
        type: '3D WEBGL',
        icon: '🌃',
        description: 'Immersive 3D environment using Three.js and React.',
        accent: 'cyan',
        metrics: { value: '60fps', label: 'Performance' }
    },
    {
        id: 'zen-mode',
        title: 'Zen Mode',
        type: 'MINIMALISM',
        icon: '🧘',
        description: 'Focus-centric productivity app design.',
        accent: 'teal',
        metrics: { value: 'Top 10', label: 'ProductHunt' }
    },
    {
        id: 'retro-arcade',
        title: 'Retro Arcade',
        type: 'GAMIFICATION',
        icon: '🕹️',
        description: '8-bit inspired game interface for modern web.',
        accent: 'yellow',
        metrics: { value: '5k+', label: 'Players' }
    }
];

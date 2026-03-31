// src/lib/utils/audio.ts
import { get } from 'svelte/store';
import { appData } from '../state/persistence.svelte';

const audioContext = typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)() : null;

function playTone(frequency: number, duration: number, type: OscillatorType = 'sine') {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

export function playStartSound() {
    playTone(440, 0.15);
    setTimeout(() => playTone(550, 0.15), 100);
}

export function playEndSound() {
    playTone(550, 0.15);
    setTimeout(() => playTone(440, 0.3), 100);
}

export function playRestSound() {
    playTone(330, 0.2);
    setTimeout(() => playTone(330, 0.2), 200);
}

export function shouldPlaySound(): boolean {
    const data = get(appData);
    return data?.settings?.sound ?? true;
}

export function getVolume(): number {
    const data = get(appData);
    return data?.settings?.volume ?? 0.7;
}

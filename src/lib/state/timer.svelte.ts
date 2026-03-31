import { persistSessions, saveData, appData } from './persistence.svelte';
import { get } from 'svelte/store';
import { playStartSound, playEndSound, playRestSound } from '../utils/audio';
import { notifyFocusComplete, notifyRestComplete } from '../utils/notifications';

export interface Category {
    name: string;
    icon: string;
}

export interface Session {
    title: string;
    category: string;
    startTime: Date;
    endTime: Date;
}

export interface Intervals {
    work: number;
    shortBreak: number;
    longBreak: number;
}

export function createTimer() {
    let intervals = $state<Intervals>({
        work: 45 * 60,
        shortBreak: 5 * 60,
        longBreak: 15 * 60
    });
    let totalTime = $state(45 * 60);
    let timeLeft = $state(45 * 60);
    let status = $state<'idle' | 'running' | 'paused' | 'rest'>('idle');
    let intervalId = $state<number | null>(null);

    let categories = $state<Category[]>([
        { name: 'Work', icon: 'work' },
        { name: 'Deep Protocol', icon: 'psychology' },
        { name: 'Creative Sync', icon: 'brush' },
        { name: 'Break', icon: 'coffee' }
    ]);
    let currentCategory = $state<Category | null>(null);
    let sessionTitle = $state('Engineering Focus Protocol...');
    let sessions = $state<Session[]>([]);
    let currentSessionStartTime = $state<Date | null>(null);

    function getCurrentCategory() {
        if (!currentCategory) return categories[0];
        return currentCategory;
    }

    function addCategory(name: string, icon: string = 'label') {
        const trimmed = name.trim();
        if (trimmed && !categories.find(c => c.name === trimmed)) {
            const newCat = { name: trimmed, icon };
            categories.push(newCat);
            currentCategory = newCat;
        } else {
            const existing = categories.find(c => c.name === trimmed);
            if (existing) currentCategory = existing;
        }
    }

    function removeCategory(name: string) {
        categories = categories.filter(c => c.name !== name);
        if (getCurrentCategory().name === name && categories.length > 0) {
            currentCategory = categories[0];
        }
    }

    function setCategory(name: string) {
        const cat = categories.find(c => c.name === name);
        if (cat) currentCategory = cat;
    }

    function finishSession() {
        if (currentSessionStartTime) {
            playEndSound();
            sessions.push({
                title: sessionTitle,
                category: getCurrentCategory().name,
                startTime: currentSessionStartTime,
                endTime: new Date()
            });
            currentSessionStartTime = null;
            persistSessions();
        }
    }

    function start() {
        if (status === 'idle') {
            currentSessionStartTime = new Date();
        }
        
        if (status !== 'running') {
            status = 'running';
            playStartSound();
            intervalId = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                } else {
                    finishSession();
                    status = 'rest';
                    playRestSound();
                    notifyFocusComplete();
                    if (intervalId) clearInterval(intervalId);
                    intervalId = null;
                    timeLeft = intervals.shortBreak;
                    totalTime = intervals.shortBreak;
                }
            }, 1000) as unknown as number;
        }
    }

    function pause() {
        if (status === 'running') {
            status = 'paused';
            if (intervalId) clearInterval(intervalId);
            intervalId = null;
        }
    }

    function toggle() {
        if (status === 'rest') {
            status = 'idle';
            playEndSound();
            notifyRestComplete();
            timeLeft = intervals.work;
            totalTime = intervals.work;
            return;
        }
        if (status === 'running') {
            pause();
        } else {
            start();
        }
    }

    function stop() {
        if (status !== 'idle' && status !== 'rest') {
            finishSession();
        }
        status = 'idle';
        if (intervalId) clearInterval(intervalId);
        intervalId = null;
        timeLeft = totalTime;
        currentSessionStartTime = null;
    }

    function addTime(seconds: number) {
        timeLeft += seconds;
        totalTime = Math.max(totalTime, timeLeft); // Ensure total time accommodates the new time
    }

    function subTime(seconds: number) {
        timeLeft = Math.max(0, timeLeft - seconds);
    }

    function setTotalTime(seconds: number) {
        totalTime = seconds;
        timeLeft = seconds;
        const current = get(appData);
        if (current) {
            saveData({
                ...current,
                intervals: { ...intervals, work: seconds }
            });
        }
    }

    function setIntervals(newIntervals: Intervals) {
        intervals = newIntervals;
        const current = get(appData);
        if (current) {
            saveData({
                ...current,
                intervals: newIntervals
            });
        }
    }

    function loadIntervals(work: number, shortBreak: number, longBreak: number) {
        intervals = { work, shortBreak, longBreak };
        if (status === 'idle') {
            totalTime = work;
            timeLeft = work;
        }
    }

    return {
        get timeLeft() { return timeLeft; },
        get totalTime() { return totalTime; },
        get status() { return status; },
        get intervals() { return intervals; },
        get categories() { return categories; },
        get currentCategory() { return getCurrentCategory(); },
        get sessionTitle() { return sessionTitle; },
        set sessionTitle(val) { sessionTitle = val; },
        get sessions() { return sessions; },
        get formattedTime() {
            const m = Math.floor(timeLeft / 60);
            const s = timeLeft % 60;
            return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        },
        get dashOffset() {
            // Circle circumference is ~942 (2 * PI * 150)
            const progress = totalTime > 0 ? (timeLeft / totalTime) : 0;
            return 942 * (1 - progress);
        },
        start,
        pause,
        toggle,
        stop,
        reset: stop,
        addTime,
        subTime,
        setTotalTime,
        setIntervals,
        loadIntervals,
        addCategory,
        removeCategory,
        setCategory
    };
}

export const globalTimer = createTimer();

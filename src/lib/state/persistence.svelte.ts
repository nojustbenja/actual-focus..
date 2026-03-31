// src/lib/state/persistence.svelte.ts
import { writable, get } from 'svelte/store';
import { loadData, saveData as _saveData, resetData } from '../utils/persistence';
import type { AppData } from '../utils/persistence';
export const saveData = _saveData;
import { globalTimer } from './timer.svelte';

export const appData = writable<AppData | null>(null);

export async function initializePersistence() {
  const data = await loadData();
  appData.set(data);
  if (data.sessions) {
    globalTimer.sessions.splice(0, globalTimer.sessions.length, ...data.sessions.map(s => ({
      ...s,
      startTime: new Date(s.start_time),
      endTime: new Date(s.end_time)
    })));
  }
  if (data.intervals) {
    globalTimer.loadIntervals(
      data.intervals.work,
      data.intervals.shortBreak,
      data.intervals.longBreak
    );
  }
}

export async function persistSessions() {
  const appDataValue = get(appData);
  if (appDataValue) {
    appDataValue.sessions = globalTimer.sessions.map(s => ({
      ...s,
      start_time: s.startTime.toISOString(),
      end_time: s.endTime.toISOString()
    }));
    await saveData(appDataValue);
  }
}

export async function resetPersistence() {
  await resetData();
  await initializePersistence();
}

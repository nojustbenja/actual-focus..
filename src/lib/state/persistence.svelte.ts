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
  // Poblar el timer global con sesiones y settings
  if (data.sessions) {
    globalTimer.sessions.splice(0, globalTimer.sessions.length, ...data.sessions.map(s => ({
      ...s,
      startTime: new Date(s.start_time),
      endTime: new Date(s.end_time)
    })));
  }
  // TODO: Poblar intervalos y settings en globalTimer si es necesario
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

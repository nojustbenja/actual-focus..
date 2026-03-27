// src/lib/utils/persistence.ts
import { safeInvoke } from './tauriSafe';

export interface Session {
  title: string;
  category: string;
  start_time: string;
  end_time: string;
}

export interface Intervals {
  work: number;
  short_break: number;
  long_break: number;
}

export interface Settings {
  sound: boolean;
  volume: number;
}

export interface AppData {
  sessions: Session[];
  intervals: Intervals;
  settings: Settings;
}


export async function loadData(): Promise<AppData> {
  return await safeInvoke<AppData>('load_data') ?? { sessions: [], intervals: { work: 45 * 60, short_break: 5 * 60, long_break: 15 * 60 }, settings: { sound: true, volume: 0.7 } };
}

export async function saveData(data: AppData): Promise<void> {
  await safeInvoke('save_data', { data });
}

export async function resetData(): Promise<void> {
  await safeInvoke('reset_data');
}

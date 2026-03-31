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
  shortBreak: number;
  longBreak: number;
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
  return await safeInvoke<AppData>('load_data') ?? { sessions: [], intervals: { work: 45 * 60, shortBreak: 5 * 60, longBreak: 15 * 60 }, settings: { sound: true, volume: 0.7 } };
}

export async function saveData(data: AppData): Promise<void> {
  await safeInvoke('save_data', { data });
}

export async function resetData(): Promise<void> {
  await safeInvoke('reset_data');
}

export function exportToJson(sessions: Session[]): string {
  return JSON.stringify(sessions, null, 2);
}

export function exportToCsv(sessions: Session[]): string {
  const headers = 'Title,Category,Start Time,End Time,Duration (min)\n';
  const rows = sessions.map(s => {
    const duration = Math.round((new Date(s.end_time).getTime() - new Date(s.start_time).getTime()) / 60000);
    return `"${s.title}","${s.category}","${s.start_time}","${s.end_time}",${duration}`;
  }).join('\n');
  return headers + rows;
}

export function downloadFile(content: string, filename: string, type: string): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

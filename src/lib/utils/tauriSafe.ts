// src/lib/utils/tauriSafe.ts
// Wrapper seguro para usar @tauri-apps/api solo en entorno Tauri

export async function safeInvoke<T = any>(cmd: string, args?: Record<string, any>): Promise<T | undefined> {
  // Detecta si estamos en Tauri
  const isTauri = typeof window !== 'undefined' && '__TAURI__' in window;
  if (!isTauri) return undefined;
  const { invoke } = await import('@tauri-apps/api/core');
  return invoke<T>(cmd, args);
}
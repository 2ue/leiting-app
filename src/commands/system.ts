import { invoke } from '@tauri-apps/api/core';

export function change_autostart(open: boolean): Promise<void> {
  return invoke('change_autostart', { open });
}

export function get_current_shortcut(): Promise<string> {
  return invoke('get_current_shortcut');
}

export function change_shortcut(key: string): Promise<void> {
  return invoke('change_shortcut', { key });
}

export function unregister_shortcut(): Promise<void> {
  return invoke('unregister_shortcut');
}

export function hide_leiting(): Promise<void> {
  return invoke('hide_leiting');
}

export function show_leiting(): Promise<void> {
  return invoke('show_leiting');
}

export function show_settings(): Promise<void> {
  return invoke('show_settings');
}

export function show_chat(): Promise<void> {
  return invoke('show_chat');
}

export function show_toolbar(): Promise<void> {
  return invoke('show_toolbar');
}
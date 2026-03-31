// src/lib/utils/notifications.ts
export function requestNotificationPermission(): Promise<NotificationPermission> {
    if (typeof window === 'undefined' || !('Notification' in window)) {
        return Promise.resolve('denied');
    }
    return Notification.requestPermission();
}

export function showNotification(title: string, body: string, icon?: string): void {
    if (typeof window === 'undefined' || !('Notification' in window)) return;
    
    if (Notification.permission === 'granted') {
        new Notification(title, {
            body,
            icon: icon || '/favicon.png',
            silent: true
        });
    }
}

export function notifyFocusComplete() {
    showNotification('Focus Complete', 'Great work! Time for a break.');
}

export function notifyRestComplete() {
    showNotification('Break Over', 'Ready to focus again?');
}

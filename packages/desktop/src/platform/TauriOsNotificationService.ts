import type { IOsNotificationService } from "@app/core";
import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from "@tauri-apps/plugin-notification";

export class TauriOsNotificationService implements IOsNotificationService {
  private permissionReady: Promise<boolean> | null = null;

  ensurePermission(): Promise<boolean> {
    if (!this.permissionReady) {
      this.permissionReady = this.resolvePermission();
    }
    return this.permissionReady;
  }

  async notify(title: string, body: string, url: string): Promise<void> {
    const granted = await this.ensurePermission();
    if (!granted) {
      console.warn("[OS Notification] permission denied", { title, body, url });
      return;
    }

    sendNotification({
      title,
      body,
      extra: { url },
    });
  }

  private async resolvePermission(): Promise<boolean> {
    let granted = await isPermissionGranted();
    if (!granted) {
      const permission = await requestPermission();
      granted = permission === "granted";
    }
    return granted;
  }
}

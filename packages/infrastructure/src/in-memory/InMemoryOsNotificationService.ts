import type { IOsNotificationService } from "@app/core";

export class InMemoryOsNotificationService implements IOsNotificationService {
  async notify(title: string, body: string, url: string): Promise<void> {
    console.info("[OS Notification]", { title, body, url });
  }
}

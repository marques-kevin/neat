import type { ArchiveNotification } from "./use-cases/ArchiveNotification.js";
import type { GetNotificationFeed } from "./use-cases/GetNotificationFeed.js";
import type { MarkAsRead } from "./use-cases/MarkAsRead.js";
import type { PinNotification } from "./use-cases/PinNotification.js";
import type { SetLocale } from "./use-cases/SetLocale.js";
import type { SyncNotifications } from "./use-cases/SyncNotifications.js";
import type { IOsNotificationService } from "./ports/index.js";

export interface AppContainer {
  syncNotifications: SyncNotifications;
  markAsRead: MarkAsRead;
  pinNotification: PinNotification;
  archiveNotification: ArchiveNotification;
  getNotificationFeed: GetNotificationFeed;
  setLocale: SetLocale;
  osNotifications: IOsNotificationService;
}

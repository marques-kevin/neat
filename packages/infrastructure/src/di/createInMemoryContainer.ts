import {
  ArchiveNotification,
  GetNotificationFeed,
  MarkAsRead,
  PinNotification,
  PriorityScorer,
  SetLocale,
  SyncNotifications,
  type AppContainer,
} from "@app/core";
import { FakeGitHubForgeAdapter } from "../in-memory/FakeGitHubForgeAdapter.js";
import { InMemoryNotificationRepository } from "../in-memory/InMemoryNotificationRepository.js";
import { InMemoryOsNotificationService } from "../in-memory/InMemoryOsNotificationService.js";
import { InMemoryPreferencesStore } from "../in-memory/InMemoryPreferencesStore.js";
import { systemClock } from "../in-memory/SystemClock.js";

export function createInMemoryContainer(): AppContainer {
  const repository = new InMemoryNotificationRepository();
  const preferences = new InMemoryPreferencesStore();
  const github = new FakeGitHubForgeAdapter();
  const osNotifications = new InMemoryOsNotificationService();
  const scorer = new PriorityScorer();
  const forges = [github];

  return {
    syncNotifications: new SyncNotifications(forges, repository, scorer, systemClock),
    markAsRead: new MarkAsRead(repository, forges),
    pinNotification: new PinNotification(repository),
    archiveNotification: new ArchiveNotification(repository),
    getNotificationFeed: new GetNotificationFeed(repository),
    setLocale: new SetLocale(preferences),
    osNotifications,
  };
}

export async function bootstrapInMemoryContainer(container: AppContainer): Promise<void> {
  await container.syncNotifications.execute();
}

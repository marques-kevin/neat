import type { NotificationFeedItem } from "../dto/NotificationFeedItem.js";
import type { Notification, ForgeType } from "../../domain/entities/Notification.js";

export interface ForgeCapabilities {
  markAsRead: boolean;
  markAsDone: boolean;
  quickReply: boolean;
  unsubscribe: boolean;
  enrichedPreview: boolean;
}

export interface IForgeAdapter {
  readonly forge: ForgeType;
  fetchNotifications(since?: Date): Promise<Notification[]>;
  markAsRead(id: string): Promise<void>;
  markAsDone(id: string): Promise<void>;
  getCapabilities(): ForgeCapabilities;
}

export interface INotificationRepository {
  getLastSyncTime(): Promise<Date | undefined>;
  findById(id: string): Promise<Notification | undefined>;
  findAll(includeArchived?: boolean): Promise<Notification[]>;
  upsertMany(notifications: Notification[]): Promise<void>;
  save(notification: Notification): Promise<void>;
}

export interface IPreferencesStore {
  get<T>(key: string): Promise<T | undefined>;
  set<T>(key: string, value: T): Promise<void>;
}

export interface IOsNotificationService {
  notify(title: string, body: string, url: string): Promise<void>;
}

export interface IClock {
  now(): Date;
}

export interface SyncResult {
  count: number;
  syncedAt: Date;
}

export interface GetNotificationFeedInput {
  focusMode?: boolean;
}

export interface GetNotificationFeedResult {
  items: NotificationFeedItem[];
  unreadCount: number;
}

export interface SetLocaleInput {
  locale: string;
}

export interface SetLocaleResult {
  locale: string;
}

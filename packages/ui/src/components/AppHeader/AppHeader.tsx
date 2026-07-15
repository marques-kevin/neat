export interface AppHeaderProps {
  appName: string;
  unreadCount: number;
  unreadLabel: string;
  focusMode: boolean;
  focusModeLabel: string;
  syncLabel: string;
  isLoading: boolean;
  onToggleFocusMode: () => void;
  onSync: () => void;
}

export function AppHeader({
  appName,
  unreadCount,
  unreadLabel,
  focusMode,
  focusModeLabel,
  syncLabel,
  isLoading,
  onToggleFocusMode,
  onSync,
}: AppHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">{appName}</h1>
        <p className="text-sm text-slate-500">{unreadLabel}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-slate-900 px-2.5 py-1 text-xs font-medium text-white">
          {unreadCount}
        </span>
        <button
          type="button"
          className={`rounded-lg px-3 py-2 text-sm font-medium ${
            focusMode
              ? "bg-blue-600 text-white"
              : "border border-slate-200 text-slate-700 hover:bg-slate-50"
          }`}
          onClick={onToggleFocusMode}
        >
          {focusModeLabel}
        </button>
        <button
          type="button"
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          onClick={onSync}
          disabled={isLoading}
        >
          {syncLabel}
        </button>
      </div>
    </header>
  );
}

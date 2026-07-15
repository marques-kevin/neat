import { Badge } from "@app/ui/components/ui/badge";
import { Button } from "@app/ui/components/ui/button";

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
    <header className="flex items-center justify-between gap-4 border-b border-border bg-card px-6 py-4">
      <div>
        <h1 className="text-lg font-semibold text-foreground">{appName}</h1>
        <p className="text-sm text-muted-foreground">{unreadLabel}</p>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="default">{unreadCount}</Badge>
        <Button
          type="button"
          variant={focusMode ? "default" : "outline"}
          onClick={onToggleFocusMode}
        >
          {focusModeLabel}
        </Button>
        <Button type="button" variant="outline" onClick={onSync} disabled={isLoading}>
          {syncLabel}
        </Button>
      </div>
    </header>
  );
}

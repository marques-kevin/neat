import { Bell, Megaphone, Search } from "lucide-react";
import { Button } from "@app/ui/components/ui/button";
import { Input } from "@app/ui/components/ui/input";
import { cn } from "@app/ui/lib/utils";

export interface AppHeaderProps {
  searchPlaceholder: string;
  searchValue: string;
  unreadCount: number;
  notificationsLabel: string;
  focusMode: boolean;
  focusModeLabel: string;
  syncLabel: string;
  isLoading: boolean;
  simulatePushLabel?: string;
  onSearchChange: (value: string) => void;
  onToggleFocusMode: () => void;
  onSync: () => void;
  onSimulatePush?: () => void;
}

export function AppHeader({
  searchPlaceholder,
  searchValue,
  unreadCount,
  notificationsLabel,
  focusMode,
  focusModeLabel,
  syncLabel,
  isLoading,
  simulatePushLabel,
  onSearchChange,
  onToggleFocusMode,
  onSync,
  onSimulatePush,
}: AppHeaderProps) {
  return (
    <header className="app-shell-header mx-auto flex w-full max-w-md items-center gap-2 px-4 pt-8 pb-4 sm:px-0">
      <div className="relative flex-1">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={searchPlaceholder}
          className="h-11 rounded-xl border-border/80 bg-card pl-9 shadow-sm"
        />
      </div>

      {onSimulatePush && simulatePushLabel ? (
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-11 shrink-0 rounded-xl border-border/80 bg-card shadow-sm"
          aria-label={simulatePushLabel}
          title={simulatePushLabel}
          onClick={onSimulatePush}
          disabled={isLoading}
        >
          <Megaphone className="size-4" />
        </Button>
      ) : null}

      <Button
        type="button"
        variant="outline"
        size="icon"
        className="relative size-11 shrink-0 rounded-xl border-border/80 bg-card shadow-sm"
        aria-label={notificationsLabel}
        onClick={onSync}
        disabled={isLoading}
        title={syncLabel}
      >
        <Bell className="size-4" />
        {unreadCount > 0 ? (
          <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-red-500 ring-2 ring-card" />
        ) : null}
      </Button>

      <Button
        type="button"
        variant={focusMode ? "default" : "outline"}
        className={cn("hidden h-11 shrink-0 rounded-xl sm:inline-flex")}
        onClick={onToggleFocusMode}
      >
        {focusModeLabel}
      </Button>
    </header>
  );
}

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/ui/components/ui/select";

export interface LanguageSwitcherProps {
  label: string;
  value: string;
  autoLabel: string;
  englishLabel: string;
  frenchLabel: string;
  onChange: (locale: string) => void;
}

export function LanguageSwitcher({
  label,
  value,
  autoLabel,
  englishLabel,
  frenchLabel,
  onChange,
}: LanguageSwitcherProps) {
  return (
    <div className="flex items-center gap-3 text-sm text-foreground">
      <span className="font-medium">{label}</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]" aria-label={label}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="auto">{autoLabel}</SelectItem>
          <SelectItem value="en">{englishLabel}</SelectItem>
          <SelectItem value="fr">{frenchLabel}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

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
    <label className="flex items-center gap-3 text-sm text-slate-700">
      <span className="font-medium">{label}</span>
      <select
        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="auto">{autoLabel}</option>
        <option value="en">{englishLabel}</option>
        <option value="fr">{frenchLabel}</option>
      </select>
    </label>
  );
}

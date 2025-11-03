import { ThemeToggle } from '../ThemeToggle';

export default function ThemeToggleExample() {
  return (
    <div className="p-4 flex gap-4 items-center">
      <ThemeToggle />
      <p className="text-sm text-muted-foreground">Click to toggle theme</p>
    </div>
  );
}

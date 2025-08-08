'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Switch } from '@/components/ui/switch';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; 
  }

  const isDarkMode = theme === 'dark';

  return (
    <div className="flex items-center space-x-2">
      <Sun className={`h-5 w-5 ${isDarkMode ? 'text-muted-foreground' : 'text-primary'}`} />
      <Switch
        id="theme-switch"
        checked={isDarkMode}
        onCheckedChange={() => setTheme(isDarkMode ? 'light' : 'dark')}
        aria-label="Toggle theme"
      />
      <Moon className={`h-5 w-5 ${isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
    </div>
  );
}

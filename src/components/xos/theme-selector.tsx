
'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '../ui/button';
import { Palette, Sun, Moon, Image as ImageIcon } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { useUIState } from '@/hooks/use-ui-state';
import { cn } from '@/lib/utils';

const accentColors = [
    { name: 'blue', value: '217 91% 60%' },
    { name: 'purple', value: '262 84% 60%' },
    { name: 'green', value: '142 76% 36%' },
    { name: 'orange', value: '25 95% 53%' },
    { name: 'pink', value: '330 84% 60%' },
];

export default function XosThemeSelector() {
    const { theme, setTheme } = useTheme();
    const { isAnimatedBg, setAnimatedBg, accentColor, setAccentColor } = useUIState();

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--accent', accentColor);
    }, [accentColor]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="fixed top-6 right-6 z-30 bg-background/30 backdrop-blur-md rounded-full"
                >
                    <Palette className="h-5 w-5" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 glass-card" align="end">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Thème</Label>
                        <div className="grid grid-cols-2 gap-2">
                            <Button variant={theme === 'light' ? 'default' : 'outline'} onClick={() => setTheme('light')}><Sun className="mr-2 h-4 w-4"/>Clair</Button>
                            <Button variant={theme === 'dark' ? 'default' : 'outline'} onClick={() => setTheme('dark')}><Moon className="mr-2 h-4 w-4"/>Sombre</Button>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label>Couleur d'accent</Label>
                        <div className="flex gap-2">
                            {accentColors.map(color => (
                                <button
                                    key={color.name}
                                    className={cn(
                                        "w-8 h-8 rounded-full border-2 transition-transform hover:scale-110",
                                        accentColor === color.value ? 'border-foreground' : 'border-transparent'
                                    )}
                                    style={{ backgroundColor: `hsl(${color.value})`}}
                                    onClick={() => setAccentColor(color.value)}
                                    aria-label={`Set accent color to ${color.name}`}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="animated-bg" className="flex items-center gap-2"><ImageIcon className="h-4 w-4"/>Fond Animé</Label>
                        <Switch id="animated-bg" checked={isAnimatedBg} onCheckedChange={setAnimatedBg} />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}

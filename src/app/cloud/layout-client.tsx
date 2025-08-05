
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from '@/lib/utils';
import {
  LayoutDashboard, Share2, Settings, Search, Bell, LogOut, User as UserIcon, Folder, History
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { ThemeToggle } from '@/components/theme-toggle';
import HeaderLogo from '@/components/layout/header-logo';
import OriaLauncher from '@/components/layout/oria-launcher';
import FusionLauncher from '@/components/layout/fusion-launcher';
import { useNotifications } from '@/hooks/use-notifications';
import { listDocumentsAction } from '@/app/actions';
import type { Doc } from '@/ai/types';


const formatBytes = (bytes: number, decimals = 2) => {
    if (!bytes || bytes === 0) return '0 Octets';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Octets', 'Ko', 'Mo', 'Go', 'To'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const Sidebar = ({ usedStorage, totalStorage, storagePercentage, navItems }: any) => (
    <aside className="hidden lg:flex w-64 flex-shrink-0 bg-transparent p-4 flex-col border-r border-foreground/10">
      <div className="flex items-center gap-2 px-2 mb-8">
        <Link href="/" className="flex items-center gap-2">
            <HeaderLogo />
            <h1 className="text-xl font-bold">(X)cloud</h1>
        </Link>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map((item: any) => (
          <Link key={item.name} href={item.href} scroll={false}>
            <div
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                item.active
                  ? 'bg-foreground/10 text-foreground'
                  : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
      </nav>
      <div className="p-4 bg-foreground/10 rounded-xl">
        <p className="text-sm font-medium">Stockage</p>
        <p className="text-xs text-muted-foreground mt-1 mb-2">{formatBytes(totalStorage - usedStorage)} disponibles</p>
        <Progress value={storagePercentage} className="h-1.5" />
        <p className="text-xs text-right text-muted-foreground mt-1">{formatBytes(usedStorage)} / {formatBytes(totalStorage, 0)}</p>
      </div>
    </aside>
);

const CloudLayoutSkeleton = () => (
    <div className="flex h-screen bg-transparent text-foreground">
        <aside className="w-64 flex-shrink-0 bg-background/20 p-4 flex flex-col">
            <div className="flex items-center gap-2 px-2 mb-8">
                <Skeleton className="w-8 h-8 rounded-lg" />
                <Skeleton className="h-6 w-24" />
            </div>
            <nav className="flex-1 space-y-2">
                {Array.from({length: 4}).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
            </nav>
            <Skeleton className="h-28 w-full rounded-xl" />
        </aside>
        <main className="flex-1 flex flex-col overflow-y-auto no-scrollbar">
            <header className="flex-shrink-0 flex items-center justify-between p-6">
                <Skeleton className="h-10 w-full max-w-md rounded-full" />
                <div className="flex items-center gap-4">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                </div>
            </header>
            <div className="flex-1 p-6 pt-0">
                <Skeleton className="h-full w-full" />
            </div>
        </main>
    </div>
);


export default function CloudLayoutClient({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [docs, setDocs] = useState<Doc[]>([]);
    
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab') || 'dashboard';
    const { notifications, unreadCount, markAllAsRead, clearAll, markAsRead } = useNotifications();

    const fetchData = useCallback(async () => {
        try {
            const result = await listDocumentsAction();
            setDocs(result || []);
        } catch (error) {
            console.error("Failed to fetch documents:", error);
            setDocs([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const { usedStorage, totalStorage, storagePercentage } = useMemo(() => {
        const used = docs.reduce((acc, doc) => acc + doc.size, 0);
        const total = 15 * 1024 * 1024 * 1024; // 15 GB
        return {
            usedStorage: used,
            totalStorage: total,
            storagePercentage: total > 0 ? (used / total) * 100 : 0,
        };
    }, [docs]);

    const navItems = [
        { name: 'Tableau de bord', icon: LayoutDashboard, href: '/cloud?tab=dashboard', active: pathname === '/cloud' && tab === 'dashboard' },
        { name: 'Fichiers', icon: Folder, href: '/cloud?tab=files', active: pathname === '/cloud' && tab === 'files' },
        { name: 'Partage', icon: Share2, href: '/cloud?tab=sharing', active: pathname === '/cloud' && tab === 'sharing' },
        { name: 'Activité', icon: History, href: '/cloud?tab=activity', active: pathname === '/cloud' && tab === 'activity' },
        { name: 'Paramètres', icon: Settings, href: '/account', active: pathname.startsWith('/account') },
    ];
    
    if (loading) {
        return <CloudLayoutSkeleton />;
    }

    return (
        <div className="flex h-screen bg-transparent text-foreground">
            <Sidebar
                navItems={navItems}
                usedStorage={usedStorage}
                totalStorage={totalStorage}
                storagePercentage={storagePercentage}
            />
            <main className="flex-1 flex flex-col overflow-hidden relative">
                <header className="flex-shrink-0 flex flex-wrap items-center justify-between gap-4 p-6 border-b border-white/10">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder="Rechercher fichiers et dossiers..."
                            className="bg-background/50 border-input rounded-full pl-10 h-10"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <DropdownMenu onOpenChange={(open) => { if (!open) markAllAsRead(); }}>
                            <DropdownMenuTrigger asChild>
                                 <Button variant="ghost" size="icon" className="relative">
                                    <Bell className="h-5 w-5" />
                                    {unreadCount > 0 && (
                                         <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                            <span className="relative inline-flex items-center justify-center text-[9px] font-bold text-primary-foreground rounded-full h-2.5 w-2.5 bg-primary">{unreadCount > 9 ? '9+' : unreadCount}</span>
                                        </span>
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-80 glass-card" align="end">
                                <DropdownMenuLabel className="flex justify-between items-center">
                                    Notifications
                                    {notifications.length > 0 && <Button variant="link" size="sm" className="h-auto p-0 text-xs" onClick={(e) => { e.stopPropagation(); clearAll(); }}>Tout effacer</Button>}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                 {notifications.length > 0 ? (
                                    <ScrollAreaPrimitive.Root className="max-h-80">
                                        <ScrollAreaPrimitive.Viewport className="p-1 no-scrollbar">
                                        {notifications.map(notif => (
                                            <DropdownMenuItem
                                                key={notif.id}
                                                className={cn("items-start gap-3 relative", notif.onClick && "cursor-pointer")}
                                                onClick={() => {
                                                    if (notif.onClick) {
                                                        notif.onClick();
                                                        markAsRead(notif.id);
                                                    }
                                                }}
                                                disabled={!notif.onClick}
                                            >
                                                {!notif.isRead && <span className="absolute left-2 top-2.5 h-1.5 w-1.5 rounded-full bg-primary" />}
                                                <div className="mt-1"><notif.icon className="h-4 w-4 text-muted-foreground" /></div>
                                                <div className="flex-1">
                                                    <p className="font-semibold text-sm">{notif.title}</p>
                                                    <p className="text-xs text-muted-foreground">{notif.description}</p>
                                                    <p className="text-xs text-muted-foreground/70 mt-1">{formatDistanceToNow(notif.timestamp, { addSuffix: true, locale: fr })}</p>
                                                </div>
                                            </DropdownMenuItem>
                                        ))}
                                        </ScrollAreaPrimitive.Viewport>
                                    </ScrollAreaPrimitive.Root>
                                ) : (
                                    <div className="text-center text-sm text-muted-foreground p-4">
                                        Aucune nouvelle notification.
                                    </div>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/account"><UserIcon className="h-5 w-5" /></Link>
                        </Button>
                    </div>
                </header>
                <div className="flex-1 overflow-hidden p-6">{children}</div>
            </main>
             <div className="fixed bottom-0 right-0 w-24 h-24 z-40 group" aria-hidden="true">
                <FusionLauncher />
            </div>
             <div className="fixed bottom-0 left-0 w-24 h-24 z-40 group" aria-hidden="true">
                <OriaLauncher />
            </div>
        </div>
    );
}

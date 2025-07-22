
'use client';

import { useMemo } from 'react';
import type { ReactNode }from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FileImage, FileText, File, Folder, GitBranch, UploadCloud, Share2, Pencil, BrainCircuit, Code2, Film, Network, Palette, Users, Lightbulb, Music, LayoutTemplate, AudioLines, Mic, Wand2, FilePenLine, AppWindow, Terminal, Calendar, Zap, Presentation } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type Doc = { id: string; name: string; path: string; mimeType: string; size: number; createdAt: string | null; updatedAt: string | null; shareId: string | null; };

const generationPatterns: Record<string, { icon: React.ElementType, text: string }> = {
    'maestro': { icon: BrainCircuit, text: 'a généré le plan' },
    'deck-': { icon: Presentation, text: 'a créé la présentation' },
    'image-': { icon: FileImage, text: 'a créé l\'image' },
    'code-snippet-': { icon: Code2, text: 'a généré le snippet' },
    'motion-': { icon: Film, text: 'a créé le projet vidéo' },
    'nexus-': { icon: Network, text: 'a généré la carte mentale' },
    'palette-': { icon: Palette, text: 'a généré la palette' },
    'persona-': { icon: Users, text: 'a créé les personas' },
    'promptor-': { icon: Lightbulb, text: 'a généré des idées' },
    'sound-': { icon: Music, text: 'a généré le son' },
    'frame-': { icon: LayoutTemplate, text: 'a créé la maquette' },
    'voice-': { icon: AudioLines, text: 'a généré la voix' },
    'tone-guide-': { icon: Mic, text: 'a défini le ton' },
    'flux-': { icon: Wand2, text: 'a généré le projet' },
    'texte-': { icon: FilePenLine, text: 'a écrit le texte' },
};

const getGenerationInfo = (docName: string): { icon: React.ElementType; text: string } | null => {
    for (const key in generationPatterns) {
        if (docName.startsWith(key)) {
            return generationPatterns[key];
        }
    }
    return null;
};


const getFileIcon = (mimeType: string, isFolder: boolean): ReactNode => {
    if (isFolder) return <Folder className="h-5 w-5 text-yellow-500" />;
    if (mimeType.startsWith('image/')) return <FileImage className="h-5 w-5 text-blue-400" />;
    if (mimeType.startsWith('text/')) return <FileText className="h-5 w-5 text-green-400" />;
    return <File className="h-5 w-5 text-gray-400" />;
};

type ActivityType = 'CREATED' | 'UPDATED' | 'SHARED' | 'DELETED' | 'GENERATED';

type Activity = {
    id: string;
    type: ActivityType;
    doc: Doc;
    timestamp: Date;
    generationInfo?: { icon: React.ElementType; text: string } | null;
};

const ActivityItem = ({ activity }: { activity: Activity }) => {
    const { type, doc, timestamp, generationInfo } = activity;
    
    const actionInfo = {
        GENERATED: { text: generationInfo?.text || 'a généré le fichier', icon: generationInfo?.icon || Wand2, color: 'bg-purple-500' },
        CREATED: { text: 'a créé le fichier', icon: UploadCloud, color: 'bg-green-500' },
        UPDATED: { text: 'a modifié le fichier', icon: Pencil, color: 'bg-blue-500' },
        SHARED: { text: 'a partagé le fichier', icon: Share2, color: 'bg-indigo-500' },
        DELETED: { text: 'a supprimé le fichier', icon: File, color: 'bg-red-500' }
    };
    
    const { text, icon: Icon, color } = actionInfo[type] || actionInfo.UPDATED;

    const fileName = doc.name.split('/').pop() || doc.name;
    const isFolder = doc.mimeType === 'application/x-directory';

    return (
        <div className="flex items-center gap-4">
             <div className="relative">
                <Avatar>
                    <AvatarFallback className={cn(color)}>
                       <Icon className="h-5 w-5 text-white" />
                    </AvatarFallback>
                </Avatar>
            </div>
            <div className="flex-grow">
                <p className="text-sm">
                    <span className="font-semibold">Vous</span> {text}{' '}
                    <span className="font-semibold text-primary">{fileName}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(timestamp, { addSuffix: true, locale: fr })}
                </p>
            </div>
             <div className="flex-shrink-0">
                {getFileIcon(doc.mimeType, isFolder)}
            </div>
        </div>
    );
};


const ActivitySkeleton = () => (
    <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-lg">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-grow space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/4" />
                </div>
                <Skeleton className="h-6 w-6" />
            </div>
        ))}
    </div>
);


export default function ActivityClient({ docs, loading }: { docs: Doc[], loading: boolean }) {

    const activities = useMemo((): Activity[] => {
        if (!docs) return [];
        return docs
            .filter(doc => doc.updatedAt)
            .map(doc => {
                const generationInfo = getGenerationInfo(doc.name.split('/').pop() || '');
                const isCreation = (new Date(doc.updatedAt!).getTime() - new Date(doc.createdAt!).getTime() < 2000);
                const type: ActivityType = isCreation
                    ? (generationInfo ? 'GENERATED' : 'CREATED')
                    : 'UPDATED';

                return {
                    id: doc.id,
                    type,
                    doc,
                    timestamp: new Date(doc.updatedAt!),
                    generationInfo,
                };
            })
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    }, [docs]);

    if (loading) {
        return (
            <>
                <div className="mb-6">
                    <h2 className="text-3xl font-bold">Activité</h2>
                    <p className="text-gray-400">Consultez les dernières modifications et créations.</p>
                </div>
                <Card className="glass-card">
                    <CardContent className="p-4">
                        <ActivitySkeleton />
                    </CardContent>
                </Card>
            </>
        );
    }

    return (
         <>
            <div className="mb-6">
                <h2 className="text-3xl font-bold">Activité</h2>
                <p className="text-gray-400">Consultez les dernières modifications et créations.</p>
            </div>
            <Card className="glass-card">
                <CardContent className="p-4">
                    {activities.length > 0 ? (
                        <div className="space-y-6">
                            {activities.map(activity => (
                                <ActivityItem key={activity.id} activity={activity} />
                            ))}
                        </div>
                    ) : (
                         <div className="text-center py-16 text-muted-foreground">
                            <GitBranch className="mx-auto h-12 w-12 text-muted-foreground/50" />
                            <p className="mt-4 font-semibold">Aucune activité récente.</p>
                            <p className="text-sm">Modifiez ou ajoutez des fichiers pour voir leur historique ici.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </>
    );
}

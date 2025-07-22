
'use client';

import { useState, useEffect, useRef, useCallback, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { format, isSameDay, parse, isValid } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar as CalendarIcon, Plus, Sparkles, Trash2, Loader, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { parseEventAction } from '@/app/actions';
import { AnimatePresence, motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

type Event = {
    id: string; 
    date: string; // 'yyyy-MM-dd'
    time: string; // 'HH:mm'
    title:string;
};

// This is a mock function. In a real app, this would be an API call.
const mockApi = {
    listEvents: async (): Promise<Event[]> => {
        // Simulate API delay
        await new Promise(res => setTimeout(res, 500));
        // Return some mock data if localStorage is empty
        const stored = localStorage.getItem('x-agenda-events');
        if (stored) return JSON.parse(stored);
        const today = format(new Date(), 'yyyy-MM-dd');
        return [
            { id: '1', title: 'Réunion de lancement projet', date: today, time: '10:00' },
            { id: '2', title: 'Brainstorming (X)flux', date: today, time: '14:30' },
        ];
    },
    createEvent: async (event: Omit<Event, 'id'>): Promise<Event> => {
        await new Promise(res => setTimeout(res, 300));
        const newEvent = { ...event, id: Date.now().toString() };
        const stored = localStorage.getItem('x-agenda-events');
        const events = stored ? JSON.parse(stored) : [];
        const updatedEvents = [...events, newEvent];
        localStorage.setItem('x-agenda-events', JSON.stringify(updatedEvents));
        return newEvent;
    },
    deleteEvent: async (eventId: string): Promise<void> => {
        await new Promise(res => setTimeout(res, 300));
        const stored = localStorage.getItem('x-agenda-events');
        const events = stored ? JSON.parse(stored) : [];
        const updatedEvents = events.filter((e: Event) => e.id !== eventId);
        localStorage.setItem('x-agenda-events', JSON.stringify(updatedEvents));
    }
};

function SmartAddButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="absolute top-1/2 right-3 -translate-y-1/2 h-10 px-4 rounded-full">
            {pending ? (
                <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
            ) : (
                <Sparkles className="mr-2 h-4 w-4" />
            )}
            Ajouter
        </Button>
    );
}

function ManualAddButton({ isPending }: { isPending: boolean }) {
    return (
        <Button type="submit" disabled={isPending}>
            {isPending ? (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Send className="mr-2 h-4 w-4" />
            )}
            Enregistrer
        </Button>
    )
}

const SkeletonLoader = () => (
    <div className="space-y-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
    </div>
);


export default function AgendaClient() {
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [events, setEvents] = useState<Event[]>([]);
    const { toast } = useToast();

    const [eventToDelete, setEventToDelete] = useState<Event | null>(null);

    // AI "Smart Add" form state
    const [smartAddState, smartAddAction] = useActionState(parseEventAction, { success: false, error: null, event: null, id: 0 });
    const smartAddFormRef = useRef<HTMLFormElement>(null);
    
    // Manual Add form state
    const manualAddFormRef = useRef<HTMLFormElement>(null);
    const [isManualAddPending, setIsManualAddPending] = useState(false);

    const fetchEvents = useCallback(async () => {
        setLoading(true);
        try {
            const result = await mockApi.listEvents();
            setEvents(result);
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Erreur', description: "Impossible de charger les événements." });
            setEvents([]);
        } finally {
            setLoading(false);
        }
    }, [toast]);
    
    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    const handleCreateEvent = useCallback(async (eventData: Omit<Event, 'id'>) => {
        try {
            await mockApi.createEvent(eventData);
            toast({ title: 'Événement ajouté', description: `"${eventData.title}" a été ajouté à votre agenda.` });
            fetchEvents();
            const parsedDate = parse(eventData.date, 'yyyy-MM-dd', new Date());
            if (isValid(parsedDate)) {
                setSelectedDate(parsedDate);
            }
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Erreur', description: error.message });
        }
    }, [fetchEvents, toast]);

    useEffect(() => {
        if (smartAddState.success && smartAddState.event && smartAddState.id > 0) {
            const { title, date, time } = smartAddState.event;
            handleCreateEvent({ title, date, time });
            smartAddFormRef.current?.reset();
        } else if (!smartAddState.success && smartAddState.error && smartAddState.id > 0) {
            toast({ variant: 'destructive', title: 'Erreur IA', description: smartAddState.error });
        }
    }, [smartAddState, handleCreateEvent, toast]);


    const handleAddEventManually = async (formData: FormData) => {
        const title = formData.get('title') as string;
        const time = formData.get('time') as string;

        if (!title.trim() || !time.trim() || !selectedDate) {
            toast({ variant: 'destructive', title: 'Erreur', description: 'Veuillez remplir tous les champs.' });
            return;
        }

        const eventData = {
            title: title.trim(),
            date: format(selectedDate, 'yyyy-MM-dd'),
            time,
        };
        
        setIsManualAddPending(true);
        await handleCreateEvent(eventData);
        setIsManualAddPending(false);
        manualAddFormRef.current?.reset();
        document.getElementById('close-manual-add-dialog')?.click();
    };

    const handleDeleteEvent = async () => {
        if (!eventToDelete) return;
        try {
            await mockApi.deleteEvent(eventToDelete.id);
            toast({ title: 'Événement supprimé' });
            fetchEvents();
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Erreur', description: error.message });
        } finally {
            setEventToDelete(null);
        }
    };

    const dailyEvents = events
        .filter(event => selectedDate && isValid(parse(event.date, 'yyyy-MM-dd', new Date())) && isSameDay(parse(event.date, 'yyyy-MM-dd', new Date()), selectedDate))
        .sort((a,b) => a.time.localeCompare(b.time));

    return (
        <div className="grid md:grid-cols-3 gap-8 items-start w-full max-w-6xl">
            <div className="md:col-span-2">
                 <Card className="glass-card min-h-[600px] flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                            {selectedDate ? format(selectedDate, "eeee dd MMMM", { locale: fr }) : "Aucune date sélectionnée"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col p-4 md:p-6 pt-0">
                        {loading ? (
                            <SkeletonLoader />
                        ) : dailyEvents.length > 0 ? (
                             <div className="space-y-4">
                                <AnimatePresence>
                                    {dailyEvents.map((event) => (
                                        <motion.div
                                            key={event.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="group relative flex items-center gap-4 rounded-2xl p-4 bg-background/50 border border-border/50 hover:border-primary/50 transition-colors">
                                                <div className="flex flex-col items-center justify-center text-center w-16 p-2 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20">
                                                    <span className="text-3xl font-bold text-primary tracking-tighter">{event.time.split(':')[0]}</span>
                                                    <span className="text-sm font-medium text-primary/80 -mt-1">{event.time.split(':')[1]}</span>
                                                </div>
                                                <p className="font-semibold text-foreground flex-1">{event.title}</p>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-9 w-9 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => setEventToDelete(event)}
                                                    aria-label="Supprimer l'événement"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="flex flex-1 flex-col items-center justify-center text-center py-16 h-full">
                                <CalendarIcon className="h-16 w-16 text-muted-foreground/30" />
                                <p className="mt-4 text-muted-foreground">Aucun événement pour ce jour.</p>
                                <p className="text-xs text-muted-foreground/60 mt-1">Utilisez l'ajout intelligent ci-dessous ou le bouton manuel.</p>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="p-4 border-t border-white/10 mt-auto">
                         <form ref={smartAddFormRef} action={smartAddAction} className="relative w-full">
                            <Textarea
                                name="prompt"
                                placeholder="Ajout intelligent : “Rendez-vous dentiste demain 10h30”"
                                rows={1}
                                className="bg-transparent pr-[140px] resize-none py-3 text-base rounded-full"
                                required
                            />
                            <SmartAddButton />
                        </form>
                    </CardFooter>
                </Card>
            </div>

            <div className="md:col-span-1 space-y-4">
                <Card className="glass-card p-0 md:p-2">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="w-full"
                        locale={fr}
                    />
                </Card>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="w-full">
                            <Plus className="mr-2 h-4 w-4" />
                            Ajouter un événement
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="glass-card">
                        <form action={handleAddEventManually} ref={manualAddFormRef}>
                            <DialogHeader>
                                <DialogTitle>Nouvel événement pour le {selectedDate ? format(selectedDate, "dd MMMM", { locale: fr }) : ''}</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <Input name="title" placeholder="Titre de l'événement" required />
                                <Input name="time" type="time" required />
                            </div>
                            <DialogFooter>
                                <DialogClose asChild><Button id="close-manual-add-dialog" type="button" variant="ghost">Annuler</Button></DialogClose>
                                <ManualAddButton isPending={isManualAddPending} />
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <AlertDialog open={!!eventToDelete} onOpenChange={(open) => !open && setEventToDelete(null)}>
                <AlertDialogContent className="glass-card">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Supprimer l'événement ?</AlertDialogTitle>
                        <AlertDialogDescription>
                           Êtes-vous sûr de vouloir supprimer l'événement "{eventToDelete?.title}" ? Cette action est irréversible.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteEvent}
                            className="bg-destructive hover:bg-destructive/90"
                        >
                            Supprimer
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

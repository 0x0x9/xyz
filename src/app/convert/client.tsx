
'use client';

import { useState, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { convertImageAction } from '@/app/actions';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Upload, X, FileKey, Sparkles, Download, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import type { ConvertImageOutput } from '@/ai/types';


function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" size="lg" className="w-full" disabled={pending}>
            {pending ? (
                <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Conversion...</>
            ) : (
                <>Lancer la conversion <Sparkles className="ml-2 h-5 w-5" /></>
            )}
        </Button>
    )
}

function ImageConverter() {
    const initialState = { message: '', error: null, result: null, id: 0 };
    const [state, formAction] = useFormState(convertImageAction, initialState);
    const { toast } = useToast();
    
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (loadEvent) => {
                setImagePreview(loadEvent.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const { pending } = useFormStatus();

    const handleDownload = (dataUri: string, format: string) => {
        const link = document.createElement("a");
        link.href = dataUri;
        link.download = `converted-image.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <form action={formAction} className="space-y-8">
            <Card className="glass-card">
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2"><ImageIcon className="h-5 w-5 text-primary" /> Convertisseur d'Image</CardTitle>
                    <CardDescription>Envoyez une image pour la convertir dans un autre format.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-4">
                        <input
                            type="file"
                            name="imageFile"
                            accept="image/png, image/jpeg, image/webp"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            className="hidden"
                        />
                        <input type="hidden" name="image" value={imagePreview || ''} />

                        {imagePreview ? (
                            <div className="relative group w-full aspect-square rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                                <Image src={imagePreview} alt="Aperçu de l'image" layout="fill" objectFit="contain" className="p-2"/>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => setImagePreview(null)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground hover:bg-accent hover:border-primary transition-colors"
                            >
                                <Upload className="h-10 w-10 mb-2" />
                                <span>Cliquez pour choisir une image</span>
                            </button>
                        )}
                    </div>
                    
                    <div className="space-y-6">
                        <div>
                            <Label htmlFor="outputFormat">Format de sortie</Label>
                            <Select name="outputFormat" defaultValue="jpeg" required>
                                <SelectTrigger id="outputFormat" className="mt-1"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="jpeg">JPEG</SelectItem>
                                    <SelectItem value="png">PNG</SelectItem>
                                    <SelectItem value="webp">WEBP</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center space-x-2">
                           <Checkbox id="removeTransparency" name="removeTransparency" />
                           <Label htmlFor="removeTransparency">Supprimer la transparence (fond blanc)</Label>
                        </div>
                         <SubmitButton />
                    </div>
                </CardContent>
            </Card>

            {state.result && (
                 <Card className="glass-card">
                    <CardHeader>
                        <CardTitle>Résultat de la Conversion</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-4">
                        <div className="relative w-full max-w-sm aspect-square rounded-lg border-2 border-dashed bg-muted/20">
                             <Image src={(state.result as ConvertImageOutput).convertedImageUri} alt="Image convertie" layout="fill" objectFit="contain" className="p-2"/>
                        </div>
                        <Button onClick={() => handleDownload((state.result as ConvertImageOutput).convertedImageUri, 'jpeg')}>
                            <Download className="mr-2 h-4 w-4" />
                            Télécharger l'image convertie
                        </Button>
                    </CardContent>
                </Card>
            )}
        </form>
    )
}


export default function ConvertClient() {
  return (
    <div className="space-y-12">
      <ImageConverter />
    </div>
  );
}

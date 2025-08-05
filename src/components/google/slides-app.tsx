
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GoogleSlidesIcon = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="#FFC107"/>
    <path d="M13 9H18L13 3V9Z" fill="#F9AB00"/>
    <rect x="7" y="12" width="10" height="6" rx="1" fill="white"/>
  </svg>
);

export default function GoogleSlidesApp() {
    return (
        <div className="h-full w-full bg-background overflow-y-auto no-scrollbar p-6 flex items-center justify-center">
            <Card className="glass-card w-full max-w-md text-center">
                <CardHeader>
                    <GoogleSlidesIcon className="w-16 h-16 mx-auto mb-4" />
                    <CardTitle>Google Slides</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Ceci est une maquette pour une future intégration de Google Slides dans (X)OS.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

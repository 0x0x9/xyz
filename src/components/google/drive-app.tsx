
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GoogleDriveIcon = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.7451 22.2498L15.4902 9.74976L23.2353 22.2498L15.4902 22.2498L7.7451 22.2498Z" fill="#34A853"/>
    <path d="M0.764707 7.74976L8.50981 7.74976L16.2549 20.2498L8.50981 20.2498C4.34314 20.2498 0.764707 16.6713 0.764707 12.4998C0.764707 10.6664 1.45098 9.00957 2.60784 7.74976H0.764707Z" fill="#188038"/>
    <path d="M16.2549 20.2498L24 7.74976H8.50977L16.2549 20.2498Z" fill="#FFC107"/>
    <path d="M12.3725 1.75L2.60781 18.2547C1.45095 16.9949 0.764677 15.338 0.764677 13.5047C0.764677 9.33303 4.34311 5.75466 8.50977 5.75466H21.2941L12.3725 1.75Z" fill="#4285F4"/>
    <path d="M21.2941 5.75466H8.50978C8.50978 5.75466 17.647 5.75466 17.647 5.75466L21.2941 5.75466L24 1.75H12.3725L8.50978 7.74976H22.902L21.2941 5.75466Z" fill="#EA4335"/>
    <path d="M12.3725 1.75L21.2941 5.75466L17.647 5.75466L12.3725 1.75Z" fill="#1E88E5"/>
  </svg>
);

export default function GoogleDriveApp() {
    return (
        <div className="h-full w-full bg-background overflow-y-auto no-scrollbar p-6 flex items-center justify-center">
            <Card className="glass-card w-full max-w-md text-center">
                <CardHeader>
                    <GoogleDriveIcon className="w-16 h-16 mx-auto mb-4" />
                    <CardTitle>Google Drive</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Ceci est une maquette pour une future intégration de Google Drive dans (X)OS.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

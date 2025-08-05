
'use client';

import RealityClient from "@/app/reality/client";

export default function RealityApp() {
    return (
        <div className="h-full w-full bg-background overflow-y-auto no-scrollbar p-6">
           <RealityClient />
        </div>
    );
}

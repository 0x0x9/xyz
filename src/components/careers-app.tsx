
'use client';

import CareersClient from "@/app/careers/client";

export default function CareersApp() {
    return (
        <div className="h-full w-full bg-background overflow-y-auto no-scrollbar p-6">
            <CareersClient />
        </div>
    );
}


'use client';

import StorePageClient from "@/app/store/client";

export default function StoreApp() {
    return (
        <div className="h-full w-full bg-background overflow-y-auto no-scrollbar">
            <main>
                <StorePageClient />
            </main>
        </div>
    );
}

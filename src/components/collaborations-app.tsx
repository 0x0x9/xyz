
'use client';

import CollaborationsClient from "@/app/collaborations/client";

export default function CollaborationsApp() {
    return (
        <div className="h-full w-full bg-background overflow-y-auto no-scrollbar p-6">
            <CollaborationsClient />
        </div>
    );
}

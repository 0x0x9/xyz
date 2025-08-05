
'use client';

import MessengerClient from "@/app/chat/client";

export default function ChatApp() {
    return (
        <div className="h-full w-full bg-background overflow-hidden">
           <MessengerClient />
        </div>
    );
}

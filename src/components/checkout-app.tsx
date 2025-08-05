
'use client';

import CheckoutClient from "@/app/checkout/client";

export default function CheckoutApp() {
    return (
        <div className="h-full w-full bg-background overflow-y-auto no-scrollbar p-6">
            <CheckoutClient />
        </div>
    );
}

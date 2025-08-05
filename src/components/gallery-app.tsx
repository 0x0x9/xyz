
'use client';

import GalleryClient from "@/app/gallery/client";
import { galleryItems } from "@/lib/gallery-data";

export default function GalleryApp() {
    return (
        <div className="h-full w-full bg-background overflow-y-auto no-scrollbar p-6">
            <GalleryClient items={galleryItems} />
        </div>
    );
}

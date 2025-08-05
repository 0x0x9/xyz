
'use client';

export default function GoogleSlidesApp() {
    return (
        <div className="h-full w-full bg-white">
            <iframe
                src="https://docs.google.com/presentation/"
                className="w-full h-full border-none"
                title="Google Slides"
            ></iframe>
        </div>
    );
}

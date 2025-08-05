
'use client';

export default function GoogleDocsApp() {
    return (
        <div className="h-full w-full bg-white">
            <iframe
                src="https://docs.google.com/document/"
                className="w-full h-full border-none"
                title="Google Docs"
            ></iframe>
        </div>
    );
}

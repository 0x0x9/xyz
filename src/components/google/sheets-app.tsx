
'use client';

export default function GoogleSheetsApp() {
    return (
        <div className="h-full w-full bg-white">
            <iframe
                src="https://docs.google.com/spreadsheets/"
                className="w-full h-full border-none"
                title="Google Sheets"
            ></iframe>
        </div>
    );
}

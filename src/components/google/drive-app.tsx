
'use client';

export default function GoogleDriveApp() {
    return (
        <div className="h-full w-full bg-white">
            <iframe
                src="https://drive.google.com/drive/my-drive"
                className="w-full h-full border-none"
                title="Google Drive"
            ></iframe>
        </div>
    );
}

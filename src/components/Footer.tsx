
"use client";

import Link from "next/link";
import { useState, useEffect } from 'react';

export function Footer() {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    return (
        <footer className="py-8 border-t border-border mt-20">
            <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
                <p>&copy; {currentYear} (X)yzz. Tous droits réservés.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                  <Link href="/privacy" className="hover:text-foreground transition-colors">Confidentialité</Link>
                  <Link href="/terms" className="hover:text-foreground transition-colors">Conditions</Link>
                </div>
            </div>
        </footer>
    )
}

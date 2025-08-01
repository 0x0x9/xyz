
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Menu,
  X,
  ChevronDown,
  ShoppingCart,
  Trash2,
  Layers,
  BrainCircuit,
  Lightbulb,
  Film,
  AudioLines,
  FileText,
  Image as ImageIcon,
  SquareTerminal,
  LayoutTemplate,
  Music,
  Code2,
  Network,
  Calendar,
  Guitar,
  Wand2,
  AppWindow,
  Cloud,
  Zap,
  Star,
  Plus,
  Minus,
  Download,
  MessageSquare,
  BookOpen,
  Users,
  Paintbrush,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import HeaderLogo from "./layout/header-logo";
import { useCart } from "@/hooks/use-cart-store";
import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";
import { ThemeToggle } from "./theme-toggle";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "./ui/separator";
import { useAuth } from './auth-component';

const navLinks = [
  { href: "/store", label: "Boutique" },
  { href: "/features", label: "Fonctionnalités" },
  { href: "/careers", label: "Carrières" },
];

const communityLinks = [
    { href: "/forum", label: "Forum d'entraide", icon: MessageSquare, description: "Discutez avec la communauté et partagez vos idées." },
    { href: "/collaborations", label: "Collaborations", icon: Users, description: "Trouvez des partenaires et des projets." },
    { href: "/gallery", label: "Galerie (X)hibit", icon: Paintbrush, description: "Explorez les créations de la communauté." },
    { href: "/blog", label: "Blog (X)press", icon: BookOpen, description: "Tutoriels, analyses et inspiration." },
]

const ecosystemTools = [
    { href: "/welcome", label: "Découvrir (X)OS", icon: Star, description: "Le système d'exploitation créatif." },
    { href: "/xos", label: "(X)OS en ligne", icon: AppWindow, description: "Votre bureau, partout." },
    { href: "/cloud", label: "(X)cloud", icon: Cloud, description: "Stockage et gestion de fichiers." },
    { href: "/fusion", label: "(X)fusion", icon: Zap, description: "Combinez vos outils." },
    { href: "/download", label: "Téléchargement", icon: Download, description: "Installez (X)OS sur votre machine." },
]

const generatorTools = [
    { href: "/flux", label: "(X)flux", icon: Wand2 },
    { href: "/maestro", label: "Maestro", icon: BrainCircuit },
    { href: "/brand-identity", label: "(X)brand", icon: Layers },
    { href: "/promptor", label: "(X)promptor", icon: Lightbulb },
    { href: "/motion", label: "(X)motion", icon: Film },
    { href: "/image", label: "Image", icon: ImageIcon },
    { href: "/muse", label: "(X)muse", icon: Guitar },
    { href: "/text", label: "Texte", icon: FileText },
    { href: "/sound", label: "(X)sound", icon: Music },
    { href: "/voice", label: "(X)voice", icon: AudioLines },
    { href: "/editor", label: "(X).alpha", icon: SquareTerminal },
    { href: "/frame", label: "(X)frame", icon: LayoutTemplate },
    { href: "/terminal", label: "(X)term', icon: Terminal },
    { href: "/code", label: '(X)code', icon: Code2 },
    { href: "/nexus", label: '(X)nexus', icon: Network },
    { href: "/agenda", label: '(X)agenda', icon: Calendar },
]


function CartSheet() {
  const { items, removeItem, total, itemCount, addItem, decreaseItem } =
    useCart();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-foreground/80 hover:text-foreground hover:bg-foreground/10 rounded-full"
        >
          <ShoppingCart className="h-6 w-6" />
          {itemCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
              {itemCount}
            </span>
          )}
          <span className="sr-only">Ouvrir le panier</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md glass-card flex flex-col p-0">
        <header className="p-6 border-b border-border">
          <h2 className="text-2xl font-semibold">Votre Panier</h2>
        </header>
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <p className="text-lg font-medium text-muted-foreground">
              Votre panier est vide.
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1">
              <div className="p-6 space-y-6">
                {items.map((item) => (
                  <div key={item.cartItemId} className="flex gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border border-border">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.price.toFixed(2)}€
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-7 w-7"
                          onClick={() => decreaseItem(item.cartItemId)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-bold text-sm w-4 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-7 w-7"
                          onClick={() => addItem(item)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.cartItemId)}
                      className="shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <footer className="p-6 border-t border-border space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{total.toFixed(2)}€</span>
              </div>
              <SheetClose asChild>
                <Button
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  asChild
                >
                  <Link href="/checkout">Passer la commande</Link>
                </Button>
              </SheetClose>
            </footer>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

const EcosystemLink = ({ href, label, description, icon: Icon }: { href: string; label: string; description: string; icon: React.ElementType }) => (
    <motion.div whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
        <Link href={href} className="group flex items-start gap-3 p-3 rounded-lg hover:bg-foreground/10 transition-all duration-200 focus:bg-foreground/10 focus:outline-none">
            <div className="p-2 rounded-lg border bg-primary/10 border-primary/20 mt-1">
                <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
                <p className="font-semibold text-foreground text-sm">{label}</p>
                <p className="text-xs text-muted-foreground">{description}</p>
            </div>
        </Link>
    </motion.div>
);

const GeneratorLink = ({ href, label, icon: Icon }: { href: string; label: string; icon: React.ElementType }) => (
    <Link href={href} className="group flex items-center gap-2 p-1.5 rounded-md hover:bg-foreground/10 transition-colors duration-200">
        <Icon className="h-4 w-4 text-accent" />
        <span className="text-sm text-foreground">{label}</span>
    </Link>
);


const DropdownMenuLinkItem = ({ href, label, description, icon: Icon }: { href: string; label: string; description?: string; icon: React.ElementType }) => (
    <DropdownMenuPrimitive.Item asChild>
        <Link
        href={href}
        className="group flex items-center gap-3 p-2 rounded-lg hover:bg-foreground/10 transition-all duration-200 focus:bg-foreground/10 focus:outline-none"
        >
        <div className="p-1.5 rounded-md border bg-accent/10 border-accent/20">
            <Icon className="h-5 w-5 text-accent" />
        </div>
        <div>
            <p className="font-semibold text-foreground text-sm">{label}</p>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
        </Link>
    </DropdownMenuPrimitive.Item>
);

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { user, handleSignOut } = useAuth();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between rounded-full glass-card relative">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-3 font-bold text-xl text-foreground"
          >
            <HeaderLogo />
            <span>(X)yzz.</span>
          </Link>
        </div>
        <nav className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1 bg-background/50 dark:bg-black/20 border border-border rounded-full p-1">
          
          {navLinks.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              className="text-foreground/80 hover:text-foreground hover:bg-foreground/10 rounded-full h-9 px-4"
              asChild
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
          
          <DropdownMenuPrimitive.Root>
            <DropdownMenuPrimitive.Trigger asChild>
              <Button
                variant="ghost"
                className="text-foreground/80 hover:text-foreground hover:bg-foreground/10 rounded-full h-9 px-4"
              >
                Outils <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuPrimitive.Trigger>
            <DropdownMenuPrimitive.Portal>
              <DropdownMenuPrimitive.Content
                align="center"
                sideOffset={10}
                className="w-[500px] glass-card p-4 z-50 outline-none"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="grid grid-cols-12 gap-4"
                >
                  <div className="col-span-5 space-y-1">
                     <h3 className="px-3 text-sm font-semibold text-muted-foreground mb-1">Écosystème</h3>
                     <div className="flex flex-col">
                       {ecosystemTools.map((tool) => (
                          <EcosystemLink key={tool.href} {...tool} />
                       ))}
                     </div>
                  </div>
                  <Separator orientation="vertical" className="h-auto" />
                  <div className="col-span-6 space-y-2">
                     <h3 className="px-2 text-sm font-semibold text-muted-foreground mb-2">Générateurs IA</h3>
                     <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                        {generatorTools.map((tool) => (
                            <GeneratorLink key={tool.href} {...tool} />
                        ))}
                     </div>
                  </div>
                </motion.div>
              </DropdownMenuPrimitive.Content>
            </DropdownMenuPrimitive.Portal>
          </DropdownMenuPrimitive.Root>
          
           <DropdownMenuPrimitive.Root>
            <DropdownMenuPrimitive.Trigger asChild>
              <Button
                variant="ghost"
                className="text-foreground/80 hover:text-foreground hover:bg-foreground/10 rounded-full h-9 px-4"
              >
                Communauté <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuPrimitive.Trigger>
            <DropdownMenuPrimitive.Portal>
              <DropdownMenuPrimitive.Content
                align="center"
                sideOffset={10}
                className="w-80 glass-card p-2 z-50 outline-none"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="flex flex-col gap-1"
                >
                  {communityLinks.map((link) => (
                     <DropdownMenuLinkItem key={link.href} {...link} />
                  ))}
                </motion.div>
              </DropdownMenuPrimitive.Content>
            </DropdownMenuPrimitive.Portal>
          </DropdownMenuPrimitive.Root>

        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <CartSheet />
            {user ? (
                <>
                    <Button variant="ghost" className="rounded-full" asChild>
                      <Link href="/account">Mon Compte</Link>
                    </Button>
                    <Button variant="outline" className="rounded-full" onClick={handleSignOut}>
                      Déconnexion
                    </Button>
                </>
            ) : (
                <>
                    <Button variant="ghost" className="rounded-full" asChild>
                        <Link href="/login">Connexion</Link>
                    </Button>
                    <Button className="rounded-full" asChild>
                        <Link href="/subscribe">S'abonner</Link>
                    </Button>
                </>
            )}
          </div>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-foreground/80 hover:text-foreground hover:bg-foreground/10 rounded-full"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Ouvrir le menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full glass-card flex flex-col">
              <div className="flex justify-between items-center p-6 border-b border-border">
                <Link
                  href="/"
                  className="flex items-center gap-3 font-bold text-xl text-foreground"
                  onClick={() => setIsSheetOpen(false)}
                >
                  <HeaderLogo />
                  <span>(X)yzz.</span>
                </Link>
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-foreground/80 hover:text-foreground hover:bg-foreground/10 rounded-full"
                  >
                    <X className="h-6 w-6" />
                    <span className="sr-only">Fermer le menu</span>
                  </Button>
                </SheetClose>
              </div>
              <ScrollArea className="flex-1">
                <nav className="flex flex-col gap-2 p-6 text-left">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsSheetOpen(false)}
                      className="text-2xl font-medium hover:text-accent transition-colors py-2"
                    >
                      {link.label}
                    </Link>
                  ))}
                   <Accordion type="multiple" className="w-full pt-4">
                     <AccordionItem value="community" className="border-b-0">
                        <AccordionTrigger className="text-2xl font-medium hover:text-accent transition-colors py-2 hover:no-underline">
                            Communauté
                        </AccordionTrigger>
                        <AccordionContent className="pl-4">
                             <div className="flex flex-col gap-1">
                                {communityLinks.map((link) => (
                                    <Link key={link.href} href={link.href} onClick={() => setIsSheetOpen(false)} className="group flex items-center gap-3 p-2 rounded-lg hover:bg-foreground/10 transition-colors">
                                        <div className="p-1.5 bg-accent/10 rounded-md border border-accent/20">
                                            <link.icon className="h-5 w-5 text-accent" />
                                        </div>
                                        <span className="text-lg font-medium">{link.label}</span>
                                    </Link>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="tools" className="border-b-0">
                      <AccordionTrigger className="text-2xl font-medium hover:text-accent transition-colors py-2 hover:no-underline">
                        Outils
                      </AccordionTrigger>
                      <AccordionContent className="pl-4">
                         <div className="flex flex-col gap-1 mt-2">
                             <h4 className="font-semibold text-muted-foreground mb-2">Écosystème</h4>
                            {ecosystemTools.map((tool) => (
                                <Link key={tool.href} href={tool.href} onClick={() => setIsSheetOpen(false)} className="group flex items-center gap-3 p-2 rounded-lg hover:bg-foreground/10 transition-colors">
                                    <div className="p-1.5 bg-primary/10 rounded-md border border-primary/20">
                                    <tool.icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <span className="text-lg font-medium">{tool.label}</span>
                                </Link>
                            ))}
                        </div>
                        <div className="flex flex-col gap-1 mt-4">
                             <h4 className="font-semibold text-muted-foreground mb-2">Générateurs IA</h4>
                            {generatorTools.map((tool) => (
                                <Link key={tool.href} href={tool.href} onClick={() => setIsSheetOpen(false)} className="group flex items-center gap-3 p-2 rounded-lg hover:bg-foreground/10 transition-colors">
                                    <div className="p-1.5 bg-accent/10 rounded-md border border-accent/20">
                                        <tool.icon className="h-5 w-5 text-accent" />
                                    </div>
                                    <span className="text-lg font-medium">{tool.label}</span>
                                </Link>
                            ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </nav>
              </ScrollArea>
              <div className="p-6 mt-auto border-t border-border flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Thème</span>
                  <ThemeToggle />
                </div>
                <CartSheet />
                {user ? (
                   <>
                      <Button asChild variant="outline" className="text-lg h-12 rounded-full">
                        <Link href="/account">Mon Compte</Link>
                      </Button>
                       <Button onClick={handleSignOut} className="text-lg h-12 rounded-full">Déconnexion</Button>
                   </>
                ) : (
                    <>
                        <Button variant="outline" className="text-lg h-12 rounded-full" asChild>
                            <Link href="/login">Connexion</Link>
                        </Button>
                        <Button className="text-lg h-12 rounded-full" asChild>
                            <Link href="/subscribe">S'abonner</Link>
                        </Button>
                    </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

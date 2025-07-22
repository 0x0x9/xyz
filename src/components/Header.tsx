
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
  FileType,
  Download,
  Apple,
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

const navLinks = [
  { href: "/store", label: "Boutique" },
  { href: "/community", label: "Communauté" },
];

const toolCategories = [
  {
    label: "Environnements",
    tools: [
      {
        href: "/xos",
        label: "(X)OS",
        icon: AppWindow,
        description: "Votre bureau créatif unifié.",
      },
      {
        href: "/cloud",
        label: "(X)cloud",
        icon: Cloud,
        description: "Gérez vos fichiers et projets.",
      },
      {
        href: "/fusion",
        label: "(X)fusion",
        icon: Zap,
        description: "Combinez les outils sur une toile.",
      },
      {
        href: "/welcome",
        label: "Bienvenue",
        icon: Star,
        description: "Découvrez l'écosystème (X)yzz.",
      },
    ],
  },
  {
    label: "Stratégie & Idéation",
    tools: [
      {
        href: "/flux",
        label: "(X)flux",
        icon: Wand2,
        description: "D'une idée à un projet complet.",
      },
      {
        href: "/maestro",
        label: "Maestro",
        icon: BrainCircuit,
        description: "Orchestrez vos plans de A à Z.",
      },
      {
        href: "/brand-identity",
        label: "(X)brand",
        icon: Layers,
        description: "Définissez votre identité de marque.",
      },
      {
        href: "/promptor",
        label: "(X)promptor",
        icon: Lightbulb,
        description: "Transformez vos concepts en prompts.",
      },
      {
        href: "/agenda",
        label: "(X)agenda",
        icon: Calendar,
        description: "Planifiez vos événements avec l'IA.",
      },
    ],
  },
  {
    label: "Création & Développement",
    tools: [
      {
        href: "/image",
        label: "Image",
        icon: ImageIcon,
        description: "Créez des visuels uniques.",
      },
      {
        href: "/editor",
        label: "(X).alpha",
        icon: SquareTerminal,
        description: "Éditeur de code intelligent.",
      },
      {
        href: "/motion",
        label: "(X)motion",
        icon: Film,
        description: "Générez des scripts et vidéos.",
      },
      {
        href: "/sound",
        label: "(X)sound",
        icon: Music,
        description: "Créez effets sonores et ambiances.",
      },
      {
        href: "/format",
        label: "(X)format",
        icon: FileType,
        description: "Réformatez vos textes avec l'IA.",
      },
    ],
  },
];

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

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
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
          <Button
            variant="ghost"
            className="text-foreground bg-foreground/10 hover:bg-foreground/20 rounded-full h-9 px-4"
            asChild
          >
            <Link href="/">Accueil</Link>
          </Button>
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
                className="w-[clamp(500px,80vw,850px)] glass-card p-4 z-50 outline-none"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  {toolCategories.map((category) => (
                    <div key={category.label} className="flex flex-col gap-2">
                      <h3 className="px-2 text-sm font-semibold text-muted-foreground mb-1">
                        {category.label}
                      </h3>
                      {category.tools.map((tool) => (
                        <DropdownMenuPrimitive.Item asChild key={tool.href}>
                          <Link
                            href={tool.href}
                            className="group flex items-center gap-3 p-2 rounded-lg hover:bg-foreground/10 transition-all duration-200 focus:bg-foreground/10 focus:outline-none"
                          >
                            <div className="p-1.5 bg-accent/10 rounded-md border border-accent/20">
                              <tool.icon className="h-5 w-5 text-accent" />
                            </div>
                            <div>
                              <p className="font-semibold text-foreground text-sm">
                                {tool.label}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {tool.description}
                              </p>
                            </div>
                          </Link>
                        </DropdownMenuPrimitive.Item>
                      ))}
                    </div>
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
            <Button
              variant="ghost"
              className="text-foreground/80 hover:text-foreground hover:bg-foreground/10 rounded-full"
              asChild
            >
              <Link href="/login">Connexion</Link>
            </Button>
            <Button
              className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full"
              asChild
            >
              <Link href="/subscribe">S'abonner</Link>
            </Button>
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
                  <Link
                    href="/"
                    onClick={() => setIsSheetOpen(false)}
                    className="text-2xl font-medium hover:text-accent transition-colors py-2"
                  >
                    Accueil
                  </Link>
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
                  <Link
                    href="/download"
                    onClick={() => setIsSheetOpen(false)}
                    className="text-2xl font-medium hover:text-accent transition-colors py-2 flex items-center"
                  >
                    Télécharger <Download className="ml-2 h-6 w-6" />
                  </Link>
                  <Accordion type="multiple" className="w-full pt-4">
                    <AccordionItem value="tools" className="border-b-0">
                      <AccordionTrigger className="text-2xl font-medium hover:text-accent transition-colors py-2 hover:no-underline">
                        Outils
                      </AccordionTrigger>
                      <AccordionContent className="pl-4">
                        {toolCategories.map((category) => (
                          <Accordion
                            key={category.label}
                            type="multiple"
                            className="w-full"
                          >
                            <AccordionItem
                              value={category.label}
                              className="border-b-0"
                            >
                              <AccordionTrigger className="text-xl font-semibold text-muted-foreground hover:no-underline">
                                {category.label}
                              </AccordionTrigger>
                              <AccordionContent className="pl-4">
                                <div className="flex flex-col gap-1">
                                  {category.tools.map((tool) => (
                                    <Link
                                      key={tool.href}
                                      href={tool.href}
                                      onClick={() => setIsSheetOpen(false)}
                                      className="group flex items-center gap-3 p-2 rounded-lg hover:bg-foreground/10 transition-colors"
                                    >
                                      <div className="p-1.5 bg-accent/10 rounded-md border border-accent/20">
                                        <tool.icon className="h-5 w-5 text-accent" />
                                      </div>
                                      <span className="text-lg font-medium">
                                        {tool.label}
                                      </span>
                                    </Link>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        ))}
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
                <Button
                  variant="outline"
                  className="border-border bg-transparent hover:bg-accent/10 text-lg h-12 rounded-full"
                  asChild
                >
                  <Link href="/login">Connexion</Link>
                </Button>
                <Button
                  className="bg-accent hover:bg-accent/90 text-lg h-12 rounded-full"
                  asChild
                >
                  <Link href="/subscribe">S'abonner</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

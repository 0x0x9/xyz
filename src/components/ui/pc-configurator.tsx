
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { Cpu, HardDrive, MemoryStick, CircuitBoard, CheckCircle } from 'lucide-react';

type Option = {
    name: string;
    priceModifier: number;
};

type ComponentType = 'cpu' | 'gpu' | 'ram' | 'storage';

const options: Record<ComponentType, Option[]> = {
    cpu: [
        { name: 'Intel Core i7 (Base)', priceModifier: 0 },
        { name: 'Intel Core i9', priceModifier: 450 },
    ],
    gpu: [
        { name: 'NVIDIA RTX 4070 (Base)', priceModifier: 0 },
        { name: 'NVIDIA RTX 4080', priceModifier: 600 },
        { name: 'NVIDIA RTX 4090', priceModifier: 1200 },
    ],
    ram: [
        { name: '32GB DDR5 (Base)', priceModifier: 0 },
        { name: '64GB DDR5', priceModifier: 200 },
        { name: '128GB DDR5', priceModifier: 550 },
    ],
    storage: [
        { name: '1TB NVMe SSD (Base)', priceModifier: 0 },
        { name: '2TB NVMe SSD', priceModifier: 150 },
        { name: '4TB NVMe SSD', priceModifier: 400 },
    ],
};

export type Configuration = {
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
};

interface PCConfiguratorProps {
    basePrice: number;
    onConfigChange: (config: Configuration, newPrice: number) => void;
}

export function PCConfigurator({ basePrice, onConfigChange }: PCConfiguratorProps) {
    const [config, setConfig] = useState<Configuration>({
        cpu: options.cpu[0].name,
        gpu: options.gpu[0].name,
        ram: options.ram[0].name,
        storage: options.storage[0].name,
    });

    useEffect(() => {
        const cpuPrice = options.cpu.find(o => o.name === config.cpu)?.priceModifier ?? 0;
        const gpuPrice = options.gpu.find(o => o.name === config.gpu)?.priceModifier ?? 0;
        const ramPrice = options.ram.find(o => o.name === config.ram)?.priceModifier ?? 0;
        const storagePrice = options.storage.find(o => o.name === config.storage)?.priceModifier ?? 0;

        const newPrice = basePrice + cpuPrice + gpuPrice + ramPrice + storagePrice;
        onConfigChange(config, newPrice);
    }, [config, basePrice, onConfigChange]);

    const handleSelection = (type: ComponentType, value: string) => {
        setConfig(prevConfig => ({
            ...prevConfig,
            [type]: value,
        }));
    };

    return (
        <Card className="glass-card bg-black/10 dark:bg-black/20">
            <CardHeader>
                <CardTitle>Configurez votre station</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
                <ConfigSection icon={Cpu} title="Processeur (CPU)" type="cpu" value={config.cpu} onSelect={handleSelection} />
                <ConfigSection icon={CircuitBoard} title="Carte Graphique (GPU)" type="gpu" value={config.gpu} onSelect={handleSelection} />
                <ConfigSection icon={MemoryStick} title="Mémoire (RAM)" type="ram" value={config.ram} onSelect={handleSelection} />
                <ConfigSection icon={HardDrive} title="Stockage" type="storage" value={config.storage} onSelect={handleSelection} />
            </CardContent>
        </Card>
    );
}

function ConfigSection({ icon: Icon, title, type, value, onSelect }: {
    icon: React.ElementType,
    title: string,
    type: ComponentType,
    value: string,
    onSelect: (type: ComponentType, value: string) => void
}) {
    return (
        <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                <Icon className="h-5 w-5 text-primary" />
                {title}
            </h3>
            <Carousel opts={{ align: "start", slidesToScroll: 1 }} className="w-full">
                <CarouselContent>
                    {options[type].map((option, index) => (
                        <CarouselItem key={index} className="basis-1/2 md:basis-1/3">
                            <div className="p-1">
                                <Button
                                    variant="outline"
                                    onClick={() => onSelect(type, option.name)}
                                    className={cn(
                                        "w-full h-full p-4 flex flex-col items-center justify-center text-center gap-2 rounded-xl border-2 transition-all duration-200 text-foreground",
                                        value === option.name
                                            ? "border-primary bg-primary/10 ring-2 ring-primary/50"
                                            : "bg-card/50 border-border"
                                    )}
                                >
                                    {value === option.name && (
                                        <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-primary" />
                                    )}
                                    <span className="font-medium text-sm">{option.name}</span>
                                    <span className="text-xs text-muted-foreground">
                                        {option.priceModifier > 0 ? `+${option.priceModifier.toFixed(2)}€` : 'Inclus'}
                                    </span>
                                </Button>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
            </Carousel>
        </div>
    )
}

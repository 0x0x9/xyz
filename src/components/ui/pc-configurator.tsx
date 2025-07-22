
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Cpu, HardDrive, MemoryStick, CircuitBoard } from 'lucide-react';
import { Separator } from './separator';

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
            <CardContent className="space-y-6">
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
            <RadioGroup value={value} onValueChange={(val) => onSelect(type, val)} className="space-y-2">
                {options[type].map(option => (
                    <Label
                        key={option.name}
                        htmlFor={`${type}-${option.name}`}
                        className={cn(
                            "flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all duration-300",
                            "bg-card/95 dark:bg-card/80 border-border shadow-md",
                            "hover:bg-card/25 dark:hover:bg-card/50 hover:border-primary/30 hover:backdrop-blur-xl",
                            value === option.name && "border-primary bg-primary/20 ring-2 ring-primary/50"
                        )}
                    >
                        <span className="font-medium">{option.name}</span>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">
                                {option.priceModifier > 0 ? `+${option.priceModifier.toFixed(2)}€` : 'Inclus'}
                            </span>
                            <RadioGroupItem value={option.name} id={`${type}-${option.name}`} className="border-white/50" />
                        </div>
                    </Label>
                ))}
            </RadioGroup>
        </div>
    )
}

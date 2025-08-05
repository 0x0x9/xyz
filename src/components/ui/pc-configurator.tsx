
'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Cpu, HardDrive, MemoryStick, CircuitBoard } from 'lucide-react';

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

const componentInfo: Record<ComponentType, { title: string; icon: React.ElementType }> = {
    cpu: { title: "Processeur", icon: Cpu },
    gpu: { title: "Carte Graphique", icon: CircuitBoard },
    ram: { title: "Mémoire", icon: MemoryStick },
    storage: { title: "Stockage", icon: HardDrive },
}

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

const ConfiguratorSection = ({ type, title, icon: Icon, options, selected, onSelect }: {
    type: ComponentType,
    title: string,
    icon: React.ElementType,
    options: Option[],
    selected: string,
    onSelect: (type: ComponentType, value: string) => void
}) => {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3">
                <Icon className="h-6 w-6 text-muted-foreground" />
                <h3 className="text-xl font-semibold">{title}</h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
                {options.map((option) => (
                    <button
                        key={option.name}
                        onClick={() => onSelect(type, option.name)}
                        className={cn(
                            "text-left w-full p-4 rounded-xl border-2 transition-all duration-200 flex justify-between items-center",
                            selected === option.name
                                ? 'bg-primary/10 border-primary shadow-sm'
                                : 'bg-muted/30 border-transparent hover:border-border'
                        )}
                    >
                        <span className="font-medium">{option.name}</span>
                        <span className="text-sm text-muted-foreground">
                            {option.priceModifier > 0 ? `+${option.priceModifier.toFixed(2)}€` : 'Inclus'}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

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
        <div className="space-y-12">
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold">Configurez votre Station X-1</h2>
                <p className="text-muted-foreground mt-2 max-w-xl mx-auto">Personnalisez les composants pour qu'ils répondent parfaitement à vos besoins.</p>
            </div>
            {(Object.keys(options) as ComponentType[]).map((type) => (
                <ConfiguratorSection 
                    key={type}
                    type={type}
                    title={componentInfo[type].title}
                    icon={componentInfo[type].icon}
                    options={options[type]}
                    selected={config[type]}
                    onSelect={handleSelection}
                />
            ))}
        </div>
    );
}

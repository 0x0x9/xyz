
'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Cpu, HardDrive, MemoryStick, CircuitBoard, CheckCircle } from 'lucide-react';

type Option = {
    name: string;
    priceModifier: number;
};

type ComponentType = 'cpu' | 'gpu' | 'ram' | 'storage';

const options: Record<ComponentType, Option[]> = {
    cpu: [
        { name: 'Intel Core i7-14700K', priceModifier: 0 },
        { name: 'AMD Ryzen 7 7800X3D', priceModifier: 50 },
        { name: 'Intel Core i9-14900K', priceModifier: 200 },
        { name: 'AMD Ryzen 9 7950X3D', priceModifier: 350 },
    ],
    gpu: [
        { name: 'NVIDIA RTX 4070 Ti Super', priceModifier: 0 },
        { name: 'AMD Radeon RX 7900 XT', priceModifier: -100 },
        { name: 'NVIDIA RTX 4080 Super FE', priceModifier: 400 },
    ],
    ram: [
        { name: '32GB DDR5', priceModifier: 0 },
        { name: '64GB DDR5', priceModifier: 200 },
        { name: '128GB DDR5', priceModifier: 550 },
    ],
    storage: [
        { name: '2TB NVMe SSD', priceModifier: 0 },
        { name: '2TB NVMe SSD + 8TB HDD', priceModifier: 150 },
        { name: '4TB NVMe SSD', priceModifier: 200 },
        { name: '4TB NVMe SSD + 12TB HDD', priceModifier: 450 },
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
            <h3 className="text-2xl font-semibold">{title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {options.map((option) => (
                    <button
                        key={option.name}
                        onClick={() => onSelect(type, option.name)}
                        className={cn(
                            "text-left w-full p-6 rounded-2xl border-2 transition-all duration-200 flex justify-between items-center glass-card",
                            selected === option.name
                                ? 'border-primary shadow-lg shadow-primary/20'
                                : 'border-border hover:border-primary/50'
                        )}
                    >
                        <div>
                            <p className="font-semibold">{option.name}</p>
                            <p className="text-sm text-muted-foreground">
                                {option.priceModifier > 0 ? `+${option.priceModifier.toFixed(2)}€` : option.priceModifier < 0 ? `${option.priceModifier.toFixed(2)}€` : 'Configuration de base'}
                            </p>
                        </div>
                        {selected === option.name && <CheckCircle className="h-6 w-6 text-primary shrink-0" />}
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
        <div className="space-y-16">
            <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Configurez votre Workstation</h2>
                <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">Personnalisez chaque composant pour créer la machine qui correspond parfaitement à vos ambitions créatives.</p>
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

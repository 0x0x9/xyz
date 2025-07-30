
'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Product } from '@/lib/products';
import type { Configuration } from '@/components/ui/pc-configurator';

// We add `image` to the cart item to store which variant was added
type CartItem = Omit<Product, 'images'> & {
    image: string;
    cartItemId: string; 
    quantity: number;
    configuration?: Configuration;
};

type CartState = {
    items: CartItem[];
    itemCount: number;
    total: number;
    addItem: (product: Omit<CartItem, 'quantity' | 'cartItemId'>) => void;
    removeItem: (cartItemId: string) => void;
    decreaseItem: (cartItemId: string) => void;
    clearCart: () => void;
};

const calculateState = (items: CartItem[]) => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { itemCount, total, items };
};

export const useCart = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            itemCount: 0,
            total: 0,
            addItem: (product) => {
                const currentItems = get().items;
                const isConfigured = !!product.configuration;

                // Create a unique ID for configured items, but use product ID for standard items
                const findId = isConfigured 
                    ? JSON.stringify(product.configuration) + product.id 
                    : product.id.toString();

                const existingItem = currentItems.find((item) => {
                    if (isConfigured && item.configuration) {
                        return JSON.stringify(item.configuration) + item.id === findId;
                    }
                    return !item.configuration && item.id === product.id;
                });

                let updatedItems;
                if (existingItem) {
                    updatedItems = currentItems.map((item) =>
                        item.cartItemId === existingItem.cartItemId
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                } else {
                    const newCartItem: CartItem = {
                        ...product,
                        quantity: 1,
                        // Create a truly unique ID for this instance in the cart
                        cartItemId: `${product.id}-${Date.now()}-${Math.random()}` 
                    };
                    updatedItems = [...currentItems, newCartItem];
                }
                
                set(calculateState(updatedItems));
            },
            decreaseItem: (cartItemId) => {
                const currentItems = get().items;
                const existingItem = currentItems.find(item => item.cartItemId === cartItemId);

                if (existingItem && existingItem.quantity > 1) {
                    const updatedItems = currentItems.map(item => 
                        item.cartItemId === cartItemId 
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    );
                    set(calculateState(updatedItems));
                } else {
                    // If quantity is 1 or less, remove it
                    const updatedItems = currentItems.filter((item) => item.cartItemId !== cartItemId);
                    set(calculateState(updatedItems));
                }
            },
            removeItem: (cartItemId: string) => {
                const updatedItems = get().items.filter((item) => item.cartItemId !== cartItemId);
                set(calculateState(updatedItems));
            },
            clearCart: () => {
                set({ items: [], itemCount: 0, total: 0 });
            },
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    const { items } = state;
                    const { itemCount, total } = calculateState(items);
                    state.itemCount = itemCount;
                    state.total = total;
                }
            }
        }
    )
);

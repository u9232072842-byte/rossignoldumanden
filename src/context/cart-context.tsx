
'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import type { Product, CartItem } from '@/lib/types';
import { useToast } from "@/hooks/use-toast"

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: Product & { size?: string, color?: string }) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  totalPrice: number;
  isCartOpen: boolean;
  setCartOpen: (isOpen: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const { toast } = useToast();

  const addToCart = (item: Product & { size?: string, color?: string }) => {
    setCartItems(prevItems => {
      // Create a unique ID for the cart item based on product ID and variants
      const cartItemId = `${item.id}-${item.size || ''}-${item.color || ''}`;
      
      const existingItem = prevItems.find(i => `${i.product.id}-${i.size || ''}-${i.color || ''}` === cartItemId);

      if (existingItem) {
        return prevItems.map(i =>
          `${i.product.id}-${i.size || ''}-${i.color || ''}` === cartItemId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      
      const newCartItem: CartItem = {
          product: item,
          quantity: 1,
          size: item.size,
          color: item.color
      };
      
      return [...prevItems, newCartItem];
    });
    setCartOpen(true);
    toast({
      title: "Ajouté au panier",
      description: `${item.name} a été ajouté à votre panier.`,
    })
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => {
        const cartItemId = `${item.product.id}-${item.size || ''}-${item.color || ''}`;
        return cartItemId !== itemId;
    }));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    const cartItemId = itemId;
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        `${item.product.id}-${item.size || ''}-${item.color || ''}` === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cartItems]);


  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    totalPrice,
    isCartOpen,
    setCartOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

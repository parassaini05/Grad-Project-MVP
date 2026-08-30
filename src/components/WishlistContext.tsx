"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: string;
  brand: string;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  image: string;
}

export interface BagItem extends Product {
  scheduledDate: string | null;
  size: string;
  qty: number;
  deliveryFee: number;
}

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  bagItems: BagItem[];
  addToBag: (product: Product, scheduledDate: string | null, deliveryFee?: number) => void;
  removeFromBag: (productId: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [bagItems, setBagItems] = useState<BagItem[]>([]);

  useEffect(() => {
    // Basic local storage sync could go here if needed
  }, []);

  const addToWishlist = (product: Product) => {
    setItems((prev) => {
      if (!prev.find(p => p.id === product.id)) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromWishlist = (productId: string) => {
    setItems((prev) => prev.filter(p => p.id !== productId));
  };

  const isInWishlist = (productId: string) => {
    return items.some(p => p.id === productId);
  };

  const addToBag = (product: Product, scheduledDate: string | null, deliveryFee: number = 0) => {
    setBagItems((prev) => {
      if (!prev.find(p => p.id === product.id)) {
        return [...prev, { ...product, scheduledDate, size: 'Upto 15"', qty: 1, deliveryFee }];
      }
      return prev;
    });
  };

  const removeFromBag = (productId: string) => {
    setBagItems((prev) => prev.filter(p => p.id !== productId));
  };

  return (
    <WishlistContext.Provider value={{ 
      items, addToWishlist, removeFromWishlist, isInWishlist,
      bagItems, addToBag, removeFromBag
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

"use client";

import React from 'react';
import Link from 'next/link';
import { useWishlist } from './WishlistContext';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { items, bagItems } = useWishlist();
  const pathname = usePathname();
  
  const isWishlist = pathname === '/wishlist';

  return (
    <header className="bg-white w-full z-50 shadow-sm sticky top-0 h-14 flex items-center px-4 justify-between">
      <div className="flex items-center gap-4">
        {isWishlist ? (
          <Link href="/">
            <span className="material-symbols-outlined text-myntra-dark">arrow_back</span>
          </Link>
        ) : (
          <button className="text-myntra-dark flex items-center justify-center">
            <span className="material-symbols-outlined">menu</span>
          </button>
        )}
        
        {isWishlist ? (
          <div className="flex flex-col">
            <h1 className="font-bold text-[15px] leading-tight">Wishlist</h1>
            <span className="text-[12px] text-myntra-gray">{items.length} items</span>
          </div>
        ) : (
          <Link href="/" className="font-bold text-myntra-dark tracking-widest uppercase text-lg flex items-center">
            <span className="text-myntra-pink font-black text-xl mr-1">M</span>yntra
          </Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button className="text-myntra-dark flex items-center justify-center">
          <span className="material-symbols-outlined">search</span>
        </button>
        
        {!isWishlist && (
          <Link href="/wishlist" className="relative text-myntra-dark flex items-center justify-center">
            <span className="material-symbols-outlined">favorite</span>
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-myntra-pink text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                {items.length}
              </span>
            )}
          </Link>
        )}
        
        <Link href="/bag" className="text-myntra-dark flex items-center justify-center relative">
          <span className="material-symbols-outlined">shopping_bag</span>
          {bagItems.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-myntra-pink text-white text-[10px] rounded-full flex items-center justify-center font-bold">
              {bagItems.length}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

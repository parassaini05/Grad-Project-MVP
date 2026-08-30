"use client";

import React from 'react';
import Navbar from './Navbar';
import WishlistCard from './WishlistCard';
import { useWishlist } from './WishlistContext';
import Link from 'next/link';

export default function WishlistPage() {
  const { items } = useWishlist();

  return (
    <div className="flex-1 overflow-y-auto pb-6">
      <Navbar />
      
      <div className="w-full">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 px-4 bg-myntra-light-gray mt-2 text-center h-full">
            <span className="material-symbols-outlined text-[64px] text-gray-300 mb-6">favorite_border</span>
            <h2 className="font-bold text-[18px] text-myntra-dark mb-2">YOUR WISHLIST IS EMPTY</h2>
            <p className="text-[13px] text-myntra-gray mb-8 max-w-[280px]">
              Add items that you like to your wishlist. Review them anytime and easily move them to the bag.
            </p>
            <Link href="/" className="px-10 py-3.5 border border-myntra-pink text-myntra-pink font-bold text-[13px] rounded-[4px] uppercase tracking-wide hover:bg-pink-50 transition-colors">
              CONTINUE SHOPPING
            </Link>
          </div>
        ) : (
          <main className="grid grid-cols-2 gap-[1px] bg-gray-100 p-[1px] mt-[1px]">
            {items.map((product) => (
              <WishlistCard key={product.id} product={product} />
            ))}
          </main>
        )}
      </div>
    </div>
  );
}

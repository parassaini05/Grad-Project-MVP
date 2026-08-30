"use client";

import React from 'react';
import Link from 'next/link';
import { useWishlist } from '@/components/WishlistContext';
import { useRouter } from 'next/navigation';

export default function BagPage() {
  const { bagItems } = useWishlist();
  const router = useRouter();

  // For MVP, just sum up the first item if exists
  const total = bagItems.reduce((acc, item) => acc + parseInt(item.price.replace(/[^\d]/g, '')), 0);

  return (
    <div className="flex-1 overflow-y-auto pb-32 bg-myntra-light-gray h-full relative">
      {/* Header */}
      <header className="bg-white w-full z-50 shadow-sm sticky top-0">
        <div className="h-14 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="text-myntra-dark">
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div className="flex flex-col">
              <h1 className="font-bold text-[14px] text-myntra-dark leading-tight flex items-center gap-1">
                Rahul (560001) <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </h1>
              <p className="text-[11px] text-myntra-gray truncate max-w-[200px]">
                123, Tech Park, Koramangala, Bengaluru...
              </p>
            </div>
          </div>
          <button className="text-myntra-dark">
            <span className="material-symbols-outlined text-[20px]">favorite_border</span>
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex justify-between items-center px-4 font-bold text-[13px] border-t border-myntra-border">
          <button className="text-myntra-pink border-b-2 border-myntra-pink py-3 px-2 flex-1 text-center">Items</button>
          <button className="text-myntra-gray py-3 px-2 flex-1 text-center">Coupons & Bank Offers</button>
          <button className="text-myntra-gray py-3 px-2 flex-1 text-center">Price Details</button>
        </div>
      </header>



      {bagItems.length === 0 ? (
        <div className="p-8 text-center text-myntra-gray text-[14px]">Your bag is empty.</div>
      ) : (
        <div className="px-3 pb-6">
          <div className="flex justify-between items-center mb-3 px-1">
            <h2 className="font-bold text-[15px] text-myntra-dark">Your Bag</h2>
          </div>

          <div className="flex justify-between items-center mb-3 px-1">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-myntra-pink rounded-sm flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[12px] font-bold">check</span>
              </div>
              <span className="font-bold text-[13px] text-myntra-dark">{bagItems.length}/{bagItems.length} Items Selected <span className="text-myntra-pink">(₹{total.toLocaleString('en-IN')})</span></span>
            </div>
            <div className="flex gap-4 text-myntra-dark">
              <span className="material-symbols-outlined text-[18px]">share</span>
              <span className="material-symbols-outlined text-[18px]">delete</span>
              <span className="material-symbols-outlined text-[18px]">favorite_border</span>
            </div>
          </div>

          {/* Bag Items */}
          <div className="flex flex-col gap-3">
            {bagItems.map(item => (
              <div key={item.id} className="bg-white rounded-md border border-myntra-border p-3 relative">
                <button className="absolute top-3 right-3 text-gray-400">
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
                
                <div className="flex gap-3">
                  <div className="relative w-[100px] h-[133px] bg-gray-100 rounded-sm overflow-hidden flex-shrink-0">
                    <div className="absolute top-1 left-1 w-4 h-4 bg-myntra-pink rounded-sm flex items-center justify-center z-10 shadow-sm border border-white">
                      <span className="material-symbols-outlined text-white text-[12px] font-bold">check</span>
                    </div>
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex flex-col flex-1 pr-4">
                    <h3 className="font-bold text-[14px] text-myntra-dark leading-tight">{item.brand}</h3>
                    <p className="text-[12px] text-myntra-gray line-clamp-1 mt-0.5">{item.name}</p>
                    
                    <div className="flex gap-2 mt-2">
                      <button className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded px-2 py-1 text-[11px] font-bold text-myntra-dark">
                        Size: {item.size} <span className="material-symbols-outlined text-[14px]">expand_more</span>
                      </button>
                      <button className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded px-2 py-1 text-[11px] font-bold text-myntra-dark">
                        Qty: {item.qty} <span className="material-symbols-outlined text-[14px]">expand_more</span>
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="font-bold text-[14px] text-myntra-dark">{item.price}</span>

                    </div>
                    
                    <div className="flex items-center gap-1 mt-2 text-myntra-dark">
                      <span className="material-symbols-outlined text-[14px]">undo</span>
                      <span className="text-[11px] font-medium">14 days return</span>
                    </div>
                    
                    {item.scheduledDate && (
                      <div className="flex items-start gap-1 mt-1 text-myntra-green font-bold">
                        <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                        <span className="text-[11px] leading-tight">Delivery by {item.scheduledDate.split(', ')[1]}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sticky Footer */}
      {bagItems.length > 0 && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-myntra-border z-50">
          <div className="bg-pink-50 text-center py-2 text-[12px] font-bold text-myntra-dark border-b border-pink-100">
            {bagItems.length} Item selected for order
          </div>
          <div className="p-3">
            <Link href="/address" className="block w-full text-center py-3.5 bg-myntra-pink text-white font-bold text-[14px] uppercase rounded shadow-sm hover:bg-pink-600">
              Place Order
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

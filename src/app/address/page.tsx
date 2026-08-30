"use client";

import React from 'react';
import Link from 'next/link';
import { useWishlist } from '@/components/WishlistContext';
import { useRouter } from 'next/navigation';

export default function AddressPage() {
  const { bagItems } = useWishlist();
  const router = useRouter();

  // Removed single item constant

  return (
    <div className="flex-1 overflow-y-auto pb-24 bg-myntra-light-gray h-full relative">
      {/* Header */}
      <header className="bg-white w-full z-50 shadow-sm sticky top-0">
        <div className="h-14 flex items-center px-4">
          <button onClick={() => router.back()} className="text-myntra-dark mr-4">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <h1 className="font-bold text-[14px] text-myntra-dark uppercase tracking-widest">
            Address
          </h1>
        </div>
        
        {/* Stepper */}
        <div className="flex items-center justify-between px-8 py-3 text-[10px] font-bold text-myntra-gray relative border-t border-myntra-border">
          <div className="absolute top-1/2 left-10 right-10 h-[1px] bg-gray-200 -z-10"></div>
          
          <div className="flex flex-col items-center gap-1 bg-white px-2">
            <div className="w-4 h-4 rounded-full bg-myntra-green flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[12px]">check</span>
            </div>
            <span className="text-myntra-green">Bag</span>
          </div>
          
          <div className="flex flex-col items-center gap-1 bg-white px-2">
            <div className="w-4 h-4 rounded-full bg-myntra-green flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[12px]">check</span>
            </div>
            <span className="text-myntra-green">Address</span>
          </div>
          
          <div className="flex flex-col items-center gap-1 bg-white px-2">
            <div className="w-4 h-4 rounded-full bg-white border border-gray-300"></div>
            <span className="text-gray-400">Payment</span>
          </div>
        </div>
      </header>

      {/* Address Block */}
      <div className="bg-white mt-2 p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-[15px] text-myntra-dark">Rahul Kumar</h2>
            <span className="text-myntra-gray text-[12px]">(Default)</span>
            <span className="bg-teal-50 text-teal-600 border border-teal-200 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
              HOME
            </span>
          </div>
          <button className="text-myntra-pink font-bold text-[13px]">Change</button>
        </div>
        
        <p className="text-[13px] text-myntra-dark leading-relaxed mb-3 pr-4">
          123, Tech Park<br/>
          Koramangala<br/>
          Bengaluru, Karnataka 560001
        </p>
        
        <p className="text-[13px] text-myntra-dark">
          Mobile: <span className="font-bold">9876543210</span>
        </p>
      </div>

      {/* Delivery Estimates */}
      <div className="mt-2">
        <div className="bg-gray-100 p-3 px-4">
          <h3 className="font-bold text-[12px] text-myntra-gray tracking-widest uppercase">Delivery Estimates</h3>
        </div>
        
        {bagItems.length > 0 ? (
          <div className="flex flex-col gap-1 bg-white p-2">
            {bagItems.map((item) => (
              <div key={item.id} className="bg-white p-2 flex items-center gap-4 border-b border-gray-100 last:border-b-0">
                <div className="w-12 h-12 bg-gray-100 rounded-sm overflow-hidden flex-shrink-0 border border-gray-200">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-[14px] text-myntra-dark flex items-center gap-2">
                  <span>Estimated delivery by <span className="font-bold">{item.scheduledDate ? item.scheduledDate.split(', ')[1] : '3 Sep 2026'}</span></span>
                  {item.scheduledDate && (
                    <span className="bg-green-50 text-myntra-green border border-green-200 text-[10px] px-1.5 py-0.5 rounded-sm font-bold uppercase">Guaranteed</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-4 text-[13px] text-myntra-gray text-center">No items in bag.</div>
        )}
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-myntra-border z-50 p-3">
        <Link href="/payment" className="block w-full text-center py-3.5 bg-myntra-pink text-white font-bold text-[14px] uppercase rounded shadow-sm hover:bg-pink-600">
          CONTINUE
        </Link>
      </div>
    </div>
  );
}

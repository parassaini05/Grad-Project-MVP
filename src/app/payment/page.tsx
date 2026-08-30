"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useWishlist } from '@/components/WishlistContext';

export default function PaymentPage() {
  const router = useRouter();
  const { bagItems } = useWishlist();

  // For MVP, just sum up the first item if exists + 10 delivery fee to match screenshot (3999 + 10 = 4009)
  const baseTotal = bagItems.reduce((acc, item) => acc + parseInt(item.price.replace(/[^\d]/g, '')), 0);
  const total = baseTotal > 0 ? baseTotal + 10 : 0; // matching screenshot 4009

  return (
    <div className="flex-1 overflow-y-auto pb-32 bg-myntra-light-gray h-full relative">
      {/* Header */}
      <header className="bg-white w-full z-50 shadow-sm sticky top-0">
        <div className="h-14 flex items-center px-4">
          <button onClick={() => router.back()} className="text-myntra-dark mr-4">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <h1 className="font-bold text-[14px] text-myntra-dark uppercase tracking-widest">
            Payment
          </h1>
        </div>
        
        {/* Stepper */}
        <div className="flex items-center justify-between px-8 py-3 text-[10px] font-bold text-myntra-gray relative border-t border-myntra-border">
          <div className="absolute top-1/2 left-10 right-10 h-[1px] bg-myntra-green -z-10"></div>
          
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
            <div className="w-4 h-4 rounded-full bg-white border-2 border-myntra-green flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-myntra-green"></div>
            </div>
            <span className="text-myntra-dark">Payment</span>
          </div>
        </div>
      </header>

      {/* Coupons */}
      <div className="bg-white mt-2 p-4 flex justify-between items-center border-b border-myntra-border">
        <h2 className="font-bold text-[14px] text-myntra-dark">Coupons & Bank Offers</h2>
        <button className="text-myntra-pink font-bold text-[13px] flex items-center gap-1">
          All offers <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      </div>

      {/* Online Payment Options */}
      <div className="mt-4">
        <div className="px-4 mb-2">
          <h3 className="font-bold text-[12px] text-myntra-gray tracking-widest uppercase">Online Payment Options</h3>
        </div>
        
        <div className="bg-white flex flex-col">
          {[
            { icon: 'payments', label: 'UPI (Pay via any App)', offers: '1 Offer' },
            { icon: 'credit_card', label: 'Credit/Debit Card', offers: '3 Offers' },
            { icon: 'account_balance_wallet', label: 'Wallets', offers: '' },
            { icon: 'update', label: 'Pay Later', offers: '' },
            { icon: 'currency_rupee', label: 'EMI', offers: '' },
            { icon: 'account_balance', label: 'Net Banking', offers: '' },
          ].map((method, idx) => (
            <div key={idx} className="flex justify-between items-center p-4 border-b border-gray-100 cursor-pointer">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-myntra-dark">{method.icon}</span>
                <span className="font-bold text-[14px] text-myntra-dark">{method.label}</span>
                {method.offers && (
                  <span className="text-teal-600 font-bold text-[12px]">{method.offers}</span>
                )}
              </div>
              <span className="material-symbols-outlined text-myntra-dark">expand_more</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pay On Delivery Option */}
      <div className="mt-4">
        <div className="px-4 mb-2">
          <h3 className="font-bold text-[12px] text-myntra-gray tracking-widest uppercase">Pay On Delivery Option</h3>
        </div>
        
        <div className="bg-white p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-myntra-pink flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-myntra-pink"></div>
              </div>
              <span className="font-bold text-[14px] text-myntra-dark">Cash on Delivery (Cash/UPI)</span>
            </div>
            <span className="material-symbols-outlined text-myntra-dark">payments</span>
          </div>
          
          <p className="text-[13px] text-myntra-gray ml-8 mb-4">
            You can pay via Cash/UPI on delivery.
          </p>
          
          <button 
            onClick={() => alert("Order Placed! The MVP flow is complete.")}
            className="w-full py-3.5 bg-myntra-pink text-white font-bold text-[14px] rounded shadow-sm hover:bg-pink-600 transition-colors"
          >
            Pay Now
          </button>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-myntra-border z-50 rounded-t-xl overflow-hidden shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
        <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50">
          <div className="flex flex-col">
            <span className="font-bold text-[15px] text-myntra-dark">Price Details ({bagItems.length} item{bagItems.length !== 1 ? 's' : ''})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-myntra-gray">Total Amount:</span>
            <span className="font-bold text-[15px] text-myntra-dark">₹{total.toLocaleString('en-IN')}</span>
            <span className="material-symbols-outlined text-myntra-dark">expand_less</span>
          </div>
        </div>
      </div>
    </div>
  );
}

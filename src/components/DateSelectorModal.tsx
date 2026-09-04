"use client";

import React, { useState, useEffect } from 'react';

interface DateSelectorModalProps {
  onClose: () => void;
  onConfirm: (date: string, fee: number) => void;
}

export default function DateSelectorModal({ onClose, onConfirm }: DateSelectorModalProps) {
  const [dates] = useState<Array<{ text: string; full: string; fee: string; feeClass: string }>>(() => {
    const generated = [];
    const today = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 1; i <= 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayName = i === 1 ? 'Tomorrow' : days[d.getDay()];
      const dateString = `${d.getDate()} ${months[d.getMonth()]}`;
      const fullDateText = `${dayName}, ${dateString}`;
      
      const feeText = i <= 2 ? '+ ₹99' : 'Standard';
      const feeClass = i <= 2 ? 'text-myntra-gray' : 'text-myntra-gray font-semibold';
      
      generated.push({
        text: dayName,
        full: fullDateText,
        fee: feeText,
        feeClass
      });
    }
    return generated;
  });
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      {/* Dark Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 z-[100] transition-opacity" 
        onClick={onClose}
      ></div>
      
      {/* Bottom Sheet Container */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white z-[110] rounded-t-xl flex flex-col max-h-[85vh] bottom-sheet">
        
        {/* Sticky Header */}
        <div className="flex justify-between items-center p-4 border-b border-myntra-border">
          <h3 className="font-bold text-[16px] text-myntra-dark">Schedule Delivery</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px] text-myntra-dark">close</span>
          </button>
        </div>
        
        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-4 pb-24 no-scrollbar">
          <p className="text-[13px] text-myntra-gray mb-4">
            Select a date within the next 7 days to guarantee delivery for your event.
          </p>
          
          <div className="flex flex-col gap-3">
            {dates.map((d) => (
              <button 
                key={d.full}
                onClick={() => setSelected(d.full)}
                className={`flex justify-between items-center p-4 rounded-md border transition-all ${
                  selected === d.full 
                    ? 'border-myntra-pink bg-pink-50/30 shadow-sm' 
                    : 'border-myntra-border hover:border-gray-300'
                }`}
              >
                <div className="flex flex-col text-left">
                  <span className="font-bold text-[14px] text-myntra-dark">{d.text}</span>
                  <span className="text-[12px] text-myntra-gray mt-0.5">{d.full.split(', ')[1]}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[13px] ${d.feeClass}`}>{d.fee}</span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    selected === d.full ? 'border-myntra-pink bg-myntra-pink' : 'border-gray-300'
                  }`}>
                    {selected === d.full && (
                      <span className="material-symbols-outlined text-white text-[14px]">check</span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Sticky Fixed Footer */}
        <div className="absolute bottom-0 w-full p-4 bg-white border-t border-myntra-border">
          <button 
            disabled={!selected}
            onClick={() => {
              if (selected) {
                const selectedDateObj = dates.find(d => d.full === selected);
                const fee = selectedDateObj?.fee === '+ ₹99' ? 99 : 0;
                onConfirm(selected, fee);
              }
            }}
            className={`w-full py-3.5 rounded-[4px] font-bold text-[14px] uppercase tracking-wide transition-all ${
              selected 
                ? 'bg-myntra-pink text-white shadow-md' 
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            CONFIRM SELECTION
          </button>
        </div>
      </div>
    </>
  );
}

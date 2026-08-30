"use client";

import React, { useState, useEffect } from 'react';
import DateSelectorModal from './DateSelectorModal';

interface ValidationHubProps {
  productId: string;
  selectedDate: string | null;
  onDateSelected: (date: string | null, fee: number) => void;
}

export default function ValidationHub({ productId, selectedDate, onDateSelected }: ValidationHubProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (selectedDate) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            onDateSelected(null);
            return 15 * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [selectedDate, onDateSelected]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleConfirmDate = (date: string, fee: number) => {
    onDateSelected(date, fee);
    setIsModalOpen(false);
    setTimeLeft(15 * 60);
  };

  return (
    <>
      <div className="w-full mt-2 pt-2 border-t border-dashed border-gray-200">
        {!selectedDate ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-1.5">
              <span className="material-symbols-outlined text-myntra-green text-[14px]">check_circle</span>
              <span className="text-[11px] text-myntra-dark font-medium leading-tight mt-0.5">
                14 days return available
              </span>
            </div>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-between bg-pink-50/50 p-2 rounded-md border border-pink-100 mt-1 hover:bg-pink-50 transition-colors"
            >
              <div className="flex items-center gap-1.5 text-left">
                <span className="material-symbols-outlined text-myntra-pink text-[16px]">event_available</span>
                <span className="text-[11px] text-myntra-dark">
                  Need it for an event? <strong className="text-myntra-pink block">Schedule Delivery</strong>
                </span>
              </div>
              <span className="material-symbols-outlined text-myntra-pink text-[16px]">chevron_right</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-1.5 bg-green-50 p-2 rounded-md border border-green-200">
            <div className="flex items-start gap-1.5">
              <span className="material-symbols-outlined text-myntra-green text-[14px]">lock</span>
              <div className="flex flex-col">
                <span className="text-[11px] text-myntra-dark font-bold leading-tight">
                  Guaranteed Delivery on {selectedDate.split(', ')[1]} locked.
                </span>
                <span className="text-[10px] text-myntra-gray mt-1">
                  Move to Bag in <span className="text-myntra-pink font-bold">{formatTime(timeLeft)}</span> to secure slot.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <DateSelectorModal 
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmDate}
        />
      )}
    </>
  );
}

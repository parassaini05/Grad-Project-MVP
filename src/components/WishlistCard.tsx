import React, { useState } from 'react';
import ValidationHub from './ValidationHub';
import { Product, useWishlist } from './WishlistContext';

interface WishlistCardProps {
  product: Product;
}

export default function WishlistCard({ product }: WishlistCardProps) {
  const { removeFromWishlist, addToBag } = useWishlist();
  const [scheduledDate, setScheduledDate] = useState<string | null>(null);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);

  const handleMoveToBag = () => {
    addToBag(product, scheduledDate, deliveryFee);
    removeFromWishlist(product.id);
  };

  return (
    <div className="bg-white border border-myntra-border flex flex-col relative">
      <button 
        onClick={() => removeFromWishlist(product.id)}
        className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur rounded-full flex items-center justify-center z-10 shadow-sm text-gray-400 hover:text-myntra-dark"
      >
        <span className="material-symbols-outlined text-[16px]">close</span>
      </button>
      
      <div className="aspect-[3/4] relative w-full overflow-hidden">
        <img 
          className="w-full h-full object-cover" 
          src={product.image} 
          alt={product.name} 
        />
      </div>
      
      <div className="p-3 flex flex-col flex-grow">
        <div className="mb-1">
          <h2 className="font-bold text-[13px] text-myntra-dark truncate leading-tight">{product.brand}</h2>
          <p className="text-[11px] text-myntra-gray truncate mt-0.5">{product.name}</p>
        </div>
        
        {/* Removed strikethrough and discount as per user request */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2">
          <span className="font-bold text-[13px] text-myntra-dark">{product.price}</span>
        </div>
        
        {/* THE MVP INTERVENTION: Validation Hub */}
        <ValidationHub 
          productId={product.id} 
          selectedDate={scheduledDate} 
          onDateSelected={(date, fee) => {
            setScheduledDate(date);
            setDeliveryFee(fee || 0);
          }} 
        />
        
      </div>
      
      <div className="w-full border-t border-myntra-border">
        <button 
          onClick={handleMoveToBag}
          className="w-full py-3 text-myntra-pink font-bold text-[13px] uppercase tracking-wide hover:bg-pink-50 transition-colors"
        >
          MOVE TO BAG
        </button>
      </div>
    </div>
  );
}

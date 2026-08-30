"use client";

import React from 'react';
import Navbar from './Navbar';
import { useWishlist, Product } from './WishlistContext';

export default function LandingPage() {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const products: Product[] = [
    {
      id: 'prod_1',
      brand: 'EUME',
      name: 'Commute Nylon Messenger Laptop Bag',
      price: '₹3,999',
      originalPrice: '₹5,999',
      discount: '33% OFF',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAOR6m6ZG1sWUKMNYp7zs37a1hfVDqgRQU27qf7NeboZa02t1YJKC-dE_9MiKTqjLUXZCDgaOo-2YF1l4wd3qFW3dtj3I2inczB5elL46S_7kqs_x_-huGGxnAu-kA441JxHGrQQYANyId78ddNeK0_ItGxz2usdK53nFzAHX7CN7mUf7L90GBy0b5JrVj3wMZQYYMMhvPwnNlTQbMM-H6PwGhG31e63WIWM_Z7HHzOR2mct_H73HCCQ'
    },
    {
      id: 'prod_2',
      brand: 'Roadster',
      name: 'Men Oversized Pure Cotton T-shirt',
      price: '₹599',
      originalPrice: '₹1,299',
      discount: '53% OFF',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvZFiArnyulX2ejyhd6uggVhr5-2XEgu0Fwbqe8eiOQJkTV-XSCPgUdEYkCj6FHOeI_LwMLhYZXF1ctHfSum7xIC588F1G8EDAPbyCsUWO31I-N_R44Ulo9r4RsjH2pzGKAalWKec2bZiQfimASYKe4V5UKk8rUd0fJlYw8GZ3D05LGo0ylVyn53MOa3ZJeEdSkG415J2ef9MD8ol0RqoNYZZNN-UXc_g-asNMwAehmgm8wG2EfrYQzw'
    },
    {
      id: 'prod_3',
      brand: 'Puma',
      name: 'Unisex Trinity Sneakers',
      price: '₹3,299',
      originalPrice: '₹6,999',
      discount: '52% OFF',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB98kuuqmVjoc5GALRbfqfkmQ-ZryOu4pA7UCEO5w99qepdJJA7B8lSBLK4UWV2SJwhqEtKmPTt3hiPyC6PFcBUCX7cXPe5tWQm2Tyog-insU7ZvJKdWlBATpovW9nL8BkLbuMQb0UD63jvNyE2kFdVv11UVofCazzK_UfpYcf7_-E0P7ld9z1M76wFuIqJHj4gEkrYvzrkkV1gBTVt8fQzuDybBe_EY4A6NnapCQQr5xiu5Go3S5SnbQ'
    },
    {
      id: 'prod_4',
      brand: 'FRENCH CONNECTION',
      name: 'Floral A-Line Midi Dress',
      price: '₹2,499',
      originalPrice: '₹4,999',
      discount: '50% OFF',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATABwLMi74-osoB8cDqSqf6JU0uJKVsJ-R-fHST-v99pBzQqQdiusQ_PY4ZzzA-kgyZObF5RsSJ57swCo4d6SGSEYJ0L-4x3iUqdwGSWXMEeCUI_VciKxbP5kEGrZ6pJE0BZ5L7Y-QVUYtYhnmDHGGNf8FyAugDkdLAVCAPBrHsK_OiEbrtGzJDim7X4mrMl6vIbVgSq1Vol_ZStgWLMB4vj7kV_Yne7CwvxyK8C7xu9jKHMi9UV2ICA'
    }
  ];

  const handleWishlistClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto pb-6">
      <Navbar />
      
      {/* Mobile Hero Banner */}
      <div className="w-full bg-myntra-pink text-white aspect-[4/3] flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-white rounded-full mix-blend-overlay filter blur-xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-yellow-300 rounded-full mix-blend-overlay filter blur-xl"></div>
        </div>
        <div className="relative z-10 space-y-3 px-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-90">Biggest Fashion Sale</p>
          <h1 className="text-4xl font-black tracking-tighter leading-none">END OF<br/>SEASON<br/>SALE</h1>
          <p className="text-lg font-bold">50-80% OFF</p>
          <button className="mt-4 bg-white text-myntra-pink font-bold text-sm px-6 py-3 shadow-md uppercase">Shop Now</button>
        </div>
      </div>

      <div className="px-3 pt-6 pb-2">
        <h2 className="font-bold text-myntra-dark tracking-widest text-[13px] uppercase mb-4 text-center">Trending Right Now</h2>
      </div>
      
      {/* Mobile 2-Column Product Grid */}
      <div className="grid grid-cols-2 gap-1 px-1">
        {products.map(product => {
          const isSaved = isInWishlist(product.id);
          return (
            <div key={product.id} className="bg-white relative">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                {product.id === 'prod_2' && (
                  <div className="absolute bottom-2 left-2 bg-white/90 px-1.5 py-0.5 text-[9px] uppercase tracking-wider font-bold">Bestseller</div>
                )}
              </div>
              
              <button 
                onClick={(e) => handleWishlistClick(e, product)}
                className="absolute top-2 right-2 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-sm z-10"
              >
                <span 
                  className={`material-symbols-outlined text-[18px] transition-colors ${isSaved ? 'text-myntra-pink' : 'text-gray-400'}`}
                  style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}
                >
                  favorite
                </span>
              </button>
              
              <div className="p-2 flex flex-col">
                <h3 className="font-bold text-myntra-dark text-[13px] truncate">{product.brand}</h3>
                <p className="text-myntra-gray text-[11px] truncate mt-0.5">{product.name}</p>
                <div className="mt-1 flex flex-wrap items-center gap-1.5">
                  <span className="font-bold text-myntra-dark text-[13px]">{product.price}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

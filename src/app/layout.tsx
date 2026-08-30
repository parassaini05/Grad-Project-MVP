import type { Metadata } from "next";
import "./globals.css";
import { WishlistProvider } from "@/components/WishlistContext";

export const metadata: Metadata = {
  title: "Myntra Wishlist MVP",
  description: "Product Management MVP for solving wishlist delivery anxiety",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body className="antialiased min-h-screen text-[14px]">
        {/* Mobile App Container */}
        <div className="max-w-[480px] mx-auto bg-white min-h-screen relative shadow-2xl flex flex-col font-sans">
          <WishlistProvider>
            {children}
          </WishlistProvider>
        </div>
      </body>
    </html>
  );
}

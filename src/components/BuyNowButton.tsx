"use client";

import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, CreditCard } from 'lucide-react';

interface BuyNowButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity?: number;
  className?: string;
}

export default function BuyNowButton({ 
  product, 
  quantity = 1,
  className = ""
}: BuyNowButtonProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleBuyNow = () => {
    if (!session) {
      const callbackUrl = `/checkout?productId=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.price}&image=${encodeURIComponent(product.image)}&quantity=${quantity}`;
      router.push(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
      return;
    }
    const checkoutUrl = `/checkout?productId=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.price}&image=${encodeURIComponent(product.image)}&quantity=${quantity}`;
    router.push(checkoutUrl);
  };

  return (
    <button
      onClick={handleBuyNow}
      disabled={status === 'loading'}
      className={`
        flex items-center justify-center px-6 py-3 
        bg-linear-to-r from-orange-600 to-orange-500 
        hover:from-orange-500 hover:to-orange-400
        text-white font-bold rounded-xl 
        transition-all duration-300 
        disabled:opacity-50 disabled:cursor-not-allowed
        shadow-lg shadow-orange-500/30
        transform hover:scale-105 active:scale-95
        ${className}
      `}
    >
      <CreditCard className="w-5 h-5 mr-2" />
      {status === 'loading' ? 'Loading...' : 'Buy Now'}
    </button>
  );
}

// Alternative Add to Cart button (for future use)
export function AddToCartButton({ 
  product, 
  quantity = 1,
  className = ""
}: BuyNowButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleAddToCart = async () => {
    if (!session) {
      router.push('/auth/login');
      return;
    }

    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          quantity
        })
      });

      const data = await response.json();
      
      if (data.success) {
        // Show success message or update cart UI
        console.log('Added to cart successfully');
      }
    } catch (error) {
      console.error('Add to cart error:', error);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`
        flex items-center justify-center px-6 py-3 
        bg-gray-700 hover:bg-gray-600
        text-white font-bold rounded-xl 
        transition-all duration-300 
        border border-gray-600 hover:border-gray-500
        ${className}
      `}
    >
      <ShoppingCart className="w-5 h-5 mr-2" />
      Add to Cart
    </button>
  );
}
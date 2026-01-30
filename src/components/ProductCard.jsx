"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-3/4 overflow-hidden bg-gray-100">
          <img
            src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          {!product.inStock && (
            <div className="absolute top-4 left-4 bg-gray-800 text-white px-3 py-1 text-xs tracking-wider">
              SOLD OUT
            </div>
          )}
          {product.salePrice && (
            <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs tracking-wider">
              SALE
            </div>
          )}
        </div>
      </Link>

      {/* Wishlist button */}
      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="absolute top-4 right-4 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100"
      >
        <Heart 
          size={18} 
          className={isWishlisted ? 'fill-black' : ''}
        />
      </button>

      {/* Product info */}
      <div className="mt-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-light tracking-wide hover:text-gray-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-2">
          {product.salePrice ? (
            <>
              <span className="text-sm font-medium">${product.salePrice.toFixed(2)}</span>
              <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-sm font-medium">${product.price.toFixed(2)}</span>
          )}
        </div>
        {product.colors && product.colors.length > 0 && (
          <div className="flex gap-1 mt-2">
            {product.colors.slice(0, 4).map((color, idx) => (
              <div
                key={idx}
                className="w-5 h-5 rounded-full border border-gray-300"
                style={{ backgroundColor: color.toLowerCase().includes('black') ? '#000' : color.toLowerCase().includes('white') ? '#fff' : '#D4C5B9' }}
                title={color}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
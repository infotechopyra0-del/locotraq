'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Minus, 
  Plus, 
  ArrowLeft,
  Shield,
  Truck,
  RefreshCw,
  Award
} from 'lucide-react';
import type { GPSProducts } from '@/lib/products';

interface ProductDetailClientProps {
  product: GPSProducts;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleBuyNow = () => {
    const message = encodeURIComponent(
      `Hi! I want to buy ${product.productName}\nPrice: ₹${product.price.toLocaleString('en-IN')}\nQuantity: ${quantity}\nTotal: ₹${(product.price * quantity).toLocaleString('en-IN')}\n\nPlease provide more details about delivery and payment options.`
    );
    window.open(`https://wa.me/916390057777?text=${message}`, '_blank');
  };

  const increaseQuantity = () => {
    if (quantity < product.stockQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const images = product.images || [product.productImage];
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-[#F9F9F9] pt-8 pb-16">
      <div className="max-w-[1400px] mx-auto px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-secondary mb-6">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary">Products</Link>
          <span>/</span>
          <span className="text-foreground">{product.category}</span>
          <span>/</span>
          <span className="text-foreground truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <Image
                src={images[selectedImage]}
                alt={product.imageAlt}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <div className="flex space-x-4 overflow-x-auto">
              {images.map((image: string, index: number) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedImage(index)}
                  className={`shrink-0 w-20 h-20 bg-white rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary">{product.category}</Badge>
                <Badge variant="outline">{product.subcategory}</Badge>
                {product.isFeatured && <Badge className="bg-[#D4A574] text-white">Featured</Badge>}
              </div>
              
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {product.productName}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-secondary">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-primary">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <Badge className="bg-green-100 text-green-800">
                  {discount}% OFF
                </Badge>
              </div>
              <p className="text-sm text-secondary">
                Inclusive of all taxes
              </p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`h-3 w-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock 
                  ? `In Stock (${product.stockQuantity} units available)` 
                  : 'Out of Stock'
                }
              </span>
            </div>

            {/* Quantity Selector */}
            {product.inStock && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 border border-gray-300 rounded-md min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={increaseQuantity}
                      disabled={quantity >= product.stockQuantity}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Total Price */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Price:</span>
                    <span className="text-2xl font-bold text-primary">
                      ₹{(product.price * quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.inStock ? 'Buy Now via WhatsApp' : 'Out of Stock'}
              </Button>
              
              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1">
                  <Heart className="mr-2 h-4 w-4" />
                  Wishlist
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Key Features:</h3>
              <ul className="space-y-2">
                {product.features.slice(0, 4).map((feature: string, index: number) => (
                  <li key={index} className="flex items-center text-sm text-secondary">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-lg">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm">2 Year Warranty</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-sm">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <RefreshCw className="h-5 w-5 text-primary" />
                <span className="text-sm">Easy Returns</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-primary" />
                <span className="text-sm">Certified Product</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                  <p className="text-secondary leading-relaxed">
                    {product.description}
                  </p>
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">What&apos;s in the box:</h4>
                    <ul className="list-disc list-inside space-y-1 text-secondary">
                      <li>1x {product.name}</li>
                      <li>1x User Manual</li>
                      <li>1x Installation Kit</li>
                      <li>1x Charging Cable</li>
                      <li>2 Years Warranty Card</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                        <span className="font-medium text-foreground">{key}:</span>
                        <span className="text-secondary">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="features" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                        <span className="text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="text-3xl font-bold text-primary">{product.rating}</div>
                      <div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating) 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-secondary">{product.reviewCount} reviews</p>
                      </div>
                    </div>
                    
                    {/* Mock Reviews */}
                    <div className="space-y-4">
                      <div className="border-b pb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <span className="font-medium">Rajesh Kumar</span>
                          <span className="text-sm text-secondary">• 2 weeks ago</span>
                        </div>
                        <p className="text-secondary">
                          Excellent GPS tracker! Very accurate and easy to use. Highly recommended for vehicle tracking.
                        </p>
                      </div>
                      
                      <div className="border-b pb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex">
                            {[...Array(4)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                            <Star className="h-4 w-4 text-gray-300" />
                          </div>
                          <span className="font-medium">Priya Singh</span>
                          <span className="text-sm text-secondary">• 1 month ago</span>
                        </div>
                        <p className="text-secondary">
                          Good product with reliable tracking. Battery life could be better but overall satisfied.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Back to Products */}
        <div className="mt-12 text-center">
          <Link href="/products">
            <Button variant="outline" size="lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
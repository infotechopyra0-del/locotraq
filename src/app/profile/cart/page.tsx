"use client";
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { 
  ShoppingCart, Trash2, Plus, Minus, ArrowRight, Shield, 
  Truck, Tag, AlertCircle, Lock, CreditCard, Heart,
  Gift, Percent, ChevronRight, Package, Clock, Loader
} from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Header';

interface CartItem {
  id: string;
  productId: string;
  productName: string;
  price: number;
  originalPrice: number;
  quantity: number;
  productImage: string;
  category: string;
  inStock: boolean;
  maxQuantity: number;
}

interface PromoCode {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
}

const CartPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [promoError, setPromoError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const checkAuthAndFetchCart = async () => {
      try {
        // Check session/cookies
        const sessionResponse = await fetch('/api/auth/session');
        
        if (!sessionResponse.ok) {
          console.error('Session fetch failed:', sessionResponse.statusText);
          setIsAuthenticated(false);
          setCartItems([]);
          setLoading(false);
          return;
        }
        
        // Check if response is JSON
        const contentType = sessionResponse.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.error('Session API returned non-JSON response, likely redirected');
          setIsAuthenticated(false);
          setCartItems([]);
          setLoading(false);
          return;
        }
        
        const sessionData = await sessionResponse.json();
        console.log('Session data:', sessionData);
        if (sessionData?.user?.email) {
          setIsAuthenticated(true);
          setUserEmail(sessionData.user.email);
          // Fetch cart data from database for this user
          const cartResponse = await fetch(`/api/cart?email=${encodeURIComponent(sessionData.user.email)}`);
          
          if (cartResponse.ok) {
            const contentType = cartResponse.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
              const cartData = await cartResponse.json();
              console.log('Cart data from database:', cartData);
              setCartItems(cartData.items || []);
            } else {
              console.warn('Cart API returned non-JSON response');
              setCartItems([]);
            }
          } else {
            console.log('Cart API request failed:', cartResponse.status, cartResponse.statusText);
            setCartItems([]);
          }
        } else {
          // User not authenticated - middleware should handle redirect
          console.log('No session found, user will be redirected by middleware');
          setIsAuthenticated(false);
          setCartItems([]);
        }
      } catch (error) {
        console.error('Error checking auth or fetching cart:', error);
        setIsAuthenticated(false);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchCart();
  }, []);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader className="animate-spin h-12 w-12 text-orange-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading your cart...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Login Required</h1>
            <p className="text-gray-600">Please login to view your cart</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  const validPromoCodes: PromoCode[] = [
    { code: 'SAVE10', discount: 10, type: 'percentage' },
    { code: 'FLAT500', discount: 500, type: 'fixed' },
    { code: 'NEWYEAR40', discount: 40, type: 'percentage' }
  ];
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = cartItems.reduce((sum, item) => 
    sum + ((item.originalPrice - item.price) * item.quantity), 0
  );
  const shipping = subtotal >= 10000 ? 0 : 150;
  let discount = 0;
  if (appliedPromo) {
    discount = appliedPromo.type === 'percentage' 
      ? (subtotal * appliedPromo.discount) / 100 
      : appliedPromo.discount;
  }
  const tax = Math.round((subtotal - discount) * 0.18);
  const total = subtotal - discount + shipping + tax;

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(items =>
      items.map(item => {
        if (item.id === id) {
          const validQuantity = Math.min(newQuantity, item.maxQuantity);
          return { ...item, quantity: validQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    const promo = validPromoCodes.find(
      p => p.code.toLowerCase() === promoCode.toLowerCase()
    );
    
    if (promo) {
      setAppliedPromo(promo);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code');
      setAppliedPromo(null);
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoCode('');
    setPromoError('');
  };

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      toast.info('Proceeding to checkout...');
      setIsProcessing(false);
    }, 1500);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="inline-block bg-orange-100 p-6 rounded-full mb-6">
              <ShoppingCart className="w-16 h-16 text-orange-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. 
              Start shopping and discover our amazing GPS tracking devices!
            </p>
            <a
              href="/products"
              className="inline-flex items-center bg-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Shopping
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />
      {/* Trust Bar */}
      <div className="bg-orange-50 border-y border-orange-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Shield, text: 'Secure Checkout' },
              { icon: Truck, text: 'Free Shipping ₹10K+' },
              { icon: Package, text: 'Easy Returns' },
              { icon: Lock, text: '100% Safe Payment' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-center space-x-2">
                <item.icon className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-semibold text-gray-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id || item.productId}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 md:p-6"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <div className="shrink-0">
                    <div className="relative w-full sm:w-32 h-32 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-bold text-sm">Out of Stock</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 pr-4">
                        <span className="inline-block bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded mb-2">
                          {item.category}
                        </span>
                        <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-2">
                          {item.productName}
                        </h3>
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-2xl font-black text-gray-900">
                            ₹{item.price.toLocaleString()}
                          </span>
                          {item.originalPrice > item.price && (
                            <>
                              <span className="text-sm text-gray-500 line-through">
                                ₹{item.originalPrice.toLocaleString()}
                              </span>
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">
                                Save ₹{(item.originalPrice - item.price).toLocaleString()}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      {/* Remove Button - Desktop */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="hidden sm:block text-gray-400 hover:text-red-600 transition-colors p-2"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Quantity & Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600 font-semibold">Quantity:</span>
                        <div className="flex items-center border-2 border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 font-bold text-gray-900 min-w-12 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.maxQuantity}
                            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Remove Button - Mobile */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="sm:hidden flex items-center text-red-600 font-semibold text-sm"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Remove
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Subtotal:</span>
                        <span className="text-xl font-black text-orange-600">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping - Mobile */}
            <a
              href="/products"
              className="md:hidden flex items-center justify-center bg-white text-orange-600 px-6 py-4 rounded-xl font-bold border-2 border-orange-600 hover:bg-orange-50 transition-colors"
            >
              <ChevronRight className="w-5 h-5 rotate-180 mr-2" />
              Continue Shopping
            </a>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
              <h2 className="text-2xl font-black text-gray-900 mb-6 pb-4 border-b border-gray-200">
                Order Summary
              </h2>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Have a Promo Code?
                </label>
                {appliedPromo ? (
                  <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Tag className="w-5 h-5 text-green-600 mr-2" />
                        <div>
                          <div className="font-bold text-green-700">{appliedPromo.code}</div>
                          <div className="text-sm text-green-600">
                            {appliedPromo.type === 'percentage' 
                              ? `${appliedPromo.discount}% OFF` 
                              : `₹${appliedPromo.discount} OFF`}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={removePromoCode}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => {
                          setPromoCode(e.target.value.toUpperCase());
                          setPromoError('');
                        }}
                        placeholder="Enter code"
                        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                      />
                      <button
                        onClick={applyPromoCode}
                        disabled={!promoCode}
                        className="bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <div className="flex items-center mt-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {promoError}
                      </div>
                    )}
                    <div className="mt-3 text-xs text-gray-500">
                      Try: SAVE10, FLAT500, NEWYEAR40
                    </div>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                </div>

                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center">
                      <Gift className="w-4 h-4 mr-1" />
                      Total Savings
                    </span>
                    <span className="font-bold">-₹{savings.toLocaleString()}</span>
                  </div>
                )}

                {appliedPromo && (
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center">
                      <Percent className="w-4 h-4 mr-1" />
                      Promo Discount
                    </span>
                    <span className="font-bold">-₹{discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-700">
                  <span className="flex items-center">
                    <Truck className="w-4 h-4 mr-1" />
                    Shipping
                  </span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>

                {shipping > 0 && subtotal < 10000 && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <p className="text-xs text-orange-700">
                      Add ₹{(10000 - subtotal).toLocaleString()} more for FREE shipping!
                    </p>
                    <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-orange-600 rounded-full transition-all duration-500"
                        style={{ width: `${(subtotal / 10000) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-between text-gray-700">
                  <span>Tax (GST 18%)</span>
                  <span className="font-semibold">₹{tax.toLocaleString()}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200">
                <span className="text-xl font-bold text-gray-900">Total Amount</span>
                <span className="text-3xl font-black text-orange-600">
                  ₹{total.toLocaleString()}
                </span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center mb-4"
              >
                {isProcessing ? (
                  <span className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Lock className="w-5 h-5 mr-2" />
                    Proceed to Checkout
                  </span>
                )}
              </button>

              {/* Payment Methods */}
              <div className="flex items-center justify-center space-x-3 text-gray-500 text-sm">
                <CreditCard className="w-5 h-5" />
                <span>We accept all major payment methods</span>
              </div>
            </div>

            {/* Recommendations */}
            <div className="mt-6 bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                <Heart className="w-5 h-5 text-orange-600 mr-2" />
                You May Also Like
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Complete your setup with these popular items
              </p>
              <a
                href="/products"
                className="text-orange-600 font-bold text-sm hover:text-orange-700 flex items-center"
              >
                Browse Recommendations
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/*Footer*/}
      <Footer />
    </div>
  );
};

export default CartPage;
"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  XCircle, AlertCircle, RefreshCw, ArrowLeft, 
  CreditCard, Phone, Mail, Home, Loader2
} from 'lucide-react';

function PaymentFailedContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [retrying, setRetrying] = useState(false);
  
  const orderId = searchParams.get('orderId');
  const error = searchParams.get('error') || 'Payment could not be processed';

  const handleRetryPayment = async () => {
    setRetrying(true);
    
    try {
      if (orderId) {
        router.push(`/checkout?retry=${orderId}`);
      } else {
        router.push('/products');
      }
    } catch (error) {
      console.error('Retry payment error:', error);
    } finally {
      setRetrying(false);
    }
  };

  const handleContactSupport = () => {
    // In a real implementation, open support chat or redirect to support page
    router.push('/support');
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700/50 max-w-2xl w-full text-center">
        {/* Failure Icon */}
        <div className="relative mx-auto mb-6">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
            <XCircle className="w-12 h-12 text-red-500" />
          </div>
          <div className="absolute inset-0 bg-red-500/20 rounded-full animate-pulse"></div>
        </div>

        {/* Failure Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Payment Failed
        </h1>
        <p className="text-gray-400 text-lg mb-2">
          We couldn't process your payment at this time.
        </p>
        <p className="text-red-400 text-sm mb-8 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
          {error}
        </p>

        {/* Common Reasons */}
        <div className="bg-gray-900/50 rounded-xl p-6 mb-8 text-left">
          <div className="flex items-center mb-4">
            <AlertCircle className="w-5 h-5 text-orange-500 mr-2" />
            <h3 className="text-lg font-bold text-white">Common Reasons for Payment Failure</h3>
          </div>
          
          <ul className="text-gray-300 space-y-2 text-sm">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 shrink-0"></span>
              Insufficient balance in your account
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 shrink-0"></span>
              Network connectivity issues
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 shrink-0"></span>
              Card details entered incorrectly
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 shrink-0"></span>
              Card expired or blocked by bank
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 shrink-0"></span>
              Transaction limits exceeded
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleRetryPayment}
            disabled={retrying}
            className="w-full bg-orange-600 hover:bg-orange-500 text-white py-3 px-6 rounded-xl font-bold transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {retrying ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Retrying...
              </>
            ) : (
              <>
                <RefreshCw className="w-5 h-5 mr-2" />
                Try Again
              </>
            )}
          </button>
          
          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={handleContactSupport}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 px-6 rounded-xl font-bold transition-colors flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Contact Support
            </button>
            
            <button
              onClick={() => router.push('/products')}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-xl font-bold transition-colors flex items-center justify-center"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Shopping
            </button>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl">
          <h4 className="font-semibold text-blue-400 mb-2">Need Help?</h4>
          <p className="text-blue-300 text-sm mb-3">
            If you continue to face issues, please contact our support team:
          </p>
          <div className="flex flex-col md:flex-row gap-2 text-sm">
            <a 
              href="mailto:support@locotraq.com" 
              className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Mail className="w-4 h-4 mr-1" />
              support@locotraq.com
            </a>
            <span className="hidden md:inline text-gray-500">|</span>
            <a 
              href="tel:+918000000000" 
              className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Phone className="w-4 h-4 mr-1" />
              +91 80000 00000
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentFailedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    }>
      <PaymentFailedContent />
    </Suspense>
  );
}
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-green-900 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h1 className="text-4xl font-bold mb-4">Order Successful!</h1>
      <p className="text-xl mb-8">
        Thank you for your purchase. Your order has been received and is being processed.
      </p>
      
      {orderId && (
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-2">Order Information</h2>
          <p className="text-gray-300 mb-4">Your order number: <span className="font-bold">{orderId}</span></p>
          <p className="text-gray-300">
            You will receive an email confirmation shortly with details of your order.
          </p>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link 
          href="/"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition"
        >
          Return to Home
        </Link>
        <Link 
          href="/products"
          className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-md transition"
        >
          Continue Shopping
        </Link>
      </div>
      
      {countdown > 0 && (
        <p className="mt-8 text-gray-400">
          Redirecting to homepage in {countdown} seconds...
        </p>
      )}
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <Suspense fallback={
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        }>
          <SuccessContent />
        </Suspense>
      </div>
    </div>
  );
}

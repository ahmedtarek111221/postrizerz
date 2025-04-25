'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CancelPage() {
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
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-red-900 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Payment Cancelled</h1>
          <p className="text-xl mb-8">
            Your payment was cancelled. No charges have been made to your account.
          </p>
          
          <div className="bg-gray-900 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-2">What happened?</h2>
            <p className="text-gray-300 mb-4">
              Your payment process was cancelled. This could be because:
            </p>
            <ul className="text-gray-300 list-disc list-inside text-left">
              <li>You chose to cancel the payment</li>
              <li>There was an issue with the payment method</li>
              <li>The session timed out</li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/checkout"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition"
            >
              Try Again
            </Link>
            <Link 
              href="/cart"
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-md transition"
            >
              Return to Cart
            </Link>
          </div>
          
          {countdown > 0 && (
            <p className="mt-8 text-gray-400">
              Redirecting to cart in {countdown} seconds...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

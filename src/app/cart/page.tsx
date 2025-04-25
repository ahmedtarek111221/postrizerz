import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Shopping Cart - Postrizerz',
  description: 'View and manage items in your shopping cart.',
};

export default function CartPage() {
  // Sample cart items
  const cartItems = [
    {
      id: 2,
      name: 'Batman Poster',
      price: 199.00,
      image: '/images/batman-poster.jpg',
      quantity: 1
    },
    {
      id: 5,
      name: 'Joker Movie Poster',
      price: 199.00,
      image: '/images/joker-poster.jpg',
      quantity: 2
    }
  ];

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 50.00;
  const total = subtotal + shipping;

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900 rounded-lg p-6">
                <div className="mb-4 pb-4 border-b border-gray-800">
                  <h2 className="text-xl font-semibold">Cart Items ({cartItems.reduce((total, item) => total + item.quantity, 0)})</h2>
                </div>
                
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center py-4 border-b border-gray-800">
                    <div className="w-20 h-20 bg-gray-800 rounded-md mr-4"></div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-400">{item.price.toFixed(2)}EGP</p>
                    </div>
                    <div className="flex items-center">
                      <button className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-md">-</button>
                      <span className="mx-3">{item.quantity}</span>
                      <button className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-md">+</button>
                    </div>
                    <div className="ml-6 text-right">
                      <p className="font-bold">{(item.price * item.quantity).toFixed(2)}EGP</p>
                      <button className="text-red-500 text-sm mt-1">Remove</button>
                    </div>
                  </div>
                ))}
                
                <div className="mt-6 flex justify-between">
                  <Link href="/products" className="text-blue-400 hover:underline">
                    ← Continue Shopping
                  </Link>
                  <button className="text-red-500">Clear Cart</button>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-gray-900 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 pb-4 border-b border-gray-800">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{subtotal.toFixed(2)}EGP</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping.toFixed(2)}EGP</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-800">
                    <span>Total</span>
                    <span>{total.toFixed(2)}EGP</span>
                  </div>
                </div>
                
                <Link 
                  href="/checkout" 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md transition text-center block font-medium"
                >
                  Proceed to Checkout
                </Link>
                
                <div className="mt-6 pt-6 border-t border-gray-800">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center">
                      <span className="mr-2">🛒</span>
                      <span>Cash on Delivery</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">🚚</span>
                      <span>Fast Shipping</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">↩️</span>
                      <span>Free Returns</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link 
              href="/products" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition inline-block"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

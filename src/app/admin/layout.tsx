// src/app/admin/layout.tsx
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Postrizerz',
  description: 'Admin dashboard for managing products, orders, and users',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-black p-4 hidden md:block">
        <div className="mb-8">
          <Link href="/admin" className="text-xl font-bold">
            Postrizerz Admin
          </Link>
        </div>
        
        <nav className="space-y-1">
          <Link 
            href="/admin" 
            className="block py-2 px-4 rounded hover:bg-gray-800 transition"
          >
            Dashboard
          </Link>
          <Link 
            href="/admin/products" 
            className="block py-2 px-4 rounded hover:bg-gray-800 transition"
          >
            Products
          </Link>
          <Link 
            href="/admin/orders" 
            className="block py-2 px-4 rounded hover:bg-gray-800 transition"
          >
            Orders
          </Link>
          <Link 
            href="/admin/users" 
            className="block py-2 px-4 rounded hover:bg-gray-800 transition"
          >
            Users
          </Link>
          <Link 
            href="/" 
            className="block py-2 px-4 rounded hover:bg-gray-800 transition"
          >
            View Store
          </Link>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-black p-4 shadow">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span>Admin User</span>
              <button className="text-sm text-gray-400 hover:text-white transition">
                Logout
              </button>
            </div>
          </div>
        </header>
        
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

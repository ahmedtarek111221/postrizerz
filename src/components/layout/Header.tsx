import Link from 'next/link';
import { ShoppingCart, Search, User } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-black text-white">
      <div className="bg-blue-400 py-2 text-center">
        <p className="text-sm">Transform Your Space with Our Curated Poster Collection. Enjoy Your Shopping!</p>
      </div>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-xl font-bold">
            <Image 
              src="/logo.png" 
              alt="Postrizerz" 
              width={150} 
              height={50}
              className="h-12 w-auto"
            />
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/products" className="hover:text-blue-400 transition">
              Products
            </Link>
            <Link href="/about" className="hover:text-blue-400 transition">
              About
            </Link>
            <Link href="/contact" className="hover:text-blue-400 transition">
              Contacts
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/search" className="hover:text-blue-400 transition">
            <Search size={20} />
          </Link>
          <Link href="/account" className="hover:text-blue-400 transition">
            <User size={20} />
          </Link>
          <Link href="/cart" className="hover:text-blue-400 transition relative">
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

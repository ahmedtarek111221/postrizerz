// src/components/ProductCard.tsx
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  id: number;
  name: string;
  slug: string;
  price: number;
  image_url: string;
}

export default function ProductCard({ id, name, slug, price, image_url }: ProductCardProps) {
  return (
    <Link 
      href={`/products/${slug}`} 
      className="bg-black border border-gray-800 rounded-lg overflow-hidden hover:border-blue-500 transition group"
    >
      <div className="aspect-square relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 z-10"></div>
        <div 
          className="h-full w-full bg-gray-800"
          style={{ backgroundImage: `url(${image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        ></div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2 group-hover:text-blue-400 transition">{name}</h3>
        <p className="text-2xl font-bold">{formatPrice(price)}</p>
      </div>
    </Link>
  );
}

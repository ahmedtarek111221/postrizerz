'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/lib/db';
import ProductCard from '@/components/ProductCard';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${slug}`);
        const data = await res.json();
        
        if (res.ok) {
          setProduct(data.product);
          setRelatedProducts(data.relatedProducts);
        } else {
          console.error('Error fetching product:', data.error);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  function handleAddToCart() {
    // This will be implemented in the cart integration step
    alert(`Added ${quantity} of ${product?.name} to cart`);
  }

  function handleBuyNow() {
    // This will be implemented in the checkout integration step
    alert(`Proceeding to checkout with ${quantity} of ${product?.name}`);
  }

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-black text-white min-h-screen">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-8">The product you are looking for does not exist or has been removed.</p>
          <Link href="/products" className="text-blue-400 hover:underline">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-4">
          <Link href="/products" className="text-blue-400 hover:underline">
            ← Back to Products
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div 
            className="bg-gray-800 rounded-lg overflow-hidden aspect-square"
            style={{ backgroundImage: `url(${product.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-4xl font-bold mb-6">{formatPrice(product.price)}</p>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-300">{product.description}</p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Features</h2>
              <ul className="list-disc list-inside text-gray-300">
                <li>High-quality wooden material</li>
                <li>Vibrant colors that won't fade</li>
                <li>Easy to hang on any wall</li>
                <li>Dimensions: 30cm x 40cm</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Quantity</h2>
              <div className="flex items-center">
                <button 
                  className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-md"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="mx-4 w-8 text-center">{quantity}</span>
                <button 
                  className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-md"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                >
                  +
                </button>
                <span className="ml-4 text-gray-400">
                  {product.stock} available
                </span>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button 
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition flex-1"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <button 
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md transition flex-1"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-800">
              <div className="flex items-center gap-6">
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
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {relatedProducts.map((product) => (
                <ProductCard 
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  slug={product.slug}
                  price={product.price}
                  image_url={product.image_url}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

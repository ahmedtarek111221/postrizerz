// src/app/products/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { Product, Category } from '@/lib/db';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch categories
        const categoriesRes = await fetch('/api/categories');
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData.categories);

        // Fetch products
        const productsRes = await fetch('/api/products');
        const productsData = await productsRes.json();
        setProducts(productsData.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  async function filterByCategory(categorySlug: string | null) {
    setLoading(true);
    setActiveCategory(categorySlug);

    try {
      let url = '/api/products';
      if (categorySlug) {
        url += `?category=${categorySlug}`;
      }
      
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Error filtering products:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">All Products</h1>
        
        {/* Categories filter */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => filterByCategory(null)}
              className={`px-4 py-2 rounded-md transition ${activeCategory === null ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'}`}
            >
              All
            </button>
            {categories.map((category) => (
              <button 
                key={category.id}
                onClick={() => filterByCategory(category.slug)}
                className={`px-4 py-2 rounded-md transition ${activeCategory === category.slug ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Products grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product) => (
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
            ) : (
              <div className="text-center py-12">
                <p className="text-xl">No products found in this category.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

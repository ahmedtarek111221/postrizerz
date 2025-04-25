'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/lib/db';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  async function handleDeleteProduct(id: number) {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    // In a real implementation, this would call an API to delete the product
    // For now, we'll just remove it from the local state
    setProducts(products.filter(product => product.id !== id));
    alert('Product deleted successfully');
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link 
          href="/admin/products/new" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
        >
          Add New Product
        </Link>
      </div>
      
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-700">
                <th className="pb-3 pr-4">ID</th>
                <th className="pb-3 pr-4">Image</th>
                <th className="pb-3 pr-4">Name</th>
                <th className="pb-3 pr-4">Category</th>
                <th className="pb-3 pr-4">Price</th>
                <th className="pb-3 pr-4">Stock</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-700">
                  <td className="py-3 pr-4">{product.id}</td>
                  <td className="py-3 pr-4">
                    <div 
                      className="w-12 h-12 bg-gray-700 rounded"
                      style={{ backgroundImage: `url(${product.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    ></div>
                  </td>
                  <td className="py-3 pr-4">{product.name}</td>
                  <td className="py-3 pr-4">{product.category_id}</td>
                  <td className="py-3 pr-4">{formatPrice(product.price)}</td>
                  <td className="py-3 pr-4">{product.stock}</td>
                  <td className="py-3 flex space-x-2">
                    <Link 
                      href={`/admin/products/edit/${product.id}`} 
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

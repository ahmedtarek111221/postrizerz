'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { slugify } from '@/lib/utils';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '10',
    category_id: '1',
    image_url: '/images/placeholder.jpg'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate form
      if (!formData.name || !formData.description || !formData.price) {
        throw new Error('Please fill in all required fields');
      }

      // In a real implementation, this would call an API to create the product
      // For now, we'll just simulate a successful creation
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redirect to products page
      router.push('/admin/products');
      alert('Product created successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link 
          href="/admin/products" 
          className="text-blue-400 hover:text-blue-300 mr-4"
        >
          ← Back to Products
        </Link>
        <h1 className="text-2xl font-bold">Add New Product</h1>
      </div>
      
      {error && (
        <div className="bg-red-900 text-white p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      <div className="bg-gray-800 rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Product Name *</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Price (EGP) *</label>
              <input 
                type="number" 
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Stock *</label>
              <input 
                type="number" 
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                min="0"
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <select 
              name="category_id"
              value={formData.category_id}
              onChange={handleInputChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="1">Movies</option>
              <option value="2">TV Shows</option>
              <option value="3">Games</option>
              <option value="4">Anime</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Image URL *</label>
            <input 
              type="text" 
              name="image_url"
              value={formData.image_url}
              onChange={handleInputChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-sm text-gray-400 mt-1">
              Enter the URL of the product image. For local images, use the format: /images/filename.jpg
            </p>
          </div>
          
          <div className="flex justify-end space-x-4">
            <Link 
              href="/admin/products" 
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition"
            >
              Cancel
            </Link>
            <button 
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-md transition ${
                loading 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {loading ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

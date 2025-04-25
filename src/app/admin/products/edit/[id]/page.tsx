'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Product } from '@/lib/db';

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const router = useRouter();
  const { id } = params;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category_id: '',
    image_url: ''
  });

  useEffect(() => {
    async function fetchProduct() {
      try {
        // In a real implementation, this would fetch the product from the API
        // For now, we'll simulate fetching product data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock product data
        const product = {
          id: parseInt(id),
          name: 'Batman Poster',
          slug: 'batman-poster',
          description: 'High-quality wooden poster featuring Batman on a striking red background. Perfect for fans of DC comics and movies.',
          price: 199.00,
          stock: 25,
          category_id: 1,
          image_url: '/images/batman-poster.jpg',
          created_at: '2025-04-25'
        };
        
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price.toString(),
          stock: product.stock.toString(),
          category_id: product.category_id.toString(),
          image_url: product.image_url
        });
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product data');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      // Validate form
      if (!formData.name || !formData.description || !formData.price) {
        throw new Error('Please fill in all required fields');
      }

      // In a real implementation, this would call an API to update the product
      // For now, we'll just simulate a successful update
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redirect to products page
      router.push('/admin/products');
      alert('Product updated successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link 
          href="/admin/products" 
          className="text-blue-400 hover:text-blue-300 mr-4"
        >
          ← Back to Products
        </Link>
        <h1 className="text-2xl font-bold">Edit Product</h1>
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
              disabled={saving}
              className={`px-4 py-2 rounded-md transition ${
                saving 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// src/app/admin/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  recentOrders: any[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, this would fetch actual data from the API
    // For now, we'll use mock data
    setTimeout(() => {
      setStats({
        totalProducts: 15,
        totalOrders: 24,
        totalUsers: 18,
        recentOrders: [
          { id: 'ORD-123456-7890', customer: 'Ahmed Mohamed', date: '2025-04-25', total: 647, status: 'completed' },
          { id: 'ORD-123456-7891', customer: 'Sara Ahmed', date: '2025-04-24', total: 398, status: 'processing' },
          { id: 'ORD-123456-7892', customer: 'Mohamed Ali', date: '2025-04-23', total: 199, status: 'completed' },
          { id: 'ORD-123456-7893', customer: 'Fatima Hassan', date: '2025-04-22', total: 749, status: 'completed' },
          { id: 'ORD-123456-7894', customer: 'Omar Khaled', date: '2025-04-21', total: 398, status: 'cancelled' },
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Total Products</h2>
          <p className="text-3xl font-bold">{stats.totalProducts}</p>
          <Link href="/admin/products" className="text-sm text-blue-200 hover:text-white mt-2 inline-block">
            Manage Products →
          </Link>
        </div>
        
        <div className="bg-gradient-to-r from-green-900 to-green-700 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Total Orders</h2>
          <p className="text-3xl font-bold">{stats.totalOrders}</p>
          <Link href="/admin/orders" className="text-sm text-green-200 hover:text-white mt-2 inline-block">
            View Orders →
          </Link>
        </div>
        
        <div className="bg-gradient-to-r from-purple-900 to-purple-700 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Total Users</h2>
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
          <Link href="/admin/users" className="text-sm text-purple-200 hover:text-white mt-2 inline-block">
            Manage Users →
          </Link>
        </div>
      </div>
      
      {/* Recent Orders */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm text-blue-400 hover:text-blue-300">
            View All
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-700">
                <th className="pb-3 pr-4">Order ID</th>
                <th className="pb-3 pr-4">Customer</th>
                <th className="pb-3 pr-4">Date</th>
                <th className="pb-3 pr-4">Total</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-700">
                  <td className="py-3 pr-4">{order.id}</td>
                  <td className="py-3 pr-4">{order.customer}</td>
                  <td className="py-3 pr-4">{order.date}</td>
                  <td className="py-3 pr-4">{order.total.toFixed(2)} EGP</td>
                  <td className="py-3 pr-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      order.status === 'completed' ? 'bg-green-900 text-green-200' :
                      order.status === 'processing' ? 'bg-blue-900 text-blue-200' :
                      'bg-red-900 text-red-200'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <Link href={`/admin/orders/${order.id}`} className="text-blue-400 hover:text-blue-300">
                      View
                    </Link>
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

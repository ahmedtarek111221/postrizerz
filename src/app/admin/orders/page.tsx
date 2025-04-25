'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  items: {
    id: number;
    name: string;
    quantity: number;
    price: number;
  }[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, this would fetch actual data from the API
    // For now, we'll use mock data
    setTimeout(() => {
      setOrders([
        { 
          id: 'ORD-123456-7890', 
          customer: 'Ahmed Mohamed', 
          date: '2025-04-25', 
          total: 647, 
          status: 'completed',
          items: [
            { id: 2, name: 'Batman Poster', quantity: 1, price: 199 },
            { id: 5, name: 'Joker Movie Poster', quantity: 2, price: 199 }
          ]
        },
        { 
          id: 'ORD-123456-7891', 
          customer: 'Sara Ahmed', 
          date: '2025-04-24', 
          total: 398, 
          status: 'processing',
          items: [
            { id: 2, name: 'Batman Poster', quantity: 2, price: 199 }
          ]
        },
        { 
          id: 'ORD-123456-7892', 
          customer: 'Mohamed Ali', 
          date: '2025-04-23', 
          total: 199, 
          status: 'completed',
          items: [
            { id: 11, name: 'Cyberpunk 2077 Poster', quantity: 1, price: 199 }
          ]
        },
        { 
          id: 'ORD-123456-7893', 
          customer: 'Fatima Hassan', 
          date: '2025-04-22', 
          total: 749, 
          status: 'completed',
          items: [
            { id: 1, name: 'Marvel characters PACKAGE', quantity: 1, price: 749 }
          ]
        },
        { 
          id: 'ORD-123456-7894', 
          customer: 'Omar Khaled', 
          date: '2025-04-21', 
          total: 398, 
          status: 'cancelled',
          items: [
            { id: 2, name: 'Batman Poster', quantity: 2, price: 199 }
          ]
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  async function handleUpdateStatus(orderId: string, newStatus: Order['status']) {
    // In a real implementation, this would call an API to update the order status
    // For now, we'll just update the local state
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    alert(`Order ${orderId} status updated to ${newStatus}`);
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
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      
      <div className="bg-gray-800 rounded-lg p-6">
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
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-700">
                  <td className="py-3 pr-4">{order.id}</td>
                  <td className="py-3 pr-4">{order.customer}</td>
                  <td className="py-3 pr-4">{order.date}</td>
                  <td className="py-3 pr-4">{order.total.toFixed(2)} EGP</td>
                  <td className="py-3 pr-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      order.status === 'completed' ? 'bg-green-900 text-green-200' :
                      order.status === 'processing' ? 'bg-blue-900 text-blue-200' :
                      order.status === 'pending' ? 'bg-yellow-900 text-yellow-200' :
                      'bg-red-900 text-red-200'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex space-x-2">
                      <Link href={`/admin/orders/${order.id}`} className="text-blue-400 hover:text-blue-300">
                        View
                      </Link>
                      <div className="relative group">
                        <button className="text-green-400 hover:text-green-300">
                          Update Status
                        </button>
                        <div className="absolute left-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                          <button 
                            onClick={() => handleUpdateStatus(order.id, 'pending')}
                            className="block px-4 py-2 text-sm text-white hover:bg-gray-800 w-full text-left"
                          >
                            Set as Pending
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(order.id, 'processing')}
                            className="block px-4 py-2 text-sm text-white hover:bg-gray-800 w-full text-left"
                          >
                            Set as Processing
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(order.id, 'completed')}
                            className="block px-4 py-2 text-sm text-white hover:bg-gray-800 w-full text-left"
                          >
                            Set as Completed
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                            className="block px-4 py-2 text-sm text-white hover:bg-gray-800 w-full text-left"
                          >
                            Set as Cancelled
                          </button>
                        </div>
                      </div>
                    </div>
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

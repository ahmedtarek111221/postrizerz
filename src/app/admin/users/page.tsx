'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  is_admin: boolean;
  created_at: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, this would fetch actual data from the API
    // For now, we'll use mock data
    setTimeout(() => {
      setUsers([
        { 
          id: 1, 
          name: 'Ahmed Mohamed', 
          email: 'ahmed@example.com', 
          address: 'Cairo, Egypt', 
          phone: '+20 123 456 7890',
          is_admin: true,
          created_at: '2025-03-15'
        },
        { 
          id: 2, 
          name: 'Sara Ahmed', 
          email: 'sara@example.com', 
          address: 'Alexandria, Egypt', 
          phone: '+20 123 456 7891',
          is_admin: false,
          created_at: '2025-03-20'
        },
        { 
          id: 3, 
          name: 'Mohamed Ali', 
          email: 'mohamed@example.com', 
          address: 'Giza, Egypt', 
          phone: '+20 123 456 7892',
          is_admin: false,
          created_at: '2025-03-25'
        },
        { 
          id: 4, 
          name: 'Fatima Hassan', 
          email: 'fatima@example.com', 
          address: 'Luxor, Egypt', 
          phone: '+20 123 456 7893',
          is_admin: false,
          created_at: '2025-04-01'
        },
        { 
          id: 5, 
          name: 'Omar Khaled', 
          email: 'omar@example.com', 
          address: 'Aswan, Egypt', 
          phone: '+20 123 456 7894',
          is_admin: false,
          created_at: '2025-04-10'
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  async function handleToggleAdmin(userId: number) {
    // In a real implementation, this would call an API to update the user's admin status
    // For now, we'll just update the local state
    setUsers(users.map(user => 
      user.id === userId ? { ...user, is_admin: !user.is_admin } : user
    ));
    alert(`User admin status updated`);
  }

  async function handleDeleteUser(userId: number) {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    // In a real implementation, this would call an API to delete the user
    // For now, we'll just remove it from the local state
    setUsers(users.filter(user => user.id !== userId));
    alert('User deleted successfully');
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
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-700">
                <th className="pb-3 pr-4">ID</th>
                <th className="pb-3 pr-4">Name</th>
                <th className="pb-3 pr-4">Email</th>
                <th className="pb-3 pr-4">Phone</th>
                <th className="pb-3 pr-4">Role</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-700">
                  <td className="py-3 pr-4">{user.id}</td>
                  <td className="py-3 pr-4">{user.name}</td>
                  <td className="py-3 pr-4">{user.email}</td>
                  <td className="py-3 pr-4">{user.phone}</td>
                  <td className="py-3 pr-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      user.is_admin ? 'bg-purple-900 text-purple-200' : 'bg-blue-900 text-blue-200'
                    }`}>
                      {user.is_admin ? 'Admin' : 'Customer'}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleToggleAdmin(user.id)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        {user.is_admin ? 'Remove Admin' : 'Make Admin'}
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
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

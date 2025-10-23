'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BadgeNumber } from '@/lib/models/BadgeNumber';

interface ApiResponse {
  success: boolean;
  data?: BadgeNumber[];
  error?: string;
}

const Dashboard: React.FC = () => {
  const [badgeNumbers, setBadgeNumbers] = useState<BadgeNumber[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Show message helper function
  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  // Fetch badge numbers function
  const fetchBadgeNumbers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/badge-numbers');
      const result: ApiResponse = await response.json();
      
      if (result.success && result.data) {
        setBadgeNumbers(result.data);
      } else {
        showMessage('error', result.error || 'Failed to fetch badge numbers');
      }
    } catch (error) {
      showMessage('error', 'Network error occurred');
      console.error('Error fetching badge numbers:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = localStorage.getItem('admin_authenticated');
      if (authenticated === 'true') {
        setIsAuthenticated(true);
      } else {
        router.push('/admin/login');
      }
    };
    
    checkAuth();
  }, [router]);

  // Fetch badge numbers when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchBadgeNumbers();
    }
  }, [isAuthenticated, fetchBadgeNumbers]);

  // Don't render dashboard content if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-white text-lg">Checking authentication...</div>
      </div>
    );
  }

  const updateBadgeNumber = async (eventId: string, newBadgeNumber: number) => {
    try {
      setUpdating(eventId);
      const response = await fetch(`/api/badge-numbers/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ badgeNumber: newBadgeNumber }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setBadgeNumbers(prev => 
          prev.map(item => 
            item.eventId === eventId 
              ? { ...item, badgeNumber: newBadgeNumber, updatedAt: new Date() }
              : item
          )
        );
        showMessage('success', `Updated ${eventId} badge number to ${newBadgeNumber}`);
      } else {
        showMessage('error', result.error || 'Failed to update badge number');
      }
    } catch (error) {
      showMessage('error', 'Network error occurred');
      console.error('Error updating badge number:', error);
    } finally {
      setUpdating(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_email');
    router.push('/admin/login');
  };

  const handleInputChange = (eventId: string, value: string) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 0) {
      updateBadgeNumber(eventId, numValue);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-[#ef4a25]">
              Badge Numbers Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                  />
                </svg>
                Back to Home
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>
          <p className="text-gray-400">
            Control the badge numbers displayed on upcoming event cards
          </p>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-900/50 border border-green-500 text-green-200' 
              : 'bg-red-900/50 border border-red-500 text-red-200'
          }`}>
            {message.text}
          </div>
        )}

        {/* Badge Numbers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badgeNumbers.map((item) => (
            <div
              key={item.eventId}
              className="bg-gray-900 rounded-lg p-6 border border-gray-700 hover:border-[#ef4a25] transition-colors"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-[#ef4a25] mb-1">
                  {item.eventTitle}
                </h3>
                <p className="text-sm text-gray-400">ID: {item.eventId}</p>
              </div>

              <div className="space-y-4">
                {/* Current Badge Number */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Current Badge:</span>
                  <span className="text-2xl font-bold text-white">
                    {item.badgeNumber}
                  </span>
                </div>

                {/* Total Slots */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Total Slots:</span>
                  <span className="text-lg text-gray-200">
                    {item.totalSlots}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-[#ef4a25] h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min((item.badgeNumber / item.totalSlots) * 100, 100)}%`
                    }}
                  />
                </div>

                {/* Input Controls */}
                <div className="space-y-2">
                  <label className="block text-sm text-gray-300">
                    Update Badge Number:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="0"
                      max={item.totalSlots}
                      defaultValue={item.badgeNumber}
                      className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-[#ef4a25] focus:outline-none"
                      onBlur={(e) => {
                        const value = e.target.value;
                        if (value !== item.badgeNumber.toString()) {
                          handleInputChange(item.eventId, value);
                        }
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const value = (e.target as HTMLInputElement).value;
                          if (value !== item.badgeNumber.toString()) {
                            handleInputChange(item.eventId, value);
                          }
                        }
                      }}
                      disabled={updating === item.eventId}
                    />
                    {updating === item.eventId && (
                      <div className="flex items-center px-3">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#ef4a25]"></div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => updateBadgeNumber(item.eventId, Math.max(0, item.badgeNumber - 1))}
                    disabled={updating === item.eventId || item.badgeNumber <= 0}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white py-2 px-3 rounded text-sm transition-colors"
                  >
                    -1
                  </button>
                  <button
                    onClick={() => updateBadgeNumber(item.eventId, Math.min(item.totalSlots, item.badgeNumber + 1))}
                    disabled={updating === item.eventId || item.badgeNumber >= item.totalSlots}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white py-2 px-3 rounded text-sm transition-colors"
                  >
                    +1
                  </button>
                </div>

                {/* Last Updated */}
                <div className="text-xs text-gray-500 pt-2 border-t border-gray-700">
                  Last updated: {new Date(item.updatedAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Refresh Button */}
        <div className="mt-8 text-center">
          <button
            onClick={fetchBadgeNumbers}
            disabled={loading}
            className="bg-[#ef4a25] hover:bg-[#d63916] disabled:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
          >
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
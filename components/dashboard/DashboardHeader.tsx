"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FiUser, 
  FiLogOut, 
  FiSettings, 
  FiHelpCircle, 
  FiBell, 
  FiSearch,
} from 'react-icons/fi';
import { createBrowserClient } from '@supabase/ssr';
import { ThemeToggle } from '@/components/ThemeToggle';

const DashboardHeader: React.FC = () => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [debugEvents, setDebugEvents] = useState<any[]>([]);
  const [showDebug, setShowDebug] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Get the authenticated user (more secure than session)
        const { data: { user: authUser }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error('Error getting authenticated user:', userError);
          addDebugEvent('auth_user_error', { error: userError });
          return;
        }
        
        if (authUser) {
          setUser(authUser);
          addDebugEvent('fetch_user', { user: authUser });
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        addDebugEvent('fetch_user_error', { error });
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
    
    // Set up a listener for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        addDebugEvent('auth_state_change', { user: session.user });
      } else {
        setUser(null);
        addDebugEvent('auth_state_change', { user: null });
      }
    });
    
    // Also listen for storage events to catch updates from other tabs
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'supabase.auth.token') {
        fetchUser();
      }
    };
    
    // Listen for custom profile update events
    const handleProfileUpdate = (event: CustomEvent) => {
      console.log('Received profile update event:', event.detail);
      
      setDebugEvents((prev: any[]) => [
        { 
          type: 'profile_update_event', 
          timestamp: new Date().toISOString(),
          data: event.detail 
        },
        ...prev.slice(0, 4)  // Keep only the last 5 events
      ]);
      
      if (event.detail) {
        const { user, profile } = event.detail;
        if (user) {
          setUser(user);
          console.log('User state updated in header:', user);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userProfileUpdated', handleProfileUpdate as EventListener);
    
    return () => {
      subscription.unsubscribe();
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userProfileUpdated', handleProfileUpdate as EventListener);
    };
  }, []);
  
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push('/auth/signin');
      router.refresh();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get user display name or email
  const getUserDisplayName = () => {
    if (!user) return 'Guest';
    return user.user_metadata?.full_name || user.email || 'User';
  };

  // Add this right before the return statement
  const addDebugEvent = (type: string, data: any) => {
    setDebugEvents((prev: any[]) => [
      { type, timestamp: new Date().toISOString(), data },
      ...prev.slice(0, 4)
    ]);
  };

  return (
    <>
      <header className="bg-white dark:bg-dark-card shadow-sm border-b border-gray-200 dark:border-dark-border transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/dashboard" className="text-xl font-bold text-gradient hidden md:block">
                  Tax Manager
                </Link>
              </div>
              <div className="ml-6 flex items-center">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-dark-border rounded-md leading-5 bg-white dark:bg-dark-card placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-dark-text focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:focus:border-indigo-400 sm:text-sm transition-colors"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <ThemeToggle />
              
              {/* Notifications */}
              <div className="relative" ref={notificationsRef}>
                <button
                  className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none relative"
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                >
                  <FiBell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                
                {isNotificationsOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white dark:bg-dark-card ring-1 ring-black ring-opacity-5 dark:ring-gray-700 focus:outline-none z-10 animate-fade-in">
                    <div className="py-1">
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-dark-border">
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Notifications</h3>
                      </div>
                      <div className="max-h-60 overflow-y-auto custom-scrollbar">
                        <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                          <p className="text-sm font-medium text-gray-900 dark:text-dark-text">Tax payment reminder</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Your GST payment is due in 3 days</p>
                        </div>
                        <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                          <p className="text-sm font-medium text-gray-900 dark:text-dark-text">New tax record added</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Income Tax record was added successfully</p>
                        </div>
                      </div>
                      <div className="px-4 py-2 border-t border-gray-200 dark:border-dark-border">
                        <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">
                          View all notifications
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* User Menu */}
              <div className="ml-3 relative" ref={dropdownRef}>
                <div>
                  <button
                    type="button"
                    className="flex items-center max-w-xs rounded-full bg-indigo-50 dark:bg-indigo-900/30 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                    id="user-menu-button"
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <FiUser size={20} className="text-indigo-600 dark:text-indigo-400" />
                  </button>
                </div>
                
                {isDropdownOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-dark-card ring-1 ring-black ring-opacity-5 dark:ring-gray-700 focus:outline-none z-10 animate-fade-in"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-dark-border">
                      <p className="text-sm font-medium text-gray-900 dark:text-dark-text">{getUserDisplayName()}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email || 'user@example.com'}</p>
                    </div>
                    
                    <Link 
                      href="/dashboard/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center" 
                      role="menuitem"
                    >
                      <FiUser size={16} className="mr-2" /> Your Profile
                    </Link>
                    
                    <Link 
                      href="/dashboard/settings"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center" 
                      role="menuitem"
                    >
                      <FiSettings size={16} className="mr-2" /> Settings
                    </Link>
                    
                    <Link 
                      href="/dashboard/help"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center" 
                      role="menuitem"
                    >
                      <FiHelpCircle size={16} className="mr-2" /> Help Center
                    </Link>
                    
                    <div className="border-t border-gray-200 dark:border-dark-border"></div>
                    
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center"
                      role="menuitem"
                    >
                      <FiLogOut size={16} className="mr-2" /> Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Debug Panel */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowDebug(!showDebug)}
          className="bg-gray-200 dark:bg-gray-800 p-2 rounded-full shadow-lg"
          aria-label="Toggle Debug Panel"
        >
          <FiSettings className="h-4 w-4" />
        </button>
        
        {showDebug && (
          <div className="fixed bottom-12 right-4 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-4 w-96 max-h-96 overflow-auto">
            <h4 className="font-semibold mb-2">Header Debug Info</h4>
            <p className="text-xs mb-2">User: {user ? user.email : 'Not logged in'}</p>
            <p className="text-xs mb-2">Display Name: {getUserDisplayName()}</p>
            <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
              <h5 className="text-xs font-semibold mb-1">Recent Events:</h5>
              {debugEvents.map((event, i) => (
                <div key={i} className="text-xs mb-2 p-2 bg-gray-50 dark:bg-gray-900 rounded">
                  <div className="flex justify-between">
                    <span className="font-medium">{event.type}</span>
                    <span className="text-gray-500">{new Date(event.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <pre className="mt-1 whitespace-pre-wrap break-words text-xs">
                    {JSON.stringify(event.data, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardHeader; 
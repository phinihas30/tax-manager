"use client";

import React, { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { FiSave, FiUser, FiMail, FiLock, FiBell, FiShield, FiGlobe, FiFileText } from 'react-icons/fi';
import { ThemeToggleWithLabel } from '@/components/ThemeToggle';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    language: 'en',
    currency: 'INR',
    notificationsEmail: true,
    notificationsBrowser: true,
    notificationFrequency: 'immediately',
    theme: 'light',
    dateFormat: 'DD/MM/YYYY',
    taxYearStart: 'april',
    taxYearEnd: 'march',
    reminderAdvance: true
  });
  const [activeTab, setActiveTab] = useState('profile');
  const [saveStatus, setSaveStatus] = useState('');
  const [saveError, setSaveError] = useState('');
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        // Get the authenticated user (more secure than session)
        const { data: { user: authUser }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error('Error getting authenticated user:', userError);
          return;
        }
        
        if (authUser) {
          setUser(authUser);
          
          // Get avatar URL if it exists
          if (authUser.user_metadata?.avatar_url) {
            setAvatarUrl(authUser.user_metadata.avatar_url);
          }
          
          // In a real app, you'd fetch user preferences from a database here
          // For demo purposes, we'll just set the email
          setFormData(prev => ({
            ...prev,
            name: authUser.user_metadata?.full_name || '',
            email: authUser.email || ''
          }));
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUser();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');
    setSaveError('');
    
    try {
      // Update user metadata in Supabase
      const { error, data } = await supabase.auth.updateUser({
        data: {
          full_name: formData.name,
          language: formData.language,
          currency: formData.currency,
          date_format: formData.dateFormat,
          notifications_email: formData.notificationsEmail,
          notifications_browser: formData.notificationsBrowser
        }
      });
      
      if (error) throw error;
      
      // Update the user state with the updated user data
      if (data.user) {
        setUser(data.user);
        
        // Get the latest user data directly with getUser instead of refreshSession
        // This avoids potential navigation issues
        const { data: latestUserData, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error('Error getting updated user:', userError);
          throw userError;
        }
        
        if (latestUserData.user) {
          // Use setTimeout to prevent UI blocking when dispatching the event
          setTimeout(() => {
            // Dispatch a custom event to notify other components about the profile update
            window.dispatchEvent(new CustomEvent('userProfileUpdated', { 
              detail: { 
                user: latestUserData.user,
                timestamp: new Date().toISOString()
              }
            }));
            console.log('Dispatched userProfileUpdated event from settings');
          }, 0);
        }
      }
      
      // Show success status
      setSaveStatus('success');
      
      // Show success notification
      const notification = document.getElementById('notification-banner');
      if (notification) {
        notification.innerText = 'Settings updated successfully!';
        notification.className = 'fixed bottom-4 right-4 bg-green-50 text-green-800 px-4 py-2 rounded-md shadow-lg transition-opacity duration-500 opacity-100';
        setTimeout(() => {
          notification.className = 'fixed bottom-4 right-4 bg-green-50 text-green-800 px-4 py-2 rounded-md shadow-lg transition-opacity duration-500 opacity-0';
        }, 3000);
      }
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus('');
      }, 3000);
    } catch (error: any) {
      console.error('Error saving settings:', error);
      setSaveError(error.message || 'Failed to save settings. Please try again.');
      setSaveStatus('');
    }
  };

  const handlePasswordReset = async () => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      
      if (error) throw error;
      
      alert('Password reset email sent. Please check your inbox.');
    } catch (error) {
      console.error('Error sending password reset:', error);
      alert('Failed to send password reset email. Please try again.');
    }
  };

  // Function to handle avatar file change
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) { // 2MB max size
        alert('File size must be less than 2MB');
        return;
      }
      
      setImageFile(file);
      // Create a preview URL
      const objectUrl = URL.createObjectURL(file);
      setAvatarUrl(objectUrl);
    }
  };

  // Function to upload avatar to Supabase storage
  const uploadAvatar = async () => {
    if (!imageFile || !user) return;
    
    setUploadingAvatar(true);
    
    try {
      // Upload to Supabase Storage
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `avatar-${user.id}-${Date.now()}.${fileExt}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from('avatars')
        .upload(fileName, imageFile, { upsert: true });
      
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);
      
      // Update user metadata with avatar URL
      const { error: updateError, data: updatedUserData } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl }
      });
      
      if (updateError) throw updateError;
      
      // Update local state with new avatar URL
      setAvatarUrl(publicUrl);
      
      // Update the user state if the update was successful
      if (updatedUserData.user) {
        setUser(updatedUserData.user);
        
        // Get the latest user data directly with getUser instead of refreshSession
        // This avoids potential navigation issues
        const { data: latestUserData } = await supabase.auth.getUser();
        
        if (latestUserData.user) {
          // Use setTimeout to prevent UI blocking when dispatching the event
          setTimeout(() => {
            // Dispatch a custom event to notify other components about the profile update
            window.dispatchEvent(new CustomEvent('userProfileUpdated', { 
              detail: { 
                user: latestUserData.user,
                timestamp: new Date().toISOString()
              }
            }));
            console.log('Dispatched userProfileUpdated event from settings');
          }, 0);
        }
      }
      
      // Show success notification
      const notification = document.getElementById('notification-banner');
      if (notification) {
        notification.innerText = 'Profile picture updated successfully!';
        notification.className = 'fixed bottom-4 right-4 bg-green-50 text-green-800 px-4 py-2 rounded-md shadow-lg transition-opacity duration-500 opacity-100';
        setTimeout(() => {
          notification.className = 'fixed bottom-4 right-4 bg-green-50 text-green-800 px-4 py-2 rounded-md shadow-lg transition-opacity duration-500 opacity-0';
        }, 3000);
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Error uploading avatar. Please try again.');
    } finally {
      setUploadingAvatar(false);
      setImageFile(null);
    }
  };

  // Handle checkbox change specifically for notification settings
  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
    
    // Show a notification to confirm the change
    const notificationType = name === 'notificationsEmail' ? 'email' : 'browser';
    const status = checked ? 'enabled' : 'disabled';
    
    // This would typically update a database in a real app
    if (checked) {
      // Show success notification
      const notification = document.getElementById('notification-banner');
      if (notification) {
        notification.innerText = `${notificationType.charAt(0).toUpperCase() + notificationType.slice(1)} notifications ${status}.`;
        notification.className = 'fixed bottom-4 right-4 bg-green-50 text-green-800 px-4 py-2 rounded-md shadow-lg transition-opacity duration-500 opacity-100';
        setTimeout(() => {
          notification.className = 'fixed bottom-4 right-4 bg-green-50 text-green-800 px-4 py-2 rounded-md shadow-lg transition-opacity duration-500 opacity-0';
        }, 3000);
      }
    }
  };
  
  // Handle radio button changes for notification frequency
  const handleFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, notificationFrequency: value }));
  };

  // Send a test notification
  const sendTestNotification = () => {
    // Check if notifications are enabled
    if (!formData.notificationsEmail && !formData.notificationsBrowser) {
      alert('Please enable at least one notification method first.');
      return;
    }
    
    // In a real app, this would trigger an actual notification
    // For demo purposes, we'll just show an on-screen notification
    const notification = document.getElementById('notification-banner');
    if (notification) {
      notification.innerText = '🔔 This is a test notification. Your notification settings are working!';
      notification.className = 'fixed bottom-4 right-4 bg-indigo-50 text-indigo-800 px-4 py-2 rounded-md shadow-lg transition-opacity duration-500 opacity-100';
      setTimeout(() => {
        notification.className = 'fixed bottom-4 right-4 bg-indigo-50 text-indigo-800 px-4 py-2 rounded-md shadow-lg transition-opacity duration-500 opacity-0';
      }, 5000);
    }
  };

  const handleDeleteProfile = async () => {
    if (!user) {
      alert('User not found. Please sign in again.');
      return;
    }

    setIsDeleting(true);
    
    try {
      console.log('Deleting profile for user:', user.id);
      
      // Delete the user's profile from the profiles table
      const { error: deleteProfileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user.id);
      
      if (deleteProfileError) {
        console.error('Error deleting profile:', deleteProfileError);
        throw deleteProfileError;
      }

      console.log('Profile deleted successfully');
      
      setShowDeleteConfirm(false);
      
      // Get the current user data to ensure we have the latest
      const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error('Error getting current user:', userError);
      } else if (currentUser) {
        setUser(currentUser);
        
        // Dispatch an event to notify other components about the profile deletion
        try {
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('userProfileUpdated', { 
              detail: { 
                user: currentUser,
                profileDeleted: true,
                timestamp: new Date().toISOString()
              }
            }));
            console.log('Dispatched profile deletion event from settings');
          }, 0);
        } catch (e) {
          console.error('Failed to dispatch profile deletion event:', e);
        }
      }
      
      // Show success notification
      const notification = document.getElementById('notification-banner');
      if (notification) {
        notification.innerText = 'Profile data deleted successfully. Your account is still active.';
        notification.className = 'fixed bottom-4 right-4 bg-green-50 text-green-800 px-4 py-2 rounded-md shadow-lg transition-opacity duration-500 opacity-100';
        setTimeout(() => {
          notification.className = 'fixed bottom-4 right-4 bg-green-50 text-green-800 px-4 py-2 rounded-md shadow-lg transition-opacity duration-500 opacity-0';
        }, 3000);
      }
      
      // Redirect to dashboard after successful deletion
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
      
    } catch (error) {
      console.error('Error during profile deletion:', error);
      alert('Failed to delete profile. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="bg-white dark:bg-dark-card rounded-lg shadow dark:shadow-gray-800">
        <div className="md:grid md:grid-cols-12">
          {/* Sidebar */}
          <div className="md:col-span-3 border-r border-gray-200 dark:border-dark-border">
            <nav className="p-4">
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'profile' 
                        ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <FiUser className="mr-3 h-4 w-4" />
                    Profile Settings
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('account')}
                    className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'account' 
                        ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <FiShield className="mr-3 h-4 w-4" />
                    Account Security
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('preferences')}
                    className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'preferences' 
                        ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <FiGlobe className="mr-3 h-4 w-4" />
                    Preferences
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'notifications' 
                        ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <FiBell className="mr-3 h-4 w-4" />
                    Notifications
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('tax')}
                    className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'tax' 
                        ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <FiFileText className="mr-3 h-4 w-4" />
                    Tax Settings
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main content */}
          <div className="md:col-span-9 p-6">
            <form onSubmit={handleSaveSettings}>
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">Profile Information</h2>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        disabled
                      />
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        To change your email address, please contact support.
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Profile Picture
                      </label>
                      <div className="mt-2 flex items-center">
                        <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-500 dark:text-indigo-400 overflow-hidden">
                          {avatarUrl ? (
                            <img
                              src={avatarUrl}
                              alt="Profile"
                              className="h-12 w-12 object-cover"
                            />
                          ) : (
                            <FiUser className="h-6 w-6" />
                          )}
                        </div>
                        <label
                          htmlFor="avatar-upload"
                          className="ml-4 bg-white dark:bg-dark-card py-2 px-3 border border-gray-300 dark:border-dark-border rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none cursor-pointer"
                        >
                          Choose Photo
                          <input
                            id="avatar-upload"
                            name="avatar"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={handleAvatarChange}
                          />
                        </label>
                        {imageFile && (
                          <button
                            type="button"
                            onClick={uploadAvatar}
                            disabled={uploadingAvatar}
                            className="ml-2 bg-indigo-600 dark:bg-indigo-700 py-2 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none"
                          >
                            {uploadingAvatar ? 'Uploading...' : 'Upload'}
                          </button>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        JPG, PNG or GIF. Maximum size 2MB.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Account Tab */}
              {activeTab === 'account' && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">Account Security</h2>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={handlePasswordReset}
                          className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                        >
                          Reset Password
                        </button>
                      </div>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="password"
                          value="••••••••••••"
                          disabled
                          className="block w-full pr-10 border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <FiLock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        For security reasons, we don't display your password. Click "Reset Password" to create a new one.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Two-Factor Authentication</h3>
                      <div className="mt-2 flex items-center">
                        <button
                          type="button"
                          className="bg-white dark:bg-dark-card py-2 px-3 border border-gray-300 dark:border-dark-border rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-dark-bg"
                        >
                          Enable 2FA
                        </button>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Add an extra layer of security to your account.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Sessions</h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        You're currently signed in on this device.
                      </p>
                      <button
                        type="button"
                        className="mt-2 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                      >
                        Sign out of all sessions
                      </button>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-dark-border">
                      <h3 className="text-sm font-medium text-red-600 dark:text-red-400">Delete Profile Data</h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Delete your profile information from our system. Your account will remain active, but your profile data will be removed.
                      </p>
                      <button
                        type="button"
                        onClick={() => setShowDeleteConfirm(true)}
                        className="mt-3 inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 dark:text-red-500 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Delete Profile Data
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">Preferences</h2>
                  <div className="space-y-6">
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Choose between light and dark theme</p>
                      <ThemeToggleWithLabel />
                    </div>
                    
                    <div>
                      <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Language
                      </label>
                      <select
                        id="language"
                        name="language"
                        value={formData.language}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        <option value="kn">Kannada</option>
                        <option value="te">Telugu</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="currency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Currency
                      </label>
                      <select
                        id="currency"
                        name="currency"
                        value={formData.currency}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="INR">Indian Rupee (₹)</option>
                        <option value="USD">US Dollar ($)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Date Format
                      </label>
                      <select
                        id="dateFormat"
                        name="dateFormat"
                        value={formData.dateFormat}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">Notification Settings</h2>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="notificationsEmail"
                          name="notificationsEmail"
                          type="checkbox"
                          checked={formData.notificationsEmail}
                          onChange={handleNotificationChange}
                          className="h-4 w-4 rounded border-gray-300 dark:border-dark-border text-indigo-600 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="notificationsEmail" className="font-medium text-gray-700 dark:text-gray-300">
                          Email Notifications
                        </label>
                        <p className="text-gray-500 dark:text-gray-400">Receive email notifications for tax payment due dates and updates.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="notificationsBrowser"
                          name="notificationsBrowser"
                          type="checkbox"
                          checked={formData.notificationsBrowser}
                          onChange={handleNotificationChange}
                          className="h-4 w-4 rounded border-gray-300 dark:border-dark-border text-indigo-600 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="notificationsBrowser" className="font-medium text-gray-700 dark:text-gray-300">
                          Browser Notifications
                        </label>
                        <p className="text-gray-500 dark:text-gray-400">Receive browser notifications when you're using the app.</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notification Frequency</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            id="freq-immediately"
                            name="notificationFrequency"
                            type="radio"
                            className="h-4 w-4 border-gray-300 dark:border-dark-border text-indigo-600 focus:ring-indigo-500"
                            defaultChecked
                            value="immediately"
                            onChange={handleFrequencyChange}
                          />
                          <label htmlFor="freq-immediately" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Immediately
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="freq-daily"
                            name="notificationFrequency"
                            type="radio"
                            className="h-4 w-4 border-gray-300 dark:border-dark-border text-indigo-600 focus:ring-indigo-500"
                            value="daily"
                            onChange={handleFrequencyChange}
                          />
                          <label htmlFor="freq-daily" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Daily digest
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="freq-weekly"
                            name="notificationFrequency"
                            type="radio"
                            className="h-4 w-4 border-gray-300 dark:border-dark-border text-indigo-600 focus:ring-indigo-500"
                            value="weekly"
                            onChange={handleFrequencyChange}
                          />
                          <label htmlFor="freq-weekly" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Weekly digest
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 border-t border-gray-200 dark:border-dark-border pt-6">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Notification Types</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                        Control which types of notifications you want to receive.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="notifyTaxDue"
                              name="notifyTaxDue"
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 rounded border-gray-300 dark:border-dark-border text-indigo-600 focus:ring-indigo-500"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="notifyTaxDue" className="font-medium text-gray-700 dark:text-gray-300">
                              Tax Due Date Reminders
                            </label>
                            <p className="text-gray-500 dark:text-gray-400">Get notified before your tax payments are due.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="notifyStatusChanges"
                              name="notifyStatusChanges"
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 rounded border-gray-300 dark:border-dark-border text-indigo-600 focus:ring-indigo-500"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="notifyStatusChanges" className="font-medium text-gray-700 dark:text-gray-300">
                              Status Changes
                            </label>
                            <p className="text-gray-500 dark:text-gray-400">Get notified when tax payment statuses change.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="notifyReports"
                              name="notifyReports"
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 rounded border-gray-300 dark:border-dark-border text-indigo-600 focus:ring-indigo-500"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="notifyReports" className="font-medium text-gray-700 dark:text-gray-300">
                              Monthly Reports
                            </label>
                            <p className="text-gray-500 dark:text-gray-400">Receive monthly tax summary reports.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-gray-200 dark:border-dark-border pt-6">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Test Notifications</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                        Send a test notification to verify your settings are working correctly.
                      </p>
                      <button
                        type="button"
                        onClick={sendTestNotification}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-dark-bg"
                      >
                        <FiBell className="mr-2 h-4 w-4" />
                        Send Test Notification
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tax Settings Tab */}
              {activeTab === 'tax' && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">Tax Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Indian Tax Categories
                      </label>
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                          Common tax categories in India. These are used throughout the app.
                        </p>
                        <ul className="space-y-1">
                          <li className="text-sm flex items-center justify-between">
                            <span className="dark:text-dark-text">Income Tax</span>
                            <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full">Direct</span>
                          </li>
                          <li className="text-sm flex items-center justify-between">
                            <span className="dark:text-dark-text">GST</span>
                            <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full">Indirect</span>
                          </li>
                          <li className="text-sm flex items-center justify-between">
                            <span className="dark:text-dark-text">Property Tax</span>
                            <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full">Direct</span>
                          </li>
                          <li className="text-sm flex items-center justify-between">
                            <span className="dark:text-dark-text">Professional Tax</span>
                            <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full">Direct</span>
                          </li>
                          <li className="text-sm flex items-center justify-between">
                            <span className="dark:text-dark-text">Customs Duty</span>
                            <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full">Indirect</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Financial Year Settings
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="taxYearStart" className="block text-xs text-gray-500 dark:text-gray-400">
                            Financial Year Start
                          </label>
                          <select
                            id="taxYearStart"
                            name="taxYearStart"
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            defaultValue="april"
                          >
                            <option value="april">April (Indian FY)</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="taxYearEnd" className="block text-xs text-gray-500 dark:text-gray-400">
                            Financial Year End
                          </label>
                          <select
                            id="taxYearEnd"
                            name="taxYearEnd"
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            defaultValue="march"
                            disabled
                          >
                            <option value="march">March</option>
                          </select>
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        Indian financial year runs from April 1 to March 31
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Payment Reminders
                      </label>
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="reminderAdvance"
                            name="reminderAdvance"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 dark:border-dark-border text-indigo-600 focus:ring-indigo-500"
                            defaultChecked
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="reminderAdvance" className="font-medium text-gray-700 dark:text-gray-300">
                            Advance Reminders
                          </label>
                          <p className="text-gray-500 dark:text-gray-400">Get notifications 7 days before tax due dates</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Save button section */}
              <div className="mt-8">
                {saveError && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md text-sm">
                    <p>{saveError}</p>
                  </div>
                )}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className={`btn-gradient inline-flex items-center px-4 py-2 border-0 rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${
                      saveStatus === 'saving' ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                    disabled={saveStatus === 'saving'}
                  >
                    {saveStatus === 'saving' ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : saveStatus === 'success' ? (
                      <>
                        <svg className="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Saved
                      </>
                    ) : (
                      <>
                        <FiSave className="mr-1.5 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Notification toast */}
      <div 
        id="notification-banner" 
        className="fixed bottom-4 right-4 bg-green-50 text-green-800 px-4 py-2 rounded-md shadow-lg transition-opacity duration-500 opacity-0"
      ></div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Delete Profile Data</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Are you sure you want to delete your profile data? This action cannot be undone.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
              <strong>Note:</strong> This will only remove your profile information (name, phone, address, etc.). 
              Your account will remain active and you can recreate your profile anytime.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProfile}
                disabled={isDeleting}
                className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2 inline-block"></div>
                    Deleting...
                  </>
                ) : (
                  'Delete Profile Data'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
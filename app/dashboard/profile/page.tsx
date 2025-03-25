"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiUser, FiMail, FiPhone, FiMapPin, FiClock, FiFileText, FiEdit, FiUpload, FiSave } from 'react-icons/fi';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { TaxRecord } from '@/types/supabase';
import { toast } from 'react-hot-toast';

interface ProfileData {
  full_name: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
  tax_id: string;
}

interface DebugInfo {
  [key: string]: any;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<ProfileData>({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    tax_id: ''
  });
  const [recentRecords, setRecentRecords] = useState<TaxRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [debugInfo, setDebugInfo] = useState<DebugInfo>({});
  const [showDebug, setShowDebug] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get authenticated user (more secure approach)
        const { data: { user: authUser }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error('Error getting authenticated user:', userError);
          router.push('/auth/signin');
          return;
        }
        
        if (!authUser) {
          router.push('/auth/signin');
          return;
        }

        setUser(authUser);

        // Fetch user profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Error fetching profile:', profileError);
          throw profileError;
        }

        if (profileData) {
          setProfile({
            full_name: profileData.full_name || '',
            email: authUser.email || '',
            phone: profileData.phone || '',
            address: profileData.address || '',
            bio: profileData.bio || '',
            tax_id: profileData.tax_id || ''
          });
        } else {
          // If no profile exists, create one with default values
          const { error: insertError } = await supabase
            .from('profiles')
            .insert([
              {
                id: authUser.id,
                full_name: '',
                email: authUser.email,
                phone: '',
                address: '',
                bio: '',
                tax_id: ''
              }
            ]);

          if (insertError) {
            console.error('Error creating profile:', insertError);
            throw insertError;
          }
        }

        // Fetch the most recent tax records
        const { data: records, error: recordsError } = await supabase
          .from('tax_records')
          .select('*')
          .eq('user_id', authUser.id)
          .order('created_at', { ascending: false })
          .limit(5);
          
        if (recordsError) {
          console.error('Error fetching tax records:', recordsError);
          throw recordsError;
        }
        
        setRecentRecords(records || []);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [router, supabase]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    if (!user) {
      toast.error('User not found. Please sign in again.');
      return;
    }

    setIsSaving(true);
    setDebugInfo({});
    
    try {
      const updateData = {
        id: user.id,
        full_name: profile.full_name,
        phone: profile.phone,
        address: profile.address,
        bio: profile.bio,
        tax_id: profile.tax_id
      };
      
      setDebugInfo((prev: DebugInfo) => ({ ...prev, updateData }));
      console.log('Updating profile with data:', updateData);

      // Update the profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: profile.full_name,
          phone: profile.phone,
          address: profile.address,
          bio: profile.bio,
          tax_id: profile.tax_id,
        }, {
          onConflict: 'id'
        })
        .select()
        .single();
          
      setDebugInfo((prev: DebugInfo) => ({ ...prev, operation: 'upsert', profileData, profileError }));

      if (profileError) {
        console.error('Profile update error:', profileError);
        throw profileError;
      }

      console.log('Profile updated successfully:', profileData);

      // Then, update user metadata
      const { data: userData, error: userError } = await supabase.auth.updateUser({
        data: {
          full_name: profile.full_name
        }
      });

      setDebugInfo((prev: DebugInfo) => ({ ...prev, userData, userError }));
      
      if (userError) {
        console.error('User metadata update error:', userError);
        throw userError;
      }

      console.log('User metadata updated successfully:', userData);

      // Refresh user data using getUser (more secure)
      const { data: { user: refreshedUser }, error: refreshUserError } = await supabase.auth.getUser();
      
      setDebugInfo((prev: DebugInfo) => ({ ...prev, refreshedUser, refreshUserError }));
      
      if (refreshUserError) {
        console.error('User refresh error:', refreshUserError);
        throw refreshUserError;
      }

      // Update the local user state
      setUser(refreshedUser);

      // Dispatch a custom event to notify other components about the profile update
      const eventDetail = { 
        user: refreshedUser,
        profile: profileData
      };
      
      setDebugInfo((prev: DebugInfo) => ({ ...prev, eventDetail }));
      
      window.dispatchEvent(new CustomEvent('userProfileUpdated', { 
        detail: eventDetail
      }));

      // Refresh the profile data
      const { data: refreshedProfile, error: refreshError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      setDebugInfo((prev: DebugInfo) => ({ ...prev, refreshedProfile, refreshError }));
      
      if (refreshError) {
        console.error('Profile refresh error:', refreshError);
        throw refreshError;
      }

      if (refreshedProfile) {
        setProfile({
          full_name: refreshedProfile.full_name || '',
          email: refreshedUser?.email || '',
          phone: refreshedProfile.phone || '',
          address: refreshedProfile.address || '',
          bio: refreshedProfile.bio || '',
          tax_id: refreshedProfile.tax_id || ''
        });
        
        setDebugInfo((prev: DebugInfo) => ({ ...prev, finalProfile: refreshedProfile }));
      }

      toast.success('Profile updated successfully');
      setIsEditing(false);

    } catch (error) {
      console.error('Error updating profile:', error);
      setDebugInfo((prev: DebugInfo) => ({ ...prev, error }));
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const initializeProfile = async () => {
    if (!user) {
      toast.error('User not found. Please sign in again.');
      return;
    }

    try {
      // First, try to create a new profile
      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: profile.full_name || '',
          email: user.email,
          phone: profile.phone || '',
          address: profile.address || '',
          bio: profile.bio || '',
          tax_id: profile.tax_id || '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'id'
        })
        .select()
        .single();

      if (error) {
        console.error('Error initializing profile:', error);
        toast.error('Failed to initialize profile');
        return;
      }

      console.log('Profile initialized:', data);
      toast.success('Profile initialized successfully');

      // Refresh the data
      const { data: refreshData, error: refreshError } = await supabase.auth.getSession();
      if (refreshError) {
        console.error('Error refreshing session:', refreshError);
        return;
      }

      if (refreshData.session?.user) {
        setUser(refreshData.session.user);
        
        // Fetch the profile again
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', refreshData.session.user.id)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          return;
        }

        if (profileData) {
          setProfile({
            full_name: profileData.full_name || '',
            email: refreshData.session.user.email || '',
            phone: profileData.phone || '',
            address: profileData.address || '',
            bio: profileData.bio || '',
            tax_id: profileData.tax_id || ''
          });
        }
      }
    } catch (error) {
      console.error('Error initializing profile:', error);
      toast.error('Failed to initialize profile');
    }
  };

  // Calculate some statistics
  const totalRecords = recentRecords.length;
  const totalAmount = recentRecords.reduce((sum, record) => sum + Number(record.amount), 0);
  const directTaxRecords = recentRecords.filter(record => record.tax_type === 'Direct');
  const indirectTaxRecords = recentRecords.filter(record => record.tax_type === 'Indirect');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
          <div className="space-x-2">
            {!isEditing ? (
              <>
                <button
                  onClick={initializeProfile}
                  className="inline-flex items-center px-4 py-2 border border-yellow-500 rounded-md shadow-sm text-sm font-medium text-yellow-700 bg-white hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Initialize Profile
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FiEdit className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              </>
            ) : (
              <div className="space-x-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiSave className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <FiUser className="w-12 h-12 text-gray-500 dark:text-gray-400" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{profile.full_name || 'Your Name'}</h2>
              <p className="text-gray-500 dark:text-gray-400">{profile.email}</p>
            </div>
          </div>

          {/* Profile Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="full_name"
                  value={profile.full_name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500 dark:disabled:text-gray-400"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500 dark:disabled:text-gray-400"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500 dark:disabled:text-gray-400"
                  placeholder="Enter your address"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tax ID</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiFileText className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="tax_id"
                  value={profile.tax_id}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500 dark:disabled:text-gray-400"
                  placeholder="Enter your tax ID"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
              <div className="mt-1">
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={3}
                  className="block w-full border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500 dark:disabled:text-gray-400"
                  placeholder="Tell us about yourself"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <button 
            onClick={() => setShowDebug(!showDebug)}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            {showDebug ? 'Hide Debug Info' : 'Show Debug Info'}
          </button>
          
          {showDebug && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-md text-xs overflow-auto max-h-96">
              <pre className="whitespace-pre-wrap break-all">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
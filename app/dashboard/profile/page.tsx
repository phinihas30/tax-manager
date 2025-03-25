"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiUser, FiMail, FiPhone, FiMapPin, FiClock, FiFileText, FiEdit, FiUpload } from 'react-icons/fi';
import { createBrowserClient } from '@supabase/ssr';
import { TaxRecord } from '@/types/supabase';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>({
    full_name: 'phinihas',
    email: 'phinnu@gmail.com',
    phone: '+91 98765 43210',
    address: 'Mumbai, Maharashtra, India',
    bio: 'Tax professional with over 5 years of experience in managing direct and indirect taxes.',
    tax_id: 'ABCDE1234F'
  });
  const [recentRecords, setRecentRecords] = useState<TaxRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profile });

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          throw new Error('Not authenticated');
        }
        
        setUser(user);
        setProfile((prev: typeof profile) => ({ ...prev, email: user.email }));
        setFormData((prev: typeof formData) => ({ ...prev, email: user.email }));
        
        // Fetch the most recent tax records
        const { data: records, error: recordsError } = await supabase
          .from('tax_records')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);
          
        if (recordsError) {
          throw recordsError;
        }
        
        setRecentRecords(records || []);
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/auth/signin');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would update the profile in the database
    setProfile(formData);
    setIsEditing(false);
  };

  // Calculate some statistics
  const totalRecords = recentRecords.length;
  const totalAmount = recentRecords.reduce((sum, record) => sum + Number(record.amount), 0);
  const directTaxRecords = recentRecords.filter(record => record.tax_type === 'Direct');
  const indirectTaxRecords = recentRecords.filter(record => record.tax_type === 'Indirect');

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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600 mt-1">Manage your account information and preferences</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FiEdit className="mr-2 h-4 w-4" />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          {/* Profile Information */}
          <div className="dashboard-card bg-white overflow-hidden rounded-lg shadow-sm">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
            </div>
            {isEditing ? (
              <div className="p-6">
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        readOnly
                        className="w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="tax_id" className="block text-sm font-medium text-gray-700 mb-1">
                        Tax ID / PAN
                      </label>
                      <input
                        type="text"
                        id="tax_id"
                        name="tax_id"
                        value={formData.tax_id}
                        onChange={handleInputChange}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={4}
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="btn-gradient inline-flex items-center px-4 py-2 border-0 text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 text-2xl font-bold">
                      {profile.full_name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-gray-900">{profile.full_name}</h3>
                    <p className="text-sm text-gray-500">{profile.bio}</p>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center text-sm text-gray-500">
                        <FiMail className="mr-2 h-4 w-4 text-gray-400" />
                        {profile.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FiPhone className="mr-2 h-4 w-4 text-gray-400" />
                        {profile.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FiMapPin className="mr-2 h-4 w-4 text-gray-400" />
                        {profile.address}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FiUser className="mr-2 h-4 w-4 text-gray-400" />
                        Tax ID: {profile.tax_id}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="dashboard-card bg-white overflow-hidden rounded-lg shadow-sm">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentRecords.length === 0 ? (
                  <p className="text-sm text-gray-500">No recent tax records found.</p>
                ) : (
                  recentRecords.map((record) => (
                    <div key={record.id} className="flex items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <div className={`p-2 rounded-md ${record.tax_type === 'Direct' ? 'bg-blue-100' : 'bg-green-100'} mr-3`}>
                        <FiFileText className={`h-5 w-5 ${record.tax_type === 'Direct' ? 'text-blue-600' : 'text-green-600'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{record.tax_name}</p>
                            <p className="text-xs text-gray-500">{record.tax_type} Tax • {record.status}</p>
                          </div>
                          <div className="text-sm font-medium text-gray-900">₹{Number(record.amount).toFixed(2)}</div>
                        </div>
                        <div className="flex items-center mt-1">
                          <FiClock className="h-3 w-3 text-gray-400 mr-1" />
                          <p className="text-xs text-gray-500">
                            {new Date(record.date_of_payment).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {/* Account Summary */}
          <div className="dashboard-card bg-white overflow-hidden rounded-lg shadow-sm">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Account Summary</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="text-lg font-medium text-gray-900">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">Total Tax Records</p>
                  <p className="text-lg font-medium text-gray-900">{totalRecords}</p>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="text-lg font-medium text-gray-900">₹{totalAmount.toFixed(2)}</p>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">Tax Distribution</p>
                  <div className="flex space-x-4 mt-2">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                        <span className="text-blue-600 font-medium">{directTaxRecords.length}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Direct</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                        <span className="text-green-600 font-medium">{indirectTaxRecords.length}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Indirect</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Settings */}
          <div className="dashboard-card bg-white overflow-hidden rounded-lg shadow-sm">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Profile Settings</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <FiUpload className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm font-medium text-gray-900">Change Profile Picture</span>
                  </div>
                </button>
                
                <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <FiEdit className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm font-medium text-gray-900">Change Password</span>
                  </div>
                </button>
                
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">Receive notifications about tax updates and due dates</p>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">Enable two-factor authentication for added security</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
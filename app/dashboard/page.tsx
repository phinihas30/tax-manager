import React from 'react';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import StatsCard from '@/components/dashboard/StatsCard';
import TaxRecordsTable from '@/components/dashboard/TaxRecordsTable';
import { FiFileText, FiCalendar, FiAlertCircle, FiCreditCard, FiPieChart, FiTrendingUp, FiArrowDown, FiArrowUp, FiTarget } from 'react-icons/fi';
import AddTaxRecordButton from '@/components/dashboard/AddTaxRecordButton';
import { TaxRecord } from '@/types/supabase';
import Link from 'next/link';

export default async function Dashboard() {
  const cookieStore = cookies();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
        set: (name, value, options) => {
          cookieStore.set(name, value, options);
        },
        remove: (name, options) => {
          cookieStore.delete(name);
        },
      },
    }
  );
  
  const { data: { session } } = await supabase.auth.getSession();
  console.log("Session:", session?.user?.id);
  
  // Fetch tax records for the current user
  const { data: taxRecords, error } = await supabase
    .from('tax_records')
    .select('*')
    .eq('user_id', session?.user?.id)
    .order('date_of_payment', { ascending: false });
  
  if (error) {
    console.error('Error fetching tax records:', error);
  }
  
  console.log("Tax Records:", taxRecords);
  
  // Calculate statistics
  const directTaxRecords = taxRecords?.filter(record => record.tax_type === 'Direct') || [];
  const indirectTaxRecords = taxRecords?.filter(record => record.tax_type === 'Indirect') || [];
  const totalPaidAmount = taxRecords?.reduce((sum, record) => record.status === 'Paid' ? sum + Number(record.amount) : sum, 0) || 0;
  const pendingRecords = taxRecords?.filter(record => record.status === 'Pending') || [];
  const pendingAmount = pendingRecords.reduce((sum, record) => sum + Number(record.amount), 0) || 0;
  
  // Mock percentage changes for demonstration
  const mockPercentages = {
    totalPaid: { value: 12.5, isIncreasing: true },
    directTax: { value: 5.2, isIncreasing: true },
    indirectTax: { value: 3.1, isIncreasing: false },
    pending: { value: 8.4, isIncreasing: false }
  };
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome to your Dashboard</h1>
            <p className="text-gray-600 mt-1">Track and manage your tax records efficiently</p>
          </div>
          <AddTaxRecordButton />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatsCard 
          title="Total Tax Paid" 
          value={`₹${totalPaidAmount.toFixed(2)}`} 
          icon={<FiCreditCard size={24} />} 
          color="indigo"
          percentage={mockPercentages.totalPaid}
        />
        <StatsCard 
          title="Direct Tax Records" 
          value={directTaxRecords.length.toString()} 
          icon={<FiPieChart size={24} />}
          color="blue"
          percentage={mockPercentages.directTax}
        />
        <StatsCard 
          title="Indirect Tax Records" 
          value={indirectTaxRecords.length.toString()} 
          icon={<FiFileText size={24} />}
          color="green"
          percentage={mockPercentages.indirectTax}
        />
        <StatsCard 
          title="Pending Payments" 
          value={pendingRecords.length.toString()} 
          icon={<FiAlertCircle size={24} />}
          color="amber"
          percentage={mockPercentages.pending}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        <div className="lg:col-span-2 dashboard-card bg-white">
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Tax Summary</h2>
              <div className="flex space-x-2">
                <select className="text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                  <option>This Year</option>
                  <option>Last Year</option>
                  <option>All Time</option>
                </select>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-50 rounded-lg p-4">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-md bg-indigo-100 mr-3">
                    <FiTarget className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Direct vs Indirect</h3>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-gray-500">Direct Tax</p>
                    <div className="flex items-center">
                      <span className="text-xl font-bold">{directTaxRecords.length}</span>
                      <span className="ml-2 text-green-600 text-sm flex items-center">
                        <FiArrowUp className="mr-1" /> 5.2%
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500">Indirect Tax</p>
                    <div className="flex items-center">
                      <span className="text-xl font-bold">{indirectTaxRecords.length}</span>
                      <span className="ml-2 text-red-600 text-sm flex items-center">
                        <FiArrowDown className="mr-1" /> 3.1%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ 
                    width: directTaxRecords.length === 0 && indirectTaxRecords.length === 0 
                      ? '0%' 
                      : `${(directTaxRecords.length / (directTaxRecords.length + indirectTaxRecords.length) * 100)}%` 
                  }}></div>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-md bg-blue-100 mr-3">
                    <FiTrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Payment Status</h3>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-gray-500">Paid</p>
                    <div className="flex items-center">
                      <span className="text-xl font-bold">₹{totalPaidAmount.toFixed(2)}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500">Pending</p>
                    <div className="flex items-center">
                      <span className="text-xl font-bold">₹{pendingAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ 
                    width: totalPaidAmount === 0 && pendingAmount === 0
                      ? '0%'
                      : `${(totalPaidAmount / (totalPaidAmount + pendingAmount) * 100)}%`
                  }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="dashboard-card bg-white">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Payments</h2>
          </div>
          <div className="p-4">
            {pendingRecords.length > 0 ? (
              <div className="space-y-3">
                {pendingRecords.slice(0, 3).map((record) => (
                  <div key={record.id} className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-gray-800">{record.tax_name}</p>
                      <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                        {record.status}
                      </span>
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                      <p className="text-gray-500">Amount: <span className="text-gray-700">₹{Number(record.amount).toFixed(2)}</span></p>
                      <p className="text-gray-500">Due: <span className="text-gray-700">{new Date(record.date_of_payment).toISOString().split('T')[0]}</span></p>
                    </div>
                  </div>
                ))}
                {pendingRecords.length > 3 && (
                  <div className="text-center">
                    <Link href="/dashboard/direct-tax" className="text-sm text-indigo-600 hover:text-indigo-800">
                      View all pending payments ({pendingRecords.length})
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-gray-500">No pending payments</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-card bg-white overflow-hidden mb-8">
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Tax Records</h2>
            <div>
              <Link href="/dashboard/export" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                Export Data
              </Link>
            </div>
          </div>
        </div>
        <TaxRecordsTable records={taxRecords as TaxRecord[] || []} />
      </div>
    </div>
  );
} 
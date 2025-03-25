"use client";

import React, { useEffect, useState } from 'react';
import { FiFilter, FiDownload, FiBarChart2 } from 'react-icons/fi';
import { createBrowserClient } from '@supabase/ssr';
import { TaxRecord } from '@/types/supabase';
import AddTaxRecordButton from '@/components/dashboard/AddTaxRecordButton';

export default function IndirectTaxPage() {
  const [indirectTaxRecords, setIndirectTaxRecords] = useState<TaxRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const fetchIndirectTaxRecords = async () => {
      setIsLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          return;
        }
        
        let query = supabase
          .from('tax_records')
          .select('*')
          .eq('user_id', session.user.id)
          .eq('tax_type', 'Indirect')
          .order('date_of_payment', { ascending: false });
        
        if (filterStatus) {
          query = query.eq('status', filterStatus);
        }
        
        const { data, error } = await query;
        
        if (error) {
          throw error;
        }
        
        setIndirectTaxRecords(data || []);
      } catch (error) {
        console.error('Error fetching indirect tax records:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchIndirectTaxRecords();
  }, [filterStatus]);

  const totalAmount = indirectTaxRecords.reduce((sum, record) => sum + Number(record.amount), 0);
  const paidAmount = indirectTaxRecords.reduce((sum, record) => 
    record.status === 'Paid' ? sum + Number(record.amount) : sum, 0);
  const pendingAmount = totalAmount - paidAmount;

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Indirect Tax Management</h1>
            <p className="text-gray-600 mt-1">Manage your GST, sales tax, and other indirect taxes</p>
          </div>
          <AddTaxRecordButton defaultTaxType="Indirect" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="dashboard-card bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 mr-4">
              <FiBarChart2 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Indirect Tax</p>
              <h3 className="text-xl font-bold text-gray-900">₹{totalAmount.toFixed(2)}</h3>
            </div>
          </div>
        </div>
        
        <div className="dashboard-card bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 mr-4">
              <FiBarChart2 className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Paid Amount</p>
              <h3 className="text-xl font-bold text-gray-900">₹{paidAmount.toFixed(2)}</h3>
            </div>
          </div>
        </div>
        
        <div className="dashboard-card bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-amber-100 mr-4">
              <FiBarChart2 className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Amount</p>
              <h3 className="text-xl font-bold text-gray-900">₹{pendingAmount.toFixed(2)}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-card bg-white overflow-hidden rounded-lg shadow-sm mb-6">
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Indirect Tax Records</h2>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <select
                  className="appearance-none pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={filterStatus || ''}
                  onChange={(e) => setFilterStatus(e.target.value || null)}
                >
                  <option value="">All Status</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Overdue">Overdue</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <FiFilter className="h-4 w-4" />
                </div>
              </div>
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <FiDownload className="mr-2 h-4 w-4" /> Export
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tax Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date of Payment
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    Loading tax records...
                  </td>
                </tr>
              ) : indirectTaxRecords.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    No indirect tax records found. Add your first record with the button above.
                  </td>
                </tr>
              ) : (
                indirectTaxRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{record.tax_name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">₹{Number(record.amount).toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(record.date_of_payment).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full 
                        ${record.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                          record.status === 'Overdue' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.notes || '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="dashboard-card bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Indirect Tax Information</h2>
        <div className="prose prose-sm text-gray-700">
          <p>Indirect taxes are taxes imposed on goods and services rather than on income or profits. They include:</p>
          <ul>
            <li><strong>GST (Goods and Services Tax):</strong> Tax on most goods and services sold</li>
            <li><strong>Sales Tax:</strong> Tax on sale of goods to the end consumer</li>
            <li><strong>Excise Duty:</strong> Tax on production of goods</li>
            <li><strong>Customs Duty:</strong> Tax on imports and exports</li>
            <li><strong>Service Tax:</strong> Tax on services provided</li>
          </ul>
          <p>Indirect taxes are typically regressive and are ultimately passed on to the end consumer as part of the purchase price.</p>
        </div>
      </div>
    </div>
  );
} 
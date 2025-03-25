"use client";

import React, { useEffect, useState } from 'react';
import { FiDownload, FiBarChart2, FiPieChart, FiFileText, FiCalendar } from 'react-icons/fi';
import { createBrowserClient } from '@supabase/ssr';
import { TaxRecord } from '@/types/supabase';
import { exportToCSV, exportToJSON, exportToTXT } from '@/utils/exportUtils';

export default function ReportsClient() {
  const [isLoading, setIsLoading] = useState(true);
  const [taxRecords, setTaxRecords] = useState<TaxRecord[]>([]);
  const [directTaxRecords, setDirectTaxRecords] = useState<TaxRecord[]>([]);
  const [indirectTaxRecords, setIndirectTaxRecords] = useState<TaxRecord[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [directTaxAmount, setDirectTaxAmount] = useState(0);
  const [indirectTaxAmount, setIndirectTaxAmount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [pendingAmount, setPendingAmount] = useState(0);
  const [monthlyData, setMonthlyData] = useState<{month: string; amount: number; count: number}[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'txt'>('csv');

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          return;
        }
        
        // Fetch tax records for the current user
        const { data: records, error } = await supabase
          .from('tax_records')
          .select('*')
          .eq('user_id', session.user.id)
          .order('date_of_payment', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        const fetchedRecords = records || [];
        setTaxRecords(fetchedRecords);
        
        // Calculate statistics
        const directRecords = fetchedRecords.filter(record => record.tax_type === 'Direct');
        const indirectRecords = fetchedRecords.filter(record => record.tax_type === 'Indirect');
        setDirectTaxRecords(directRecords);
        setIndirectTaxRecords(indirectRecords);
        
        const total = fetchedRecords.reduce((sum, record) => sum + Number(record.amount), 0);
        setTotalAmount(total);
        
        const directTotal = directRecords.reduce((sum, record) => sum + Number(record.amount), 0);
        setDirectTaxAmount(directTotal);
        setIndirectTaxAmount(total - directTotal);
        
        const paid = fetchedRecords.reduce((sum, record) => 
          record.status === 'Paid' ? sum + Number(record.amount) : sum, 0);
        setPaidAmount(paid);
        setPendingAmount(total - paid);
        
        // Calculate monthly data (for the current year)
        const currentYear = new Date().getFullYear();
        const monthData = Array(12).fill(0).map((_, index) => {
          const monthRecords = fetchedRecords.filter(record => {
            const recordDate = new Date(record.date_of_payment);
            return recordDate.getFullYear() === currentYear && recordDate.getMonth() === index;
          });
          
          return {
            month: new Date(currentYear, index).toLocaleString('default', { month: 'short' }),
            amount: monthRecords.reduce((sum, record) => sum + Number(record.amount), 0),
            count: monthRecords.length
          };
        });
        setMonthlyData(monthData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Handle monthly report downloads
  const handleMonthlyReportDownload = (monthIndex: number) => {
    const month = new Date();
    month.setMonth(month.getMonth() - monthIndex);
    
    const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    
    const monthName = month.toLocaleString('default', { month: 'long' });
    const year = month.getFullYear();
    
    const monthlyRecords = taxRecords.filter(record => {
      const recordDate = new Date(record.date_of_payment);
      return recordDate >= startOfMonth && recordDate <= endOfMonth;
    });
    
    const filename = `${monthName}_${year}_Tax_Report`;
    
    // Default to CSV export
    exportToCSV(monthlyRecords, filename);
  };
  
  // Handle tax type report downloads
  const handleTaxTypeReportDownload = (taxType: 'Direct' | 'Indirect' | 'All') => {
    let records = [];
    let filename = '';
    
    if (taxType === 'Direct') {
      records = directTaxRecords;
      filename = 'Direct_Tax_Report';
    } else if (taxType === 'Indirect') {
      records = indirectTaxRecords;
      filename = 'Indirect_Tax_Report';
    } else {
      records = taxRecords;
      filename = 'Annual_Tax_Summary';
    }
    
    // Default to CSV export
    exportToCSV(records, filename);
  };
  
  // Handle custom date range report
  const handleCustomDateRangeReport = () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates.');
      return;
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start > end) {
      alert('Start date must be before end date.');
      return;
    }
    
    const filteredRecords = taxRecords.filter(record => {
      const recordDate = new Date(record.date_of_payment);
      return recordDate >= start && recordDate <= end;
    });
    
    const filename = `Tax_Report_${startDate}_to_${endDate}`;
    
    if (exportFormat === 'csv') {
      exportToCSV(filteredRecords, filename);
    } else if (exportFormat === 'json') {
      exportToJSON(filteredRecords, filename);
    } else {
      exportToTXT(filteredRecords, filename);
    }
  };

  // Handle chart export
  const handleChartExport = () => {
    // This is a simplified implementation
    // In a real app, you would use a library like html2canvas 
    // to capture the chart as an image
    
    // For now, we'll just export the data as CSV
    const monthlyExportData = monthlyData.map(data => ({
      month: data.month,
      amount: data.amount,
      count: data.count,
      tax_type: 'Monthly Summary',
      tax_name: `${data.month} Summary`,
      date_of_payment: new Date().toISOString(),
      status: 'Summary',
      notes: 'Chart export data'
    }));
    
    exportToCSV(monthlyExportData as any[], 'Tax_Distribution_Chart');
    alert('Chart data exported as CSV. In a complete implementation, this would export the actual chart image.');
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tax Reports</h1>
            <p className="text-gray-600 mt-1">Generate and download tax reports</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="dashboard-card bg-white overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Monthly Reports</h2>
            </div>
          </div>
          <div className="p-5">
            <p className="text-sm text-gray-500 mb-4">Download monthly tax reports for your records</p>
            
            <div className="space-y-3">
              {[...Array(3)].map((_, index) => {
                const month = new Date();
                month.setMonth(month.getMonth() - index);
                const monthName = month.toLocaleString('default', { month: 'long' });
                const year = month.getFullYear();
                
                return (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="p-2 rounded-md bg-indigo-100 mr-3">
                        <FiCalendar className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{monthName} {year}</p>
                        <p className="text-xs text-gray-500">All tax records</p>
                      </div>
                    </div>
                    <button 
                      className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                      onClick={() => handleMonthlyReportDownload(index)}
                    >
                      <FiDownload className="mr-1 h-4 w-4" /> Download
                    </button>
                  </div>
                );
              })}
              
              <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mt-2">
                View all monthly reports
              </button>
            </div>
          </div>
        </div>
        
        <div className="dashboard-card bg-white overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Tax Type Reports</h2>
            </div>
          </div>
          <div className="p-5">
            <p className="text-sm text-gray-500 mb-4">Download reports by tax type</p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="p-2 rounded-md bg-blue-100 mr-3">
                    <FiPieChart className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Direct Tax Report</p>
                    <p className="text-xs text-gray-500">{directTaxRecords.length} records</p>
                  </div>
                </div>
                <button 
                  className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                  onClick={() => handleTaxTypeReportDownload('Direct')}
                >
                  <FiDownload className="mr-1 h-4 w-4" /> Download
                </button>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="p-2 rounded-md bg-green-100 mr-3">
                    <FiFileText className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Indirect Tax Report</p>
                    <p className="text-xs text-gray-500">{indirectTaxRecords.length} records</p>
                  </div>
                </div>
                <button 
                  className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                  onClick={() => handleTaxTypeReportDownload('Indirect')}
                >
                  <FiDownload className="mr-1 h-4 w-4" /> Download
                </button>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="p-2 rounded-md bg-amber-100 mr-3">
                    <FiBarChart2 className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Annual Summary</p>
                    <p className="text-xs text-gray-500">Complete tax summary</p>
                  </div>
                </div>
                <button 
                  className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                  onClick={() => handleTaxTypeReportDownload('All')}
                >
                  <FiDownload className="mr-1 h-4 w-4" /> Download
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="dashboard-card bg-white overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Export Options</h2>
            </div>
          </div>
          <div className="p-5">
            <p className="text-sm text-gray-500 mb-4">Choose a format to export your data</p>
            
            <div className="space-y-3">
              <button 
                className={`w-full flex items-center justify-between p-3 border ${exportFormat === 'csv' ? 'border-indigo-300 bg-indigo-50' : 'border-gray-200'} rounded-lg hover:bg-gray-50`}
                onClick={() => setExportFormat('csv')}
              >
                <span className="font-medium">CSV (.csv)</span>
                <FiDownload className="h-4 w-4 text-gray-500" />
              </button>
              
              <button 
                className={`w-full flex items-center justify-between p-3 border ${exportFormat === 'json' ? 'border-indigo-300 bg-indigo-50' : 'border-gray-200'} rounded-lg hover:bg-gray-50`}
                onClick={() => setExportFormat('json')}
              >
                <span className="font-medium">JSON (.json)</span>
                <FiDownload className="h-4 w-4 text-gray-500" />
              </button>
              
              <button 
                className={`w-full flex items-center justify-between p-3 border ${exportFormat === 'txt' ? 'border-indigo-300 bg-indigo-50' : 'border-gray-200'} rounded-lg hover:bg-gray-50`}
                onClick={() => setExportFormat('txt')}
              >
                <span className="font-medium">Text (.txt)</span>
                <FiDownload className="h-4 w-4 text-gray-500" />
              </button>
            </div>
            
            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">Custom Date Range</label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                  <input 
                    type="date" 
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">End Date</label>
                  <input 
                    type="date" 
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              <button 
                className="mt-3 w-full btn-gradient py-2 px-4 border-0 rounded-md shadow-sm text-sm font-medium text-white"
                onClick={handleCustomDateRangeReport}
              >
                Generate Custom Report
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="dashboard-card bg-white overflow-hidden mb-8">
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Tax Summary Chart</h2>
            <button 
              className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
              onClick={handleChartExport}
            >
              <FiDownload className="mr-1 h-4 w-4" /> Export Chart
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Tax Distribution</h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                {/* Chart would go here in a real implementation */}
                <div className="text-center p-4">
                  <div className="flex flex-col space-y-2">
                    {monthlyData.slice(0, 6).map((data, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-16 text-xs text-gray-500">{data.month}</div>
                        <div className="relative h-5 w-full bg-gray-200 rounded">
                          <div 
                            className="absolute top-0 left-0 h-5 bg-indigo-500 rounded"
                            style={{ width: `${(data.amount / (Math.max(...monthlyData.map(d => d.amount)) || 1)) * 100}%` }}
                          ></div>
                        </div>
                        <div className="w-20 text-xs text-gray-500">₹{data.amount.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Tax Type Distribution</h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                {/* Pie chart would go here in a real implementation */}
                <div className="text-center p-4">
                  <div className="flex flex-col items-center">
                    <div className="w-40 h-40 rounded-full border-8 border-indigo-500 relative mb-4">
                      <div 
                        className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-green-500"
                        style={{ 
                          clipPath: totalAmount > 0 ? `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((directTaxAmount / totalAmount) * 2 * Math.PI)}% ${50 - 50 * Math.sin((directTaxAmount / totalAmount) * 2 * Math.PI)}%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)` : 'none'
                        }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-sm font-medium text-gray-700">Total: ₹{totalAmount.toFixed(2)}</div>
                      </div>
                    </div>
                    <div className="flex space-x-6">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
                        <div className="text-sm text-gray-700">Direct: ₹{directTaxAmount.toFixed(2)}</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <div className="text-sm text-gray-700">Indirect: ₹{indirectTaxAmount.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
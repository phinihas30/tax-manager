"use client";

import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiFilter, FiSearch, FiChevronDown, FiChevronUp, FiMoreVertical, FiEdit } from 'react-icons/fi';
import { TaxRecord } from '@/types/supabase';
import EditTaxRecordModal from './EditTaxRecordModal';
import DeleteTaxRecordModal from './DeleteTaxRecordModal';

interface TaxRecordsTableProps {
  records: TaxRecord[];
}

const TaxRecordsTable: React.FC<TaxRecordsTableProps> = ({ records }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [sortField, setSortField] = useState<'tax_name' | 'amount' | 'date_of_payment'>('date_of_payment');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [editingRecord, setEditingRecord] = useState<TaxRecord | null>(null);
  const [deletingRecord, setDeletingRecord] = useState<TaxRecord | null>(null);
  const [debugInfo, setDebugInfo] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredRecords, setFilteredRecords] = useState<TaxRecord[]>(records);

  useEffect(() => {
    // Debug info to help troubleshoot
    setDebugInfo(`Records count: ${records?.length || 0}`);
    console.log("TaxRecordsTable records:", records);
  }, [records]);
  
  useEffect(() => {
    let result = [...records];
    
    // Apply search filter
    if (searchTerm.trim()) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(record => 
        record.tax_name.toLowerCase().includes(lowerSearchTerm) ||
        record.tax_type.toLowerCase().includes(lowerSearchTerm) ||
        record.status.toLowerCase().includes(lowerSearchTerm) ||
        (record.notes && record.notes.toLowerCase().includes(lowerSearchTerm)) ||
        record.amount.toString().includes(lowerSearchTerm)
      );
    }

    // Apply type filter
    if (filterType !== 'All') {
      result = result.filter(record => record.tax_type === filterType);
    }

    // Apply status filter
    if (filterStatus !== 'All') {
      result = result.filter(record => record.status === filterStatus);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortField === 'tax_name') {
        return sortDirection === 'asc' 
          ? a.tax_name.localeCompare(b.tax_name) 
          : b.tax_name.localeCompare(a.tax_name);
      } else if (sortField === 'amount') {
        return sortDirection === 'asc' 
          ? Number(a.amount) - Number(b.amount) 
          : Number(b.amount) - Number(a.amount);
      } else {
        // date_of_payment
        return sortDirection === 'asc' 
          ? new Date(a.date_of_payment).getTime() - new Date(b.date_of_payment).getTime() 
          : new Date(b.date_of_payment).getTime() - new Date(a.date_of_payment).getTime();
      }
    });
    
    setFilteredRecords(result);
  }, [records, sortField, sortDirection, searchTerm, filterType, filterStatus]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      // Use fixed date format to ensure consistency between server and client rendering
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } catch (error) {
      return dateString;
    }
  };

  const handleSort = (field: 'tax_name' | 'amount' | 'date_of_payment') => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setFilterType('All');
    setFilterStatus('All');
  };

  const onEdit = (record: TaxRecord) => {
    setEditingRecord(record);
  };

  const onDelete = (record: TaxRecord) => {
    setDeletingRecord(record);
  };

  return (
    <>
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tax records..."
              value={searchTerm}
              onChange={handleSearch}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500">{filteredRecords.length} records</span>
            
            <div className="relative">
              <button 
                onClick={toggleFilter}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FiFilter className="mr-2 h-4 w-4" />
                Filter
              </button>
              
              {isFilterOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="py-1 px-3">
                    <div className="py-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Type</label>
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="All">All Types</option>
                        <option value="Direct">Direct</option>
                        <option value="Indirect">Indirect</option>
                      </select>
                    </div>
                    
                    <div className="py-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="All">All Status</option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                        <option value="Overdue">Overdue</option>
                      </select>
                    </div>
                    
                    <div className="mt-3 border-t border-gray-100 pt-3 pb-1">
                      <button
                        onClick={resetFilters}
                        className="text-sm text-indigo-600 hover:text-indigo-900"
                      >
                        Reset Filters
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Debug info - visible only in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-gray-100 text-xs text-gray-500 p-2">
          {debugInfo}
        </div>
      )}
      
      {filteredRecords.length === 0 ? (
        <div className="text-center py-10">
          <div className="text-gray-400 mb-2">
            <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">No tax records found</p>
          {records?.length > 0 && (
            <p className="text-sm text-gray-400 mt-1">Try changing your filters or search term</p>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('tax_name')}
                >
                  Tax Details
                  {sortField === 'tax_name' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? <FiChevronUp className="inline h-4 w-4" /> : <FiChevronDown className="inline h-4 w-4" />}
                    </span>
                  )}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('amount')}
                >
                  Amount
                  {sortField === 'amount' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? <FiChevronUp className="inline h-4 w-4" /> : <FiChevronDown className="inline h-4 w-4" />}
                    </span>
                  )}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('date_of_payment')}
                >
                  Date
                  {sortField === 'date_of_payment' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? <FiChevronUp className="inline h-4 w-4" /> : <FiChevronDown className="inline h-4 w-4" />}
                    </span>
                  )}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{record.tax_name}</div>
                          <div className="text-sm text-gray-500">{record.tax_type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">₹{Number(record.amount).toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(record.date_of_payment)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => onEdit(record)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <FiEdit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDelete(record)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <FiSearch className="h-10 w-10 text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">No tax records found</h3>
                      <p className="text-gray-500">
                        {searchTerm ? `No results for "${searchTerm}"` : 'Try adjusting your filters or add a new tax record'}
                      </p>
                      <button 
                        onClick={resetFilters}
                        className="mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Reset Filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">{filteredRecords.length}</span> of{" "}
              <span className="font-medium">{records?.length || 0}</span> records
            </div>
            <div className="flex space-x-2">
              <button 
                className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                disabled={true}
              >
                Previous
              </button>
              <button 
                className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                disabled={true}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      
      {editingRecord && (
        <EditTaxRecordModal
          record={editingRecord}
          onClose={() => setEditingRecord(null)}
        />
      )}
      
      {deletingRecord && (
        <DeleteTaxRecordModal
          record={deletingRecord}
          onClose={() => setDeletingRecord(null)}
        />
      )}
    </>
  );
};

export default TaxRecordsTable; 
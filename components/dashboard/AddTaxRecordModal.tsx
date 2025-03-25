"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FiX } from 'react-icons/fi';
import { createBrowserClient } from '@supabase/ssr';
import Modal from '@/components/ui/Modal';

interface AddTaxRecordFormValues {
  tax_type: 'Direct' | 'Indirect';
  tax_name: string;
  amount: number;
  date_of_payment: string;
  status: 'Pending' | 'Paid';
  notes?: string;
}

interface AddTaxRecordModalProps {
  onClose: () => void;
  defaultTaxType?: 'Direct' | 'Indirect';
}

const AddTaxRecordModal: React.FC<AddTaxRecordModalProps> = ({ onClose, defaultTaxType }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  const { register, handleSubmit, formState: { errors } } = useForm<AddTaxRecordFormValues>({
    defaultValues: {
      tax_type: defaultTaxType || 'Direct',
      status: 'Pending',
      date_of_payment: new Date().toISOString().split('T')[0],
    },
  });
  
  const onSubmit = async (data: AddTaxRecordFormValues) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        throw userError;
      }
      
      if (!userData.user) {
        throw new Error("User not authenticated");
      }
      
      const { error: insertError } = await supabase
        .from('tax_records')
        .insert({
          user_id: userData.user.id,
          tax_type: data.tax_type,
          tax_name: data.tax_name,
          amount: data.amount,
          date_of_payment: data.date_of_payment,
          status: data.status,
          notes: data.notes || '',
        });
      
      if (insertError) {
        console.error("Insert error:", insertError);
        throw insertError;
      }
      
      router.refresh();
      onClose();
    } catch (err) {
      console.error("Error adding tax record:", err);
      setError(err instanceof Error ? err.message : 'Failed to add tax record');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Modal onClose={onClose}>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Add Tax Record</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <FiX size={20} />
          </button>
        </div>
        
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
            <div>
              <label htmlFor="tax_type" className="block text-sm font-medium text-gray-700">
                Tax Type
              </label>
              <select
                id="tax_type"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('tax_type', { required: 'Tax type is required' })}
              >
                <option value="Direct">Direct Tax</option>
                <option value="Indirect">Indirect Tax</option>
              </select>
              {errors.tax_type && (
                <p className="mt-1 text-sm text-red-600">{errors.tax_type.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="tax_name" className="block text-sm font-medium text-gray-700">
                Tax Name
              </label>
              <input
                type="text"
                id="tax_name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="e.g., Income Tax, GST"
                {...register('tax_name', { 
                  required: 'Tax name is required',
                  minLength: { value: 2, message: 'Tax name must be at least 2 characters' }
                })}
              />
              {errors.tax_name && (
                <p className="mt-1 text-sm text-red-600">{errors.tax_name.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">₹</span>
                </div>
                <input
                  type="number"
                  id="amount"
                  className="mt-1 block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  step="0.01"
                  {...register('amount', { 
                    required: 'Amount is required',
                    min: { value: 0.01, message: 'Amount must be greater than 0' },
                    valueAsNumber: true
                  })}
                />
              </div>
              {errors.amount && (
                <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="date_of_payment" className="block text-sm font-medium text-gray-700">
                Date of Payment
              </label>
              <input
                type="date"
                id="date_of_payment"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('date_of_payment', { required: 'Date is required' })}
              />
              {errors.date_of_payment && (
                <p className="mt-1 text-sm text-red-600">{errors.date_of_payment.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('status', { required: 'Status is required' })}
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
              )}
            </div>
            
            <div className="sm:col-span-2">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Add any additional information here"
                {...register('notes')}
              />
            </div>
          </div>
          
          <div className="pt-4 flex justify-end">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddTaxRecordModal; 
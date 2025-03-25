"use client";

import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import AddTaxRecordModal from './AddTaxRecordModal';

interface AddTaxRecordButtonProps {
  defaultTaxType?: 'Direct' | 'Indirect';
}

const AddTaxRecordButton: React.FC<AddTaxRecordButtonProps> = ({ defaultTaxType }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="btn-gradient inline-flex items-center px-4 py-2 border-0 text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
      >
        <FiPlus className="mr-2 h-4 w-4" />
        Add Tax Record
      </button>
      
      {isModalOpen && (
        <AddTaxRecordModal onClose={() => setIsModalOpen(false)} defaultTaxType={defaultTaxType} />
      )}
    </>
  );
};

export default AddTaxRecordButton; 
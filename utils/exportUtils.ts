import { TaxRecord } from '@/types/supabase';

/**
 * Converts tax records to CSV format and triggers download
 */
export const exportToCSV = (records: TaxRecord[], filename: string) => {
  // Define CSV header
  const header = [
    'Tax Type',
    'Tax Name',
    'Amount (₹)',
    'Date of Payment',
    'Status',
    'Notes'
  ];
  
  // Convert records to CSV rows
  const rows = records.map(record => [
    record.tax_type,
    record.tax_name,
    record.amount.toString(),
    new Date(record.date_of_payment).toLocaleDateString(),
    record.status,
    record.notes || ''
  ]);
  
  // Combine header and rows
  const csvContent = [
    header.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  // Create and download the file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Converts tax records to JSON and triggers download
 */
export const exportToJSON = (records: TaxRecord[], filename: string) => {
  const simplified = records.map(record => ({
    tax_type: record.tax_type,
    tax_name: record.tax_name,
    amount: record.amount,
    date_of_payment: record.date_of_payment,
    status: record.status,
    notes: record.notes || ''
  }));
  
  const jsonContent = JSON.stringify(simplified, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.json`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Creates a simple table from tax records and triggers download
 * Note: In a production app, you would use a proper PDF generation library
 */
export const exportToTXT = (records: TaxRecord[], filename: string) => {
  // Create a simple text table
  const header = [
    'Tax Type'.padEnd(15),
    'Tax Name'.padEnd(25),
    'Amount (₹)'.padEnd(15),
    'Date'.padEnd(15),
    'Status'.padEnd(10),
    'Notes'
  ].join(' | ');
  
  const separator = '-'.repeat(header.length);
  
  const rows = records.map(record => [
    record.tax_type.padEnd(15),
    record.tax_name.padEnd(25),
    record.amount.toString().padEnd(15),
    new Date(record.date_of_payment).toLocaleDateString().padEnd(15),
    record.status.padEnd(10),
    record.notes || ''
  ].join(' | '));
  
  const textContent = [
    header,
    separator,
    ...rows
  ].join('\n');
  
  const blob = new Blob([textContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.txt`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}; 
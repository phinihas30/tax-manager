export interface TaxRecord {
  id: string;
  user_id: string;
  tax_type: 'Direct' | 'Indirect';
  tax_name: string;
  amount: number;
  date_of_payment: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  notes?: string;
  created_at: string;
} 
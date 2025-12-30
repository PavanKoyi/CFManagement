export interface Expense {
  id?: number;
  employeeId: number;
  date: Date;
  amount: number;
  category: string;
  description: string;
  paymentMethod: string;
  creditCardId?: number;
  isReimbursable: boolean;
  isReimbursed: boolean;
  tags: string[];
}

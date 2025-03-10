export interface BillingEntry {
  projectId: number;
  projectName: string;
  hours: number;
  rate: number;
  description: string;
  date: Date;
}

export interface ProjectBilling {
  projectId: number;
  projectName: string;
  totalHours: number;
  hourlyRate: number;
  entries: BillingEntry[];
  subtotal: number;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: number;
  invoiceNumber: string;
  date: Date;
  dueDate: Date;
  status: string;
  clientName: string;
  clientAddress: string;
  contactName: string;
  contactEmail: string;
  companyName: string;
  currency: string;
  totalAmount: number;
  subtotal: number;
  tax: number;
  total: number;
  billingPeriod: {
    startDate: Date;
    endDate: Date;
  };
  projectBillings: ProjectBilling[];
  items: InvoiceItem[];
}

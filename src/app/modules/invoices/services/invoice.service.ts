import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Invoice } from '../models/invoice.interface';
import { EmailRequest, EmailResponse } from '../models/email.interface';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private invoices: Invoice[] = [
    {
      id: 1,
      invoiceNumber: 'INV-2024-001',
      clientName: 'Tech Solutions Inc.',
      clientAddress: '123 Tech Street, Silicon Valley, CA 94025',
      contactName: 'John Smith',
      contactEmail: 'john.smith@techsolutions.com',
      companyName: 'Your Company Name',
      currency: 'USD',
      projectBillings: [{
        projectId: 1,
        projectName: 'Web Portal Development',
        totalHours: 150,
        hourlyRate: 100,
        entries: [
          {
            projectId: 1,
            projectName: 'Web Portal Development',
            hours: 80,
            rate: 100,
            description: 'Frontend Development',
            date: new Date('2024-03-01')
          },
          {
            projectId: 1,
            projectName: 'Web Portal Development',
            hours: 70,
            rate: 100,
            description: 'Backend Development',
            date: new Date('2024-03-01')
          }
        ],
        subtotal: 15000
      }],
      date: new Date('2024-03-01'),
      dueDate: new Date('2024-03-31'),
      totalAmount: 15000,
      subtotal: 15000,
      tax: 0,
      total: 15000,
      billingPeriod: {
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-03-31')
      },
      status: 'PENDING',
      items: [
        {
          description: 'Frontend Development',
          quantity: 80,
          rate: 100,
          amount: 8000
        },
        {
          description: 'Backend Development',
          quantity: 70,
          rate: 100,
          amount: 7000
        }
      ]
    },
    {
      id: 2,
      invoiceNumber: 'INV-2024-002',
      clientName: 'Digital Innovations Ltd',
      clientAddress: '456 Innovation Drive, San Francisco, CA 94107',
      contactName: 'Sarah Johnson',
      contactEmail: 'sarah.johnson@digitalinnovations.com',
      companyName: 'Your Company Name',
      currency: 'USD',
      projectBillings: [{
        projectId: 2,
        projectName: 'Mobile App Development',
        totalHours: 100,
        hourlyRate: 125,
        entries: [
          {
            projectId: 2,
            projectName: 'Mobile App Development',
            hours: 40,
            rate: 125,
            description: 'UI/UX Design',
            date: new Date('2024-03-05')
          },
          {
            projectId: 2,
            projectName: 'Mobile App Development',
            hours: 60,
            rate: 125,
            description: 'App Development',
            date: new Date('2024-03-05')
          }
        ],
        subtotal: 12500
      }],
      date: new Date('2024-03-05'),
      dueDate: new Date('2024-04-04'),
      totalAmount: 12500,
      subtotal: 12500,
      tax: 0,
      total: 12500,
      billingPeriod: {
        startDate: new Date('2024-03-05'),
        endDate: new Date('2024-04-04')
      },
      status: 'PAID',
      items: [
        {
          description: 'UI/UX Design',
          quantity: 40,
          rate: 125,
          amount: 5000
        },
        {
          description: 'App Development',
          quantity: 60,
          rate: 125,
          amount: 7500
        }
      ]
    },
    {
      id: 3,
      invoiceNumber: 'INV-2024-003',
      clientName: 'Cloud Systems Corp',
      clientAddress: '789 Cloud Avenue, Seattle, WA 98101',
      contactName: 'Michael Chen',
      contactEmail: 'michael.chen@cloudsystems.com',
      companyName: 'Your Company Name',
      currency: 'USD',
      projectBillings: [{
        projectId: 3,
        projectName: 'Cloud Migration Project',
        totalHours: 160,
        hourlyRate: 150,
        entries: [
          {
            projectId: 3,
            projectName: 'Cloud Migration Project',
            hours: 160,
            rate: 150,
            description: 'AWS Migration Services',
            date: new Date('2024-03-10')
          }
        ],
        subtotal: 24000
      }],
      date: new Date('2024-03-10'),
      dueDate: new Date('2024-04-09'),
      totalAmount: 24000,
      subtotal: 24000,
      tax: 0,
      total: 24000,
      billingPeriod: {
        startDate: new Date('2024-03-10'),
        endDate: new Date('2024-04-09')
      },
      status: 'PENDING',
      items: [
        {
          description: 'AWS Migration Services',
          quantity: 160,
          rate: 150,
          amount: 24000
        }
      ]
    },
    {
      id: 4,
      invoiceNumber: 'INV-2024-004',
      clientName: 'DataFlow Analytics',
      clientAddress: '321 Data Street, Boston, MA 02108',
      contactName: 'Emma Watson',
      contactEmail: 'emma.watson@dataflow.com',
      companyName: 'Your Company Name',
      currency: 'USD',
      projectBillings: [{
        projectId: 4,
        projectName: 'Data Pipeline Development',
        totalHours: 120,
        hourlyRate: 140,
        entries: [
          {
            projectId: 4,
            projectName: 'Data Pipeline Development',
            hours: 120,
            rate: 140,
            description: 'ETL Pipeline Implementation',
            date: new Date('2024-03-15')
          }
        ],
        subtotal: 16800
      }],
      date: new Date('2024-03-15'),
      dueDate: new Date('2024-04-14'),
      totalAmount: 16800,
      subtotal: 16800,
      tax: 0,
      total: 16800,
      billingPeriod: {
        startDate: new Date('2024-03-15'),
        endDate: new Date('2024-04-14')
      },
      status: 'PAID',
      items: [
        {
          description: 'ETL Pipeline Implementation',
          quantity: 120,
          rate: 140,
          amount: 16800
        }
      ]
    },
    {
      id: 5,
      invoiceNumber: 'INV-2024-005',
      clientName: 'Security Plus Ltd',
      clientAddress: '555 Cyber Road, Austin, TX 78701',
      contactName: 'David Miller',
      contactEmail: 'david.miller@securityplus.com',
      companyName: 'Your Company Name',
      currency: 'USD',
      projectBillings: [{
        projectId: 5,
        projectName: 'Security Audit & Implementation',
        totalHours: 80,
        hourlyRate: 175,
        entries: [
          {
            projectId: 5,
            projectName: 'Security Audit & Implementation',
            hours: 80,
            rate: 175,
            description: 'Security Assessment and Updates',
            date: new Date('2024-03-20')
          }
        ],
        subtotal: 14000
      }],
      date: new Date('2024-03-20'),
      dueDate: new Date('2024-04-19'),
      totalAmount: 14000,
      subtotal: 14000,
      tax: 0,
      total: 14000,
      billingPeriod: {
        startDate: new Date('2024-03-20'),
        endDate: new Date('2024-04-19')
      },
      status: 'OVERDUE',
      items: [
        {
          description: 'Security Assessment and Updates',
          quantity: 80,
          rate: 175,
          amount: 14000
        }
      ]
    },
    {
      id: 6,
      invoiceNumber: 'INV-2024-006',
      clientName: 'HealthTech Solutions',
      clientAddress: '444 Medical Plaza, Chicago, IL 60601',
      contactName: 'Lisa Brown',
      contactEmail: 'lisa.brown@healthtech.com',
      companyName: 'Your Company Name',
      currency: 'USD',
      projectBillings: [{
        projectId: 6,
        projectName: 'Healthcare App Development',
        totalHours: 200,
        hourlyRate: 130,
        entries: [
          {
            projectId: 6,
            projectName: 'Healthcare App Development',
            hours: 200,
            rate: 130,
            description: 'Mobile Health App Development',
            date: new Date('2024-03-25')
          }
        ],
        subtotal: 26000
      }],
      date: new Date('2024-03-25'),
      dueDate: new Date('2024-04-24'),
      totalAmount: 26000,
      subtotal: 26000,
      tax: 0,
      total: 26000,
      billingPeriod: {
        startDate: new Date('2024-03-25'),
        endDate: new Date('2024-04-24')
      },
      status: 'PENDING',
      items: [
        {
          description: 'Mobile Health App Development',
          quantity: 200,
          rate: 130,
          amount: 26000
        }
      ]
    },
    {
      id: 7,
      invoiceNumber: 'INV-2024-007',
      clientName: 'EduTech Innovations',
      clientAddress: '777 Learning Lane, Portland, OR 97201',
      contactName: 'Robert Taylor',
      contactEmail: 'robert.taylor@edutech.com',
      companyName: 'Your Company Name',
      currency: 'USD',
      projectBillings: [{
        projectId: 7,
        projectName: 'Learning Management System',
        totalHours: 180,
        hourlyRate: 120,
        entries: [
          {
            projectId: 7,
            projectName: 'Learning Management System',
            hours: 180,
            rate: 120,
            description: 'LMS Development and Integration',
            date: new Date('2024-03-30')
          }
        ],
        subtotal: 21600
      }],
      date: new Date('2024-03-30'),
      dueDate: new Date('2024-04-29'),
      totalAmount: 21600,
      subtotal: 21600,
      tax: 0,
      total: 21600,
      billingPeriod: {
        startDate: new Date('2024-03-30'),
        endDate: new Date('2024-04-29')
      },
      status: 'PAID',
      items: [
        {
          description: 'LMS Development and Integration',
          quantity: 180,
          rate: 120,
          amount: 21600
        }
      ]
    }
  ];

  private invoicesSubject = new BehaviorSubject<Invoice[]>(this.invoices);

  getInvoices(): Observable<Invoice[]> {
    return this.invoicesSubject.asObservable();
  }

  getInvoice(id: number): Observable<Invoice | undefined> {
    return of(this.invoices.find(inv => inv.id === id));
  }

  generateInvoicePdf(id: number): Observable<Blob> {
    // Mock PDF generation
    const pdfBlob = new Blob(['Mock PDF content'], { type: 'application/pdf' });
    return of(pdfBlob);
  }

  sendInvoiceByEmail(id: number, request: EmailRequest): Observable<EmailResponse> {
    // Mock email sending
    const response: EmailResponse = {
      success: true,
      messageId: 'mock-message-id',
      sentAt: new Date(),
      message: 'Email sent successfully',
      sentTo: request.recipients.to,
      invoiceNumber: this.invoices.find(inv => inv.id === id)?.invoiceNumber || '',
      recipients: {
        delivered: request.recipients.to.map(recipient => recipient.email)
      }
    };
    return of(response);
  }

  addInvoice(invoice: Omit<Invoice, 'id'>): void {
    const newId = Math.max(...this.invoices.map(inv => inv.id), 0) + 1;
    const newInvoice = { ...invoice, id: newId };
    this.invoices = [...this.invoices, newInvoice];
    this.invoicesSubject.next(this.invoices);
  }

  updateInvoice(invoice: Invoice): void {
    this.invoices = this.invoices.map(inv => 
      inv.id === invoice.id ? invoice : inv
    );
    this.invoicesSubject.next(this.invoices);
  }

  deleteInvoice(id: number): void {
    this.invoices = this.invoices.filter(inv => inv.id !== id);
    this.invoicesSubject.next(this.invoices);
  }
}

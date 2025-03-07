import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice.interface';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterModule,
    MatGridListModule
  ],
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
  displayedColumns: string[] = ['invoiceNumber', 'date', 'clientName', 'total', 'status', 'actions'];
  invoices: Invoice[] = [];
  selectedInvoice: Invoice | null = null;

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit() {
    this.loadInvoices();
  }

  loadInvoices() {
    this.invoiceService.getInvoices().subscribe({
      next: (invoices: Invoice[]) => {
        this.invoices = invoices;
        if (this.invoices.length > 0) {
          this.selectedInvoice = this.invoices[0];
        }
      },
      error: (error) => {
        console.error('Error loading invoices:', error);
      }
    });
  }

  selectInvoice(invoice: Invoice): void {
    this.selectedInvoice = invoice;
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'PAID': return 'green';
      case 'PENDING': return 'orange';
      case 'OVERDUE': return 'red';
      default: return 'black';
    }
  }
}

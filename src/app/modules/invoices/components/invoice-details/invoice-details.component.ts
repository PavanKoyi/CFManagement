import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice.interface';
import { EmailRequest, EmailRecipient } from '../../models/email.interface';
import { EMPTY, Observable, catchError, finalize, tap } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    MatTooltipModule
  ],
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private invoiceService = inject(InvoiceService);
  private snackBar = inject(MatSnackBar);

  invoice: Invoice | null = null;
  emailForm: FormGroup;
  isEmailSending = false;
  recipients: EmailRecipient[] = [];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor() {
    this.emailForm = this.fb.group({
      to: ['', [Validators.email]],
      cc: ['', [Validators.email]],
      bcc: ['', [Validators.email]],
      subject: ['', [Validators.required]],
      message: ['']
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      this.showErrorMessage('Invalid invoice ID');
      return;
    }

    const id = Number(idParam);
    if (isNaN(id)) {
      this.showErrorMessage('Invalid invoice ID format');
      return;
    }

    this.loadInvoice(id);
  }

  private loadInvoice(id: number): void {
    this.invoiceService.getInvoice(id).subscribe({
      next: (invoice: Invoice | undefined) => {
        if (!invoice) {
          this.showErrorMessage('Invoice not found');
          return;
        }
        this.invoice = invoice;
        this.initializeEmailForm();
      },
      error: (error) => {
        this.showErrorMessage('Failed to load invoice details');
        console.error('Error loading invoice:', error);
      }
    });
  }

  private initializeEmailForm(): void {
    if (!this.invoice) return;

    this.emailForm.patchValue({
      subject: `Invoice ${this.invoice.invoiceNumber} from ${this.invoice.companyName}`,
      message: this.getDefaultEmailMessage()
    });

    if (this.invoice.contactEmail && this.invoice.contactName) {
      this.recipients.push({
        email: this.invoice.contactEmail,
        name: this.invoice.contactName
      });
    }
  }

  private getDefaultEmailMessage(): string {
    if (!this.invoice) return '';

    return `Dear ${this.invoice.contactName},

Please find attached the invoice ${this.invoice.invoiceNumber} for services rendered.

Total Amount: ${this.invoice.currency} ${this.invoice.totalAmount}
Due Date: ${this.formatDate(this.invoice.dueDate)}

If you have any questions, please don't hesitate to contact us.

Best regards,
${this.invoice.companyName}`;
  }

  private formatDate(date: Date | undefined): string {
    return date ? new Date(date).toLocaleDateString() : 'N/A';
  }

  addRecipient(type: 'to' | 'cc' | 'bcc', event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const control = this.emailForm.get(type);

    if (value && control?.valid) {
      this.recipients.push({ email: value });
      // Clear the input value
      event.chipInput!.clear();
      control.reset();
    }
  }

  removeRecipient(recipient: EmailRecipient): void {
    const index = this.recipients.indexOf(recipient);
    if (index >= 0) {
      this.recipients.splice(index, 1);
    }
  }

  generatePdf(): void {
    if (!this.invoice) return;

    this.invoiceService.generateInvoicePdf(this.invoice.id).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        // Create a sanitized filename without spaces or special characters
        const safeFileName = `Invoice_${this.invoice?.invoiceNumber.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
        link.download = safeFileName;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        this.showErrorMessage('Failed to generate PDF');
        console.error('PDF generation error:', error);
      }
    });
  }

  sendInvoiceByEmail(): void {
    if (!this.invoice || !this.emailForm.valid || this.recipients.length === 0) {
      this.showErrorMessage('Please fill in all required fields and add at least one recipient');
      return;
    }

    this.isEmailSending = true;
    const emailRequest = this.prepareEmailRequest();

    this.invoiceService.sendInvoiceByEmail(this.invoice.id, emailRequest).pipe(
      tap(response => {
        if (response.success) {
          this.showSuccessMessage('Invoice sent successfully');
          this.emailForm.reset();
          this.recipients = [];
          this.initializeEmailForm();
        } else {
          this.showErrorMessage('Failed to send invoice');
        }
      }),
      catchError(error => {
        this.showErrorMessage('An error occurred while sending the invoice');
        console.error('Email sending error:', error);
        return EMPTY;
      }),
      finalize(() => {
        this.isEmailSending = false;
      })
    ).subscribe();
  }

  private prepareEmailRequest(): EmailRequest {
    if (!this.invoice) throw new Error('Invoice is not loaded');

    return {
      recipients: {
        to: this.recipients,
        cc: this.emailForm.get('cc')?.value ? [{ email: this.emailForm.get('cc')?.value }] : [],
        bcc: this.emailForm.get('bcc')?.value ? [{ email: this.emailForm.get('bcc')?.value }] : []
      },
      template: {
        subject: this.emailForm.get('subject')?.value || '',
        body: {
          text: this.emailForm.get('message')?.value || '',
          html: this.convertToHtml(this.emailForm.get('message')?.value || '')
        }
      },
      attachments: [],
      metadata: {
        invoiceId: this.invoice.id,
        invoiceNumber: this.invoice.invoiceNumber,
        sentBy: 'system',
        sentAt: new Date()
      }
    };
  }

  private convertToHtml(text: string): string {
    return text.replace(/\n/g, '<br>');
  }

  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }

  getTotalHours(): number {
    return this.invoice?.projectBillings?.reduce(
      (total, project) => total + (project.totalHours || 0), 0
    ) ?? 0;
  }
}

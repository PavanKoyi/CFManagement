export interface EmailRecipient {
  email: string;
  name?: string;
}

export interface EmailAttachment {
  filename: string;
  content: Buffer | string;
  contentType?: string;
}

export interface EmailRequest {
  recipients: {
    to: EmailRecipient[];
    cc?: EmailRecipient[];
    bcc?: EmailRecipient[];
  };
  template: {
    subject: string;
    body: {
      text: string;
      html: string;
    };
  };
  attachments?: EmailAttachment[];
  metadata?: {
    invoiceId: number;
    invoiceNumber: string;
    sentBy: string;
    sentAt: Date;
  };
}

export interface EmailResponse {
  success: boolean;
  messageId?: string;
  sentAt: Date;
  message: string;
  sentTo: EmailRecipient[];
  invoiceNumber: string;
  recipients: {
    delivered: string[];
    failed?: string[];
  };
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

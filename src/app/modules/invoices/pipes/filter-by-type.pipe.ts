import { Pipe, PipeTransform } from '@angular/core';
import { EmailRecipient } from '../models/email.interface';

@Pipe({
  name: 'filterByType',
  standalone: true
})
export class FilterByTypePipe implements PipeTransform {
  transform(recipients: EmailRecipient[], type: 'to' | 'cc' | 'bcc'): EmailRecipient[] {
    if (!recipients || !Array.isArray(recipients)) {
      return [];
    }
    return recipients.filter(recipient => recipient.type === type);
  }
}
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreditCardService } from './credit-card.service';

export interface UpcomingPayment {
  cardId: number;
  cardName: string;
  dueDate: string;
  minPayment: number;
  currentBalance: number;
}

export interface CreditStats {
  totalCreditLimit: number;
  totalCurrentBalance: number;
  totalAvailableCredit: number;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private creditCardService: CreditCardService) {}

  getUpcomingPayments(): Observable<UpcomingPayment[]> {
    return this.creditCardService.getCreditCards().pipe(
      map(cards => {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        
        return cards.map(card => {
          // Calculate due date for current month
          let dueDate = new Date(currentYear, currentMonth, card.paymentDueDate);
          
          // If due date has passed, show next month
          if (dueDate < today) {
            dueDate = new Date(currentYear, currentMonth + 1, card.paymentDueDate);
          }
          
          // Calculate minimum payment
          const minPayment = (card.currentBalance * card.minPaymentPercentage / 100);
          
          return {
            cardId: card.id!,
            cardName: card.cardName,
            dueDate: dueDate.toLocaleDateString(),
            minPayment: minPayment,
            currentBalance: card.currentBalance
          };
        }).sort((a, b) => {
          // Sort by due date (ascending)
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        });
      })
    );
  }

  getTotalCreditStats(): Observable<CreditStats> {
    return this.creditCardService.getCreditCards().pipe(
      map(cards => {
        const totalCreditLimit = cards.reduce((sum, card) => sum + card.creditLimit, 0);
        const totalCurrentBalance = cards.reduce((sum, card) => sum + card.currentBalance, 0);
        const totalAvailableCredit = cards.reduce((sum, card) => sum + card.availableCredit, 0);
        
        return {
          totalCreditLimit,
          totalCurrentBalance,
          totalAvailableCredit
        };
      })
    );
  }
}

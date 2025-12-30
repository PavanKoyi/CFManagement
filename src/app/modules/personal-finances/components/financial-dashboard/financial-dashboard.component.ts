
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CreditCardService } from '../../services/credit-card.service';
import { ExpenseService } from '../../services/expense.service';
import { PaymentService } from '../../services/payment.service';
import { CreditCard } from '../../models/credit-card.interface';
import { Expense } from '../../models/expense.interface';
import { UpcomingPayment } from '../../services/payment.service';

@Component({
  selector: 'app-financial-dashboard',
  templateUrl: './financial-dashboard.component.html',
  styleUrls: ['./financial-dashboard.component.scss']
})
export class FinancialDashboardComponent implements OnInit {
  creditCards$: Observable<CreditCard[]>;
  recentExpenses: Expense[] = [];
  upcomingPayments: UpcomingPayment[] = [];
  
  totalCreditLimit: number = 0;
  totalCurrentBalance: number = 0;
  totalAvailableCredit: number = 0;
  
  // Map to store card names by ID for quick lookup
  private cardNamesMap: Map<number, string> = new Map();

  constructor(
    private router: Router,
    private creditCardService: CreditCardService,
    private expenseService: ExpenseService,
    private paymentService: PaymentService
  ) {
    this.creditCards$ = this.creditCardService.getCreditCards().pipe(
      tap(cards => {
        // Build a map of card IDs to card names for quick lookup
        cards.forEach(card => {
          if (card.id) {
            this.cardNamesMap.set(card.id, card.cardName);
          }
        });
      })
    );
  }

  ngOnInit(): void {
    // Load recent expenses
    this.expenseService.getRecentExpenses(5).subscribe(expenses => {
      this.recentExpenses = expenses;
    });
    
    // Load upcoming payments
    this.paymentService.getUpcomingPayments().subscribe(payments => {
      this.upcomingPayments = payments;
    });
    
    // Load credit stats
    this.paymentService.getTotalCreditStats().subscribe(stats => {
      this.totalCreditLimit = stats.totalCreditLimit;
      this.totalCurrentBalance = stats.totalCurrentBalance;
      this.totalAvailableCredit = stats.totalAvailableCredit;
    });
  }

  addNewCard(): void {
    this.router.navigate(['/personal-finances/credit-cards/new']);
  }

  editCard(cardId: number): void {
    this.router.navigate(['/personal-finances/credit-cards', cardId, 'edit']);
  }

  viewCardExpenses(cardId: number): void {
    this.router.navigate(['/personal-finances/expenses'], { queryParams: { cardId } });
  }

  viewAllExpenses(): void {
    this.router.navigate(['/personal-finances/expenses']);
  }

  addNewExpense(): void {
    this.router.navigate(['/personal-finances/expenses/new']);
  }
  
  // Helper method to get card name by ID
  getCardName(cardId?: number): string {
    if (!cardId) return 'N/A';
    return this.cardNamesMap.get(cardId) || 'Unknown Card';
  }
}

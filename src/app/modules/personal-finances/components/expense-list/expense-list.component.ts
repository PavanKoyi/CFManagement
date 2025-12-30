import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExpenseService } from '../../services/expense.service';
import { CreditCardService } from '../../services/credit-card.service';
import { Expense } from '../../models/expense.interface';
import { CreditCard } from '../../models/credit-card.interface';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit {
  displayedColumns: string[] = ['date', 'description', 'category', 'amount', 'paymentMethod', 'isReimbursable', 'actions'];
  expenses$: Observable<Expense[]>;
  creditCards$: Observable<CreditCard[]>;
  
  selectedCardId?: number;
  filterCategory: string = '';
  
  categories: string[] = [
    'Dining', 'Transportation', 'Shopping', 'Utilities', 
    'Entertainment', 'Travel', 'Healthcare', 'Education', 'Other'
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private expenseService: ExpenseService,
    private creditCardService: CreditCardService
  ) {
    this.expenses$ = this.expenseService.getExpenses();
    this.creditCards$ = this.creditCardService.getCreditCards();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['cardId']) {
        this.selectedCardId = +params['cardId'];
        this.filterExpensesByCard();
      }
    });
  }

  filterExpensesByCard(): void {
    if (this.selectedCardId) {
      this.expenses$ = this.expenseService.getExpenses().pipe(
        map(expenses => expenses.filter(expense => expense.creditCardId === this.selectedCardId))
      );
    } else {
      this.expenses$ = this.expenseService.getExpenses();
    }
  }

  filterExpensesByCategory(): void {
    if (this.filterCategory) {
      this.expenses$ = this.expenseService.getExpenses().pipe(
        map(expenses => expenses.filter(expense => expense.category === this.filterCategory))
      );
    } else {
      this.filterExpensesByCard(); // Reset to card filter if any
    }
  }

  clearFilters(): void {
    this.selectedCardId = undefined;
    this.filterCategory = '';
    this.expenses$ = this.expenseService.getExpenses();
  }

  addExpense(): void {
    this.router.navigate(['/personal-finances/expenses/new']);
  }

  editExpense(id: number): void {
    this.router.navigate(['/personal-finances/expenses', id, 'edit']);
  }

  deleteExpense(id: number): void {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.expenseService.deleteExpense(id);
    }
  }
}

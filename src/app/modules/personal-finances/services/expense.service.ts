import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Expense } from '../models/expense.interface';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private expenses: Expense[] = [
    {
      id: 1,
      employeeId: 1,
      date: new Date('2023-06-15'),
      amount: 85.75,
      category: 'Dining',
      description: 'Dinner with clients',
      paymentMethod: 'CREDIT_CARD',
      creditCardId: 1,
      isReimbursable: true,
      isReimbursed: false,
      tags: ['business', 'client']
    },
    {
      id: 2,
      employeeId: 1,
      date: new Date('2023-06-12'),
      amount: 42.99,
      category: 'Transportation',
      description: 'Uber to airport',
      paymentMethod: 'CREDIT_CARD',
      creditCardId: 1,
      isReimbursable: true,
      isReimbursed: true,
      tags: ['travel', 'business']
    },
    {
      id: 3,
      employeeId: 1,
      date: new Date('2023-06-10'),
      amount: 129.99,
      category: 'Shopping',
      description: 'New headphones',
      paymentMethod: 'CREDIT_CARD',
      creditCardId: 2,
      isReimbursable: false,
      isReimbursed: false,
      tags: ['personal']
    }
  ];

  private expensesSubject = new BehaviorSubject<Expense[]>(this.expenses);

  constructor() {}

  getExpenses(): Observable<Expense[]> {
    return this.expensesSubject.asObservable();
  }

  getRecentExpenses(count: number): Observable<Expense[]> {
    return this.getExpenses().pipe(
      map(expenses => 
        [...expenses]
          .sort((a, b) => b.date.getTime() - a.date.getTime())
          .slice(0, count)
      )
    );
  }

  getExpenseById(id: number): Observable<Expense | undefined> {
    return this.getExpenses().pipe(
      map(expenses => expenses.find(expense => expense.id === id))
    );
  }

  addExpense(expense: Expense): void {
    const newExpense = {
      ...expense,
      id: this.getNextId()
    };
    this.expenses.push(newExpense);
    this.expensesSubject.next([...this.expenses]);
  }

  updateExpense(updatedExpense: Expense): void {
    const index = this.expenses.findIndex(expense => expense.id === updatedExpense.id);
    if (index !== -1) {
      this.expenses[index] = updatedExpense;
      this.expensesSubject.next([...this.expenses]);
    }
  }

  deleteExpense(id: number): void {
    this.expenses = this.expenses.filter(expense => expense.id !== id);
    this.expensesSubject.next([...this.expenses]);
  }

  private getNextId(): number {
    return Math.max(0, ...this.expenses.map(expense => expense.id || 0)) + 1;
  }
}

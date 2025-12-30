import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ExpenseService } from '../../services/expense.service';
import { CreditCardService } from '../../services/credit-card.service';
import { Expense } from '../../models/expense.interface';
import { CreditCard } from '../../models/credit-card.interface';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss']
})
export class ExpenseFormComponent implements OnInit {
  expenseForm: FormGroup;
  isEditMode: boolean = false;
  expenseId?: number;
  creditCards$: Observable<CreditCard[]>;
  
  categories: string[] = [
    'Dining', 'Transportation', 'Shopping', 'Utilities', 
    'Entertainment', 'Travel', 'Healthcare', 'Education', 'Other'
  ];
  
  paymentMethods: string[] = [
    'CASH', 'CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'MOBILE_PAYMENT'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private expenseService: ExpenseService,
    private creditCardService: CreditCardService
  ) {
    this.creditCards$ = this.creditCardService.getCreditCards();
    
    this.expenseForm = this.fb.group({
      date: [new Date(), Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      description: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      creditCardId: [null],
      isReimbursable: [false],
      isReimbursed: [false],
      tags: ['']
    });
  }

  ngOnInit(): void {
    // Check if a card ID was passed in the query params
    this.route.queryParams.subscribe(params => {
      if (params['cardId']) {
        // Pre-select the credit card and payment method
        this.expenseForm.patchValue({
          paymentMethod: 'CREDIT_CARD',
          creditCardId: +params['cardId']
        });
      }
    });
    
    // Set up conditional validation for credit card
    this.expenseForm.get('paymentMethod')?.valueChanges.subscribe(method => {
      const creditCardControl = this.expenseForm.get('creditCardId');
      if (method === 'CREDIT_CARD') {
        creditCardControl?.setValidators(Validators.required);
      } else {
        creditCardControl?.clearValidators();
        creditCardControl?.setValue(null);
      }
      creditCardControl?.updateValueAndValidity();
    });
    
    // Check if we're in edit mode
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.expenseId = +params['id'];
        this.loadExpenseData(this.expenseId);
      }
    });
  }

  loadExpenseData(id: number): void {
    this.expenseService.getExpenseById(id).subscribe(expense => {
      if (expense) {
        // Convert tags array to comma-separated string
        const tagsString = expense.tags ? expense.tags.join(', ') : '';
        
        this.expenseForm.patchValue({
          ...expense,
          tags: tagsString
        });
      }
    });
  }

  onSubmit(): void {
    if (this.expenseForm.valid) {
      const formValue = this.expenseForm.value;
      
      // Convert tags string to array
      const tags = formValue.tags ? 
        formValue.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag) : 
        [];
      
      const expenseData: Expense = {
        ...formValue,
        employeeId: 1, // In a real app, get this from auth service
        date: new Date(formValue.date),
        amount: +formValue.amount,
        tags
      };
      
      if (this.isEditMode && this.expenseId) {
        this.expenseService.updateExpense({
          ...expenseData,
          id: this.expenseId
        });
      } else {
        this.expenseService.addExpense(expenseData);
      }
      
      this.router.navigate(['/personal-finances/expenses']);
    }
  }

  cancel(): void {
    this.router.navigate(['/personal-finances/expenses']);
  }
}

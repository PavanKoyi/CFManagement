import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

import { GuestHouseService } from '../../services/guesthouse.service';
import { GuestHouse, GuestHouseExpense } from '../../models/guesthouse.interface';

@Component({
  selector: 'app-guesthouse-expenses',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule
  ],
  templateUrl: './guesthouse-expenses.component.html',
  styleUrls: ['./guesthouse-expenses.component.scss']
})
export class GuesthouseExpensesComponent implements OnInit {
  guestHouse$!: Observable<GuestHouse>;
  expenseForm: FormGroup;
  displayedColumns: string[] = ['date', 'category', 'description', 'amount', 'paidBy'];
  expenseCategories = ['UTILITIES', 'MAINTENANCE', 'SUPPLIES', 'OTHER'];

  constructor(
    private route: ActivatedRoute,
    private guestHouseService: GuestHouseService,
    private fb: FormBuilder
  ) {
    this.expenseForm = this.fb.group({
      date: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      paidBy: ['', Validators.required]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.guestHouse$ = this.guestHouseService.getGuestHouses()
        .pipe(
          map(guestHouses => {
            const guestHouse = guestHouses.find(gh => gh.id === +id);
            if (!guestHouse) {
              throw new Error(`Guest house with id ${id} not found`);
            }
            return guestHouse;
          })
        );
    }
  }

  onSubmit(guestHouse: GuestHouse) {
    if (this.expenseForm.valid) {
      const expense: Omit<GuestHouseExpense, 'id'> = {
        date: new Date(this.expenseForm.value.date),
        category: this.expenseForm.value.category,
        description: this.expenseForm.value.description,
        amount: +this.expenseForm.value.amount,
        paidBy: this.expenseForm.value.paidBy
      };

      this.guestHouseService.addExpense(guestHouse.id, expense);
      this.expenseForm.reset();
    }
  }

  getTotalExpenses(expenses: GuestHouseExpense[]): number {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  getExpensesByCategory(expenses: GuestHouseExpense[], category: string): GuestHouseExpense[] {
    return expenses.filter(expense => expense.category === category);
  }

  getCategoryTotal(expenses: GuestHouseExpense[], category: string): number {
    return this.getExpensesByCategory(expenses, category)
      .reduce((sum, expense) => sum + expense.amount, 0);
  }
}

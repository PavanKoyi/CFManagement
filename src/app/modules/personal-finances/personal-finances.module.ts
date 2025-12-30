import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DecimalPipe, DatePipe } from '@angular/common';

import { FinancialDashboardComponent } from './components/financial-dashboard/financial-dashboard.component';
import { CreditCardListComponent } from './components/credit-card-list/credit-card-list.component';
import { CreditCardFormComponent } from './components/credit-card-form/credit-card-form.component';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';

const routes: Routes = [
  { path: '', component: FinancialDashboardComponent },
  { path: 'credit-cards', component: CreditCardListComponent },
  { path: 'credit-cards/new', component: CreditCardFormComponent },
  { path: 'credit-cards/:id/edit', component: CreditCardFormComponent },
  { path: 'expenses', component: ExpenseListComponent },
  { path: 'expenses/new', component: ExpenseFormComponent },
  { path: 'expenses/:id/edit', component: ExpenseFormComponent }
];

@NgModule({
  declarations: [
    FinancialDashboardComponent,
    CreditCardListComponent,
    CreditCardFormComponent,
    ExpenseListComponent,
    ExpenseFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatChipsModule,
    MatCheckboxModule
  ],
  providers: [
    DecimalPipe,
    DatePipe
  ]
})
export class PersonalFinancesModule { }

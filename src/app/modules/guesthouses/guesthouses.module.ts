import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

// Import standalone component
import { GuestHouseListComponent } from './components/guesthouse-list/guesthouse-list.component';

const routes: Routes = [
  { path: '', component: GuestHouseListComponent },
  { path: 'new', loadComponent: () => import('./components/guest-house-form/guest-house-form.component').then(m => m.GuestHouseFormComponent) },
  { path: ':id', loadComponent: () => import('./components/guest-house-details/guest-house-details.component').then(m => m.GuestHouseDetailsComponent) },
  { path: ':id/edit', loadComponent: () => import('./components/guest-house-form/guest-house-form.component').then(m => m.GuestHouseFormComponent) },
  { path: ':id/expenses', loadComponent: () => import('./components/guesthouse-expenses/guesthouse-expenses.component').then(m => m.GuesthouseExpensesComponent) }
];

@NgModule({
  imports: [
    CommonModule,
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
    GuestHouseListComponent
  ]
})
export class GuestHousesModule { }

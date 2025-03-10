import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';

const routes: Routes = [
  { 
    path: '', 
    component: InvoiceListComponent 
  },
  { 
    path: 'new', 
    component: InvoiceFormComponent 
  },
  { 
    path: ':id', 
    component: InvoiceDetailsComponent 
  },
  { 
    path: ':id/edit', 
    component: InvoiceFormComponent 
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class InvoicesModule { }

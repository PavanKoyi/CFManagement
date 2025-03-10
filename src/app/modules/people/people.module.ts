import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { PeopleListComponent } from './components/people-list/people-list.component';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { PersonFormComponent } from './components/person-form/person-form.component';
import { PaymentHistoryComponent } from './components/payment-history/payment-history.component';

const routes: Routes = [
  { path: '', component: PeopleListComponent },
  { path: 'new', component: PersonFormComponent },
  { path: ':id', component: PersonDetailsComponent },
  { path: ':id/edit', component: PersonFormComponent },
  { path: ':id/payments', component: PaymentHistoryComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ]
})
export class PeopleModule { }

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'invoices',
    pathMatch: 'full'
  },
  {
    path: 'invoices',
    loadChildren: () => import('./modules/invoices/invoices.module').then(m => m.InvoicesModule)
  },
  {
    path: 'employees',
    loadChildren: () => import('./modules/employees/employees.module').then(m => m.EmployeesModule)
  },
  {
    path: 'people',
    loadChildren: () => import('./modules/people/people.module').then(m => m.PeopleModule)
  },
  {
    path: 'guesthouses',
    loadChildren: () => import('./modules/guesthouses/guesthouses.module').then(m => m.GuestHousesModule)
  }
];

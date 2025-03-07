import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, 
    MatSidenavModule, 
    MatListModule, 
    MatIconModule
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  menuItems = [
    { path: '/invoices', icon: 'receipt', label: 'Invoices' },
    { path: '/people', icon: 'people', label: 'People' },
    { path: '/employees', icon: 'badge', label: 'Employees' },
    { path: '/guesthouses', icon: 'house', label: 'Guest Houses' }
  ];
}

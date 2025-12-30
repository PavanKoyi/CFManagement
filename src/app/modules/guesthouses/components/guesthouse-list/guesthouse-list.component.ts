import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { GuestHouseService } from '../../services/guesthouse.service';
import { GuestHouse } from '../../models/guesthouse.interface';

@Component({
  selector: 'app-guesthouse-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './guesthouse-list.component.html',
  styleUrls: ['./guesthouse-list.component.scss']
})
export class GuestHouseListComponent implements OnInit {
  private guestHouseService = inject(GuestHouseService);
  
  guestHouses$: Observable<GuestHouse[]>;
  displayedColumns: string[] = ['name', 'address', 'occupancy', 'status', 'actions'];

  constructor() {
    this.guestHouses$ = this.guestHouseService.getGuestHouses();
  }

  ngOnInit(): void {
    // Any additional initialization if needed
  }
} 

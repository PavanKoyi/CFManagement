import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GuestHouseService } from '../../services/guesthouse.service';
import { GuestHouse, GuestHouseResident } from '../../models/guesthouse.interface';
import { AddResidentComponent } from '../add-resident/add-resident.component';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-guest-house-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatProgressBarModule,
    MatDialogModule
  ],
  templateUrl: './guest-house-details.component.html',
  styleUrls: ['./guest-house-details.component.scss']
})
export class GuestHouseDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private guestHouseService = inject(GuestHouseService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  guestHouse$!: Observable<GuestHouse>;
  residentColumns: string[] = ['employeeName', 'roomNumber', 'checkInDate', 'expectedCheckOutDate', 'actions'];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.showErrorMessage('Invalid guest house ID');
      return;
    }

    this.loadGuestHouse(+id);
  }

  private loadGuestHouse(id: number): void {
    this.guestHouse$ = this.guestHouseService.getGuestHouses().pipe(
      map(guestHouses => {
        const guestHouse = guestHouses.find(gh => gh.id === id);
        if (!guestHouse) {
          throw new Error(`Guest house with id ${id} not found`);
        }
        return guestHouse;
      }),
      catchError(error => {
        this.showErrorMessage('Failed to load guest house details');
        console.error('Error loading guest house:', error);
        return EMPTY;
      })
    );
  }

  getStatusIcon(status: string): string {
    switch (status.toUpperCase()) {
      case 'AVAILABLE': return 'check_circle';
      case 'FULL': return 'do_not_disturb_on';
      case 'MAINTENANCE': return 'build';
      default: return 'info';
    }
  }

  calculateLeaseEndDate(startDate: string | Date, duration: number): Date {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + duration);
    return date;
  }

  hasAvailableRooms(guestHouse: GuestHouse): boolean {
    return guestHouse.currentOccupants < guestHouse.totalRooms;
  }

  addNewResident(): void {
    this.guestHouse$.subscribe(guestHouse => {
      const occupiedRooms = guestHouse.currentResidents.map(resident => resident.roomNumber);
      const currentResidentIds = guestHouse.currentResidents.map(resident => resident.employeeId);
      
      const dialogRef = this.dialog.open(AddResidentComponent, {
        width: '500px',
        data: {
          guestHouseId: guestHouse.id,
          totalRooms: guestHouse.totalRooms,
          occupiedRooms: occupiedRooms,
          currentResidentIds: currentResidentIds
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.guestHouseService.addResident(guestHouse.id, {
            employeeId: result.employeeId,
            employeeName: result.employeeName,
            roomNumber: result.roomNumber.toString(),
            checkInDate: new Date(result.checkInDate),
            expectedCheckOutDate: result.expectedCheckOutDate ? new Date(result.expectedCheckOutDate) : undefined,
            status: 'ACTIVE'
          });
        }
      });
    });
  }

  viewResidentDetails(resident: GuestHouseResident): void {
    this.router.navigate(['/employees', resident.employeeId]);
  }

  checkOutResident(resident: GuestHouseResident): void {
    // Implement check out logic
    console.log('Check out resident', resident);
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }
}

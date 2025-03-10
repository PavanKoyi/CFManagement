import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { GuestHouseService } from '../../services/guesthouse.service';
import { GuestHouse } from '../../models/guesthouse.interface';

@Component({
  selector: 'app-guest-house-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatCardModule,
    RouterModule
  ],
  templateUrl: './guest-house-form.component.html',
  styleUrls: ['./guest-house-form.component.scss']
})
export class GuestHouseFormComponent implements OnInit {
  guestHouseForm!: FormGroup;
  isEditMode = false;
  guestHouseId?: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private guestHouseService: GuestHouseService
  ) {}

  ngOnInit() {
    this.initializeForm();
    
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.guestHouseId = +params['id'];
        this.loadGuestHouseData(this.guestHouseId);
      }
    });
  }

  private initializeForm() {
    this.guestHouseForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      totalRooms: ['', [Validators.required, Validators.min(1)]],
      monthlyRent: ['', [Validators.required, Validators.min(0)]],
      leaseStartDate: ['', Validators.required],
      leaseDuration: ['', [Validators.required, Validators.min(1)]],
      status: ['AVAILABLE', Validators.required]
    });
  }

  private loadGuestHouseData(id: number) {
    const guestHouse = this.guestHouseService.getGuestHouse(id);
    if (guestHouse) {
      this.guestHouseForm.patchValue({
        name: guestHouse.name,
        address: guestHouse.address,
        totalRooms: guestHouse.totalRooms,
        monthlyRent: guestHouse.monthlyRent,
        leaseStartDate: guestHouse.leaseStartDate,
        leaseDuration: guestHouse.leaseDuration,
        status: guestHouse.status
      });
    }
  }

  onSubmit() {
    if (this.guestHouseForm.valid) {
      const formValue = this.guestHouseForm.value;
      
      if (this.isEditMode && this.guestHouseId) {
        this.guestHouseService.updateGuestHouse({
          ...formValue,
          id: this.guestHouseId,
          currentOccupants: 0,
          currentResidents: [],
          expenses: []
        });
      } else {
        this.guestHouseService.addGuestHouse({
          ...formValue,
          currentOccupants: 0,
          currentResidents: [],
          expenses: []
        });
      }
      
      this.router.navigate(['/guesthouses']);
    }
  }
}

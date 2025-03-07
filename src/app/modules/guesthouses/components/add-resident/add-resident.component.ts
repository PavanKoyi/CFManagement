import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { Inject } from '@angular/core';
import { EmployeeService } from '../../../employees/services/employee.service';
import { Employee } from '../../../employees/models/employee.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-resident',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatNativeDateModule
  ],
  templateUrl: './add-resident.component.html',
  styleUrls: ['./add-resident.component.scss']
})
export class AddResidentComponent implements OnInit {
  residentForm: FormGroup;
  availableRooms: number[] = [];
  availableEmployees$: Observable<Employee[]>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddResidentComponent>,
    private employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public data: {
      guestHouseId: number,
      totalRooms: number,
      occupiedRooms: number[],
      currentResidentIds: number[]
    }
  ) {
    this.residentForm = this.fb.group({
      employee: ['', Validators.required],
      roomNumber: ['', Validators.required],
      checkInDate: ['', Validators.required],
      expectedCheckOutDate: ['', Validators.required]
    });

    // Get available employees (excluding current residents)
    this.availableEmployees$ = this.employeeService.getEmployees().pipe(
      map(employees => employees.filter(emp => 
        emp.id !== undefined && !this.data.currentResidentIds.includes(emp.id)
      ))
    );
  }

  ngOnInit() {
    // Generate available room numbers
    this.availableRooms = Array.from(
      { length: this.data.totalRooms },
      (_, i) => i + 1
    ).filter(room => !this.data.occupiedRooms.includes(room));
  }

  onSubmit() {
    if (this.residentForm.valid) {
      const formValue = this.residentForm.value;
      const selectedEmployee = formValue.employee;
      
      if (selectedEmployee && selectedEmployee.id !== undefined) {
        this.dialogRef.close({
          employeeId: selectedEmployee.id,
          employeeName: selectedEmployee.name,
          roomNumber: formValue.roomNumber,
          checkInDate: formValue.checkInDate,
          expectedCheckOutDate: formValue.expectedCheckOutDate
        });
      }
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}

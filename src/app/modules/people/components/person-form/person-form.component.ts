import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './person-form.component.html',
  styleUrl: './person-form.component.scss'
})
export class PersonFormComponent implements OnInit {
  personForm!: FormGroup;
  roles: string[] = ['Consultant', 'Senior Consultant', 'Manager', 'Director', 'Partner'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private peopleService: PeopleService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.personForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      phone: ['', Validators.required],
      joinDate: ['', Validators.required],
      address: ['', Validators.required],
      notes: ['']
    });
  }

  onSubmit() {
    if (this.personForm.valid) {
      const formData = this.personForm.value;
      console.log('Form submitted with data:', formData);
      
      // Add the new person using the service
      this.peopleService.addPerson({
        ...formData,
        joinDate: new Date(formData.joinDate)
      });
      
      console.log('POST request to /api/people');
      console.log('Request payload:', JSON.stringify(formData, null, 2));
      
      // Navigate back to people list after successful submission
      this.router.navigate(['/people']);
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched(this.personForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}

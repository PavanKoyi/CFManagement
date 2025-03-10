import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.interface';

@Component({
  selector: 'app-employee-onboarding',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './employee-onboarding.component.html',
  styleUrls: ['./employee-onboarding.component.scss']
})
export class EmployeeOnboardingComponent implements OnInit {
  employeeForm!: FormGroup;
  roles: string[] = ['Developer', 'Designer', 'Project Manager', 'QA Engineer', 'Business Analyst'];
  medicalPlans: string[] = ['Basic', 'Standard', 'Premium'];
  coverageTypes: string[] = ['Individual', 'Family'];
  isEditMode = false;
  employeeId?: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.initializeForm();
    
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.employeeId = +params['id'];
        this.loadEmployeeData(this.employeeId);
      }
    });
  }

  private initializeForm() {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      address: ['', Validators.required],
      startDate: ['', Validators.required],
      role: ['', Validators.required],
      employmentType: ['FULL_TIME', Validators.required],
      
      // Full-time specific fields
      annualSalary: [null],
      medical: this.fb.group({
        planType: [''],
        coverageType: [''],
        startDate: ['']
      }),
      retirement401k: this.fb.group({
        contributionPercentage: [null],
        companyMatch: [null]
      }),

      // Contractor specific fields
      hourlyRate: [null],
      expectedHoursPerWeek: [null],
      contractDuration: [null]
    });

    this.employeeForm.get('employmentType')?.valueChanges.subscribe(type => {
      this.updateValidators(type);
    });
  }

  private updateValidators(employmentType: string) {
    const fullTimeControls = ['annualSalary', 'medical', 'retirement401k'];
    const contractorControls = ['hourlyRate', 'expectedHoursPerWeek', 'contractDuration'];

    if (employmentType === 'FULL_TIME') {
      fullTimeControls.forEach(control => {
        this.employeeForm.get(control)?.setValidators(Validators.required);
      });
      contractorControls.forEach(control => {
        this.employeeForm.get(control)?.clearValidators();
      });
    } else {
      contractorControls.forEach(control => {
        this.employeeForm.get(control)?.setValidators(Validators.required);
      });
      fullTimeControls.forEach(control => {
        this.employeeForm.get(control)?.clearValidators();
      });
    }

    this.employeeForm.updateValueAndValidity();
  }

  private loadEmployeeData(id: number) {
    const employee = this.employeeService.getEmployee(id);
    if (employee) {
      const [firstName, lastName] = employee.name.split(' ');
      
      this.employeeForm.patchValue({
        firstName,
        lastName,
        email: employee.email,
        phone: employee.phone,
        address: employee.address,
        startDate: employee.joinDate,
        role: employee.role,
        employmentType: employee.employmentType
      });

      if (employee.employmentType === 'FULL_TIME') {
        this.employeeForm.patchValue({
          annualSalary: employee.annualSalary,
          medical: {
            planType: employee.medical.planType,
            coverageType: employee.medical.coverageType,
            startDate: employee.medical.startDate
          },
          retirement401k: {
            contributionPercentage: employee.retirement401k.contributionPercentage,
            companyMatch: employee.retirement401k.companyMatch
          }
        });
      } else if (employee.employmentType === 'CONTRACTOR') {
        this.employeeForm.patchValue({
          hourlyRate: employee.hourlyRate,
          expectedHoursPerWeek: employee.expectedHoursPerWeek,
          contractDuration: employee.contractDuration
        });
      }

      this.updateValidators(employee.employmentType);
    }
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const formValue = this.employeeForm.value;
      
      const employeeData = {
        ...formValue,
        name: `${formValue.firstName} ${formValue.lastName}`,
        joinDate: new Date(formValue.startDate)
      };

      delete employeeData.firstName;
      delete employeeData.lastName;

      if (this.isEditMode && this.employeeId) {
        this.employeeService.updateEmployee({
          ...employeeData,
          id: this.employeeId
        });
      } else {
        this.employeeService.addEmployee(employeeData);
      }

      this.router.navigate(['/employees']);
    }
  }
}

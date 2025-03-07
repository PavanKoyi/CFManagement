import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Employee, FullTimeEmployee, ContractorEmployee } from '../../models/employee.interface';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatChipsModule
  ],
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  employee$!: Observable<Employee>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employee$ = this.employeeService.getEmployeeById(+id).pipe(
        map(employee => {
          if (!employee) {
            throw new Error(`Employee with id ${id} not found`);
          }
          return employee;
        })
      );
    }
  }

  isFullTimeEmployee(employee: Employee): employee is FullTimeEmployee {
    return 'annualSalary' in employee;
  }

  getEmploymentStatus(employee: Employee): string {
    return this.isFullTimeEmployee(employee) ? 'Full Time' : 'Contractor';
  }

  getAnnualSalary(employee: Employee): number {
    return this.isFullTimeEmployee(employee) ? employee.annualSalary : 0;
  }

  getMedicalPlanInfo(employee: Employee): string {
    if (this.isFullTimeEmployee(employee)) {
      return `${employee.medical.planType} (${employee.medical.coverageType})`;
    }
    return '';
  }

  getRetirementContribution(employee: Employee): number {
    return this.isFullTimeEmployee(employee) ? employee.retirement401k.contributionPercentage : 0;
  }

  getHourlyRate(employee: Employee): number {
    return !this.isFullTimeEmployee(employee) ? (employee as ContractorEmployee).hourlyRate : 0;
  }

  getExpectedHours(employee: Employee): number {
    return !this.isFullTimeEmployee(employee) ? (employee as ContractorEmployee).expectedHoursPerWeek : 0;
  }

  getContractDuration(employee: Employee): number {
    return !this.isFullTimeEmployee(employee) ? (employee as ContractorEmployee).contractDuration : 0;
  }

  getStatusColor(employee: Employee): string {
    return this.isFullTimeEmployee(employee) ? 'primary' : 'accent';
  }

  goBack() {
    this.router.navigate(['/employees']);
  }

  editEmployee(id: number | undefined) {
    if (id) {
      this.router.navigate(['/employees', id, 'edit']);
    }
  }
}

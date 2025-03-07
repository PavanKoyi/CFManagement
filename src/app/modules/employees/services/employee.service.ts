import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee, FullTimeEmployee, ContractorEmployee } from '../models/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Senior Developer',
      phone: '123-456-7890',
      joinDate: new Date('2024-01-15'),
      address: '123 Main St',
      employmentType: 'FULL_TIME',
      annualSalary: 85000,
      medical: {
        planType: 'Premium',
        coverageType: 'Family',
        startDate: new Date('2024-01-15')
      },
      retirement401k: {
        contributionPercentage: 5,
        companyMatch: 4
      }
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Project Manager',
      phone: '123-456-7891',
      joinDate: new Date('2023-08-01'),
      address: '456 Oak St',
      employmentType: 'FULL_TIME',
      annualSalary: 95000,
      medical: {
        planType: 'Standard',
        coverageType: 'Individual',
        startDate: new Date('2023-08-01')
      },
      retirement401k: {
        contributionPercentage: 6,
        companyMatch: 4
      }
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'UI/UX Designer',
      phone: '123-456-7892',
      joinDate: new Date('2023-06-15'),
      address: '789 Pine St',
      employmentType: 'CONTRACTOR',
      hourlyRate: 65,
      expectedHoursPerWeek: 40,
      contractDuration: 6
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      role: 'Backend Developer',
      phone: '123-456-7893',
      joinDate: new Date('2023-09-20'),
      address: '321 Elm St',
      employmentType: 'FULL_TIME',
      annualSalary: 78000,
      medical: {
        planType: 'Standard',
        coverageType: 'Individual',
        startDate: new Date('2023-09-20')
      },
      retirement401k: {
        contributionPercentage: 4,
        companyMatch: 4
      }
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david@example.com',
      role: 'DevOps Engineer',
      phone: '123-456-7894',
      joinDate: new Date('2023-11-10'),
      address: '654 Maple St',
      employmentType: 'CONTRACTOR',
      hourlyRate: 75,
      expectedHoursPerWeek: 35,
      contractDuration: 12
    },
    {
      id: 6,
      name: 'Emily Davis',
      email: 'emily@example.com',
      role: 'QA Engineer',
      phone: '123-456-7895',
      joinDate: new Date('2024-02-01'),
      address: '987 Cedar St',
      employmentType: 'FULL_TIME',
      annualSalary: 72000,
      medical: {
        planType: 'Premium',
        coverageType: 'Family',
        startDate: new Date('2024-02-01')
      },
      retirement401k: {
        contributionPercentage: 5,
        companyMatch: 4
      }
    },
    {
      id: 7,
      name: 'Alex Turner',
      email: 'alex@example.com',
      role: 'Frontend Developer',
      phone: '123-456-7896',
      joinDate: new Date('2023-07-15'),
      address: '741 Birch St',
      employmentType: 'CONTRACTOR',
      hourlyRate: 60,
      expectedHoursPerWeek: 40,
      contractDuration: 9
    },
    {
      id: 8,
      name: 'Lisa Anderson',
      email: 'lisa@example.com',
      role: 'Product Owner',
      phone: '123-456-7897',
      joinDate: new Date('2023-10-05'),
      address: '852 Walnut St',
      employmentType: 'FULL_TIME',
      annualSalary: 88000,
      medical: {
        planType: 'Premium',
        coverageType: 'Individual',
        startDate: new Date('2023-10-05')
      },
      retirement401k: {
        contributionPercentage: 7,
        companyMatch: 4
      }
    },
    {
      id: 9,
      name: 'Chris Wilson',
      email: 'chris@example.com',
      role: 'System Architect',
      phone: '123-456-7898',
      joinDate: new Date('2023-12-01'),
      address: '963 Pine St',
      employmentType: 'FULL_TIME',
      annualSalary: 98000,
      medical: {
        planType: 'Premium',
        coverageType: 'Family',
        startDate: new Date('2023-12-01')
      },
      retirement401k: {
        contributionPercentage: 8,
        companyMatch: 4
      }
    },
    {
      id: 10,
      name: 'Rachel Green',
      email: 'rachel@example.com',
      role: 'Business Analyst',
      phone: '123-456-7899',
      joinDate: new Date('2024-01-20'),
      address: '159 Oak St',
      employmentType: 'CONTRACTOR',
      hourlyRate: 55,
      expectedHoursPerWeek: 30,
      contractDuration: 6
    }
  ];

  private employeesSubject = new BehaviorSubject<Employee[]>(this.employees);

  getEmployees(): Observable<Employee[]> {
    return this.employeesSubject.asObservable();
  }

  getEmployeeById(id: number): Observable<Employee | undefined> {
    return new BehaviorSubject<Employee | undefined>(
      this.employees.find(emp => emp.id === id)
    ).asObservable();
  }

  addEmployee(employee: Omit<FullTimeEmployee, 'id'> | Omit<ContractorEmployee, 'id'>): void {
    const newId = Math.max(...this.employees.map(e => e.id || 0), 0) + 1;
    const newEmployee: Employee = {
      ...employee,
      id: newId
    };
    this.employees = [...this.employees, newEmployee];
    this.employeesSubject.next(this.employees);
  }

  getEmployee(id: number): Employee | undefined {
    return this.employees.find(e => e.id === id);
  }

  updateEmployee(employee: Employee): void {
    const index = this.employees.findIndex(e => e.id === employee.id);
    if (index !== -1) {
      this.employees[index] = employee;
      this.employeesSubject.next([...this.employees]);
    }
  }

  deleteEmployee(id: number): void {
    this.employees = this.employees.filter(e => e.id !== id);
    this.employeesSubject.next(this.employees);
  }
}

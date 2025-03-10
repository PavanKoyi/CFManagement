import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'employmentType',
  standalone: true
})
export class EmploymentTypePipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'FULL_TIME':
        return 'Full Time';
      case 'CONTRACTOR':
        return 'Contractor';
      default:
        return value;
    }
  }
}
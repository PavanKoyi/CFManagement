import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Person } from '../models/person.interface';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private people: Person[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Consultant',
      phone: '123-456-7890',
      joinDate: new Date('2024-01-15'),
      address: '123 Main St'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Senior Consultant',
      phone: '123-456-7891',
      joinDate: new Date('2023-08-01'),
      address: '456 Oak St'
    }
  ];

  private peopleSubject = new BehaviorSubject<Person[]>(this.people);

  getPeople(): Observable<Person[]> {
    return this.peopleSubject.asObservable();
  }

  addPerson(person: Omit<Person, 'id'>): void {
    const newId = Math.max(...this.people.map(p => p.id), 0) + 1;
    const newPerson = { ...person, id: newId };
    this.people = [...this.people, newPerson];
    this.peopleSubject.next(this.people);
  }
}
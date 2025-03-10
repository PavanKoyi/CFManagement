import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { Person } from '../../models/person.interface';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule
  ],
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'role', 'phone', 'joinDate', 'actions'];
  people: Person[] = [];

  constructor(
    private router: Router,
    private peopleService: PeopleService
  ) {}

  ngOnInit() {
    this.peopleService.getPeople().subscribe(people => {
      this.people = people;
    });
  }

  viewPerson(id: number): void {
    this.router.navigate(['/people', id]);
  }

  editPerson(id: number): void {
    this.router.navigate(['/people', id, 'edit']);
  }

  viewPayments(id: number): void {
    this.router.navigate(['/people', id, 'payments']);
  }

  addPerson(): void {
    this.router.navigate(['/people/new']);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GuestHouse, GuestHouseExpense, GuestHouseResident } from '../models/guesthouse.interface';

@Injectable({
  providedIn: 'root'
})
export class GuestHouseService {
  private guestHouses: GuestHouse[] = [
    {
      id: 1,
      name: 'Maple Residence',
      address: '123 Maple Street, Downtown, City',
      totalRooms: 10,
      monthlyRent: 5000,
      leaseStartDate: new Date('2024-01-01'),
      leaseDuration: 12,
      currentOccupants: 3,
      status: 'AVAILABLE',
      currentResidents: [
        {
          employeeId: 1,
          employeeName: 'John Doe',
          roomNumber: '101',
          checkInDate: new Date('2024-01-15'),
          status: 'ACTIVE'
        },
        {
          employeeId: 2,
          employeeName: 'Jane Smith',
          roomNumber: '102',
          checkInDate: new Date('2024-01-20'),
          status: 'ACTIVE'
        }
      ],
      expenses: [
        {
          id: 1,
          date: new Date('2024-01-31'),
          category: 'UTILITIES',
          description: 'Electricity Bill - January',
          amount: 450,
          paidBy: 'Admin'
        },
        {
          id: 2,
          date: new Date('2024-02-01'),
          category: 'MAINTENANCE',
          description: 'Plumbing Repairs',
          amount: 300,
          paidBy: 'Maintenance'
        }
      ]
    },
    {
      id: 2,
      name: 'Oak View Apartments',
      address: '456 Oak Avenue, Suburb Area, City',
      totalRooms: 8,
      monthlyRent: 4200,
      leaseStartDate: new Date('2024-02-01'),
      leaseDuration: 24,
      currentOccupants: 1,
      status: 'AVAILABLE',
      currentResidents: [
        {
          employeeId: 3,
          employeeName: 'Robert Wilson',
          roomNumber: '201',
          checkInDate: new Date('2024-02-05'),
          status: 'ACTIVE'
        }
      ],
      expenses: [
        {
          id: 1,
          date: new Date('2024-02-28'),
          category: 'UTILITIES',
          description: 'Water Bill - February',
          amount: 180,
          paidBy: 'Admin'
        }
      ]
    }
  ];

  private guestHousesSubject = new BehaviorSubject<GuestHouse[]>(this.guestHouses);

  getGuestHouses(): Observable<GuestHouse[]> {
    return this.guestHousesSubject.asObservable();
  }

  getGuestHouse(id: number): GuestHouse | undefined {
    return this.guestHouses.find(gh => gh.id === id);
  }

  addGuestHouse(guestHouse: Omit<GuestHouse, 'id'>): void {
    const newId = Math.max(...this.guestHouses.map(gh => gh.id), 0) + 1;
    const newGuestHouse = { ...guestHouse, id: newId };
    this.guestHouses = [...this.guestHouses, newGuestHouse];
    this.guestHousesSubject.next(this.guestHouses);
  }

  updateGuestHouse(guestHouse: GuestHouse): void {
    this.guestHouses = this.guestHouses.map(gh => 
      gh.id === guestHouse.id ? guestHouse : gh
    );
    this.guestHousesSubject.next(this.guestHouses);
  }

  addResident(guestHouseId: number, resident: GuestHouseResident): void {
    const guestHouse = this.guestHouses.find(gh => gh.id === guestHouseId);
    if (guestHouse) {
      guestHouse.currentResidents = [...guestHouse.currentResidents, resident];
      guestHouse.currentOccupants++;
      if (guestHouse.currentOccupants === guestHouse.totalRooms) {
        guestHouse.status = 'FULL';
      }
      this.updateGuestHouse(guestHouse);
    }
  }

  addExpense(guestHouseId: number, expense: Omit<GuestHouseExpense, 'id'>): void {
    const guestHouse = this.guestHouses.find(gh => gh.id === guestHouseId);
    if (guestHouse) {
      const newExpense: GuestHouseExpense = {
        ...expense,
        id: Math.max(...guestHouse.expenses.map(e => e.id), 0) + 1
      };
      guestHouse.expenses = [...guestHouse.expenses, newExpense];
      this.updateGuestHouse(guestHouse);
    }
  }
}

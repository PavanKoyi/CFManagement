export interface GuestHouse {
  id: number;
  name: string;
  address: string;
  totalRooms: number;
  monthlyRent: number;
  leaseStartDate: Date;
  leaseDuration: number; // in months
  currentOccupants: number;
  status: 'AVAILABLE' | 'FULL' | 'MAINTENANCE';
  currentResidents: GuestHouseResident[];
  expenses: GuestHouseExpense[];
}

export interface GuestHouseResident {
  employeeId: number;
  employeeName: string;
  roomNumber: string;
  checkInDate: Date;
  expectedCheckOutDate?: Date;
  status: 'ACTIVE' | 'CHECKED_OUT';
}

export interface GuestHouseExpense {
  id: number;
  date: Date;
  category: 'UTILITIES' | 'MAINTENANCE' | 'SUPPLIES' | 'OTHER';
  description: string;
  amount: number;
  paidBy: string;
  receiptUrl?: string;
}
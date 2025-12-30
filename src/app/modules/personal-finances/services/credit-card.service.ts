import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { CreditCard } from '../models/credit-card.interface';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  private creditCards: CreditCard[] = [
    {
      id: 1,
      employeeId: 1,
      cardName: 'Everyday Rewards',
      cardNumber: '**** **** **** 1234',
      cardType: 'Visa',
      issuer: 'Chase',
      expiryDate: new Date('2025-12-31'),
      creditLimit: 5000,
      currentBalance: 1250.75,
      availableCredit: 3749.25,
      statementDate: 15,
      paymentDueDate: 10,
      minPaymentPercentage: 2,
      annualFee: 0,
      interestRate: 18.99,
      rewardPoints: 2500,
      isActive: true
    },
    {
      id: 2,
      employeeId: 1,
      cardName: 'Travel Miles',
      cardNumber: '**** **** **** 5678',
      cardType: 'Mastercard',
      issuer: 'Citi',
      expiryDate: new Date('2024-08-31'),
      creditLimit: 10000,
      currentBalance: 3450.50,
      availableCredit: 6549.50,
      statementDate: 20,
      paymentDueDate: 15,
      minPaymentPercentage: 3,
      annualFee: 95,
      interestRate: 16.99,
      rewardPoints: 15000,
      isActive: true
    }
  ];

  private creditCardsSubject = new BehaviorSubject<CreditCard[]>(this.creditCards);

  constructor() {}

  getCreditCards(): Observable<CreditCard[]> {
    return this.creditCardsSubject.asObservable();
  }

  getCreditCardById(id: number): Observable<CreditCard | undefined> {
    return new Observable(observer => {
      const card = this.creditCards.find(card => card.id === id);
      observer.next(card);
      observer.complete();
    });
  }

  addCreditCard(card: CreditCard): void {
    const newCard = {
      ...card,
      id: this.getNextId()
    };
    this.creditCards.push(newCard);
    this.creditCardsSubject.next([...this.creditCards]);
  }

  updateCreditCard(updatedCard: CreditCard): void {
    const index = this.creditCards.findIndex(card => card.id === updatedCard.id);
    if (index !== -1) {
      this.creditCards[index] = updatedCard;
      this.creditCardsSubject.next([...this.creditCards]);
    }
  }

  deleteCreditCard(id: number): void {
    this.creditCards = this.creditCards.filter(card => card.id !== id);
    this.creditCardsSubject.next([...this.creditCards]);
  }

  private getNextId(): number {
    return Math.max(0, ...this.creditCards.map(card => card.id || 0)) + 1;
  }
}

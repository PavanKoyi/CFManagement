import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CreditCardService } from '../../services/credit-card.service';
import { CreditCard } from '../../models/credit-card.interface';

@Component({
  selector: 'app-credit-card-list',
  templateUrl: './credit-card-list.component.html',
  styleUrls: ['./credit-card-list.component.scss']
})
export class CreditCardListComponent implements OnInit {
  displayedColumns: string[] = ['cardName', 'issuer', 'cardType', 'expiryDate', 'currentBalance', 'availableCredit', 'actions'];
  creditCards$: Observable<CreditCard[]>;

  constructor(
    private router: Router,
    private creditCardService: CreditCardService
  ) {
    this.creditCards$ = this.creditCardService.getCreditCards();
  }

  ngOnInit(): void {
  }

  addCreditCard(): void {
    this.router.navigate(['/personal-finances/credit-cards/new']);
  }

  editCreditCard(id: number): void {
    this.router.navigate(['/personal-finances/credit-cards', id, 'edit']);
  }

  viewExpenses(id: number): void {
    this.router.navigate(['/personal-finances/expenses'], { queryParams: { cardId: id } });
  }

  deleteCreditCard(id: number): void {
    if (confirm('Are you sure you want to delete this credit card?')) {
      this.creditCardService.deleteCreditCard(id);
    }
  }
}
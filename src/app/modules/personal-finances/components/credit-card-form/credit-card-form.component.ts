import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CreditCardService } from '../../services/credit-card.service';
import { CreditCard } from '../../models/credit-card.interface';

@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.scss']
})
export class CreditCardFormComponent implements OnInit {
  cardForm: FormGroup;
  isEditMode = false;
  cardId?: number;
  
  cardTypes = ['VISA', 'MASTERCARD', 'AMEX', 'DISCOVER', 'OTHER'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private creditCardService: CreditCardService
  ) {
    this.cardForm = this.fb.group({
      cardName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{4}-\d{4}-\d{4}$/)]],
      cardType: ['', Validators.required],
      issuer: ['', Validators.required],
      expiryDate: ['', Validators.required],
      creditLimit: [0, [Validators.required, Validators.min(0)]],
      currentBalance: [0, [Validators.required, Validators.min(0)]],
      statementDate: [1, [Validators.required, Validators.min(1), Validators.max(31)]],
      paymentDueDate: [1, [Validators.required, Validators.min(1), Validators.max(31)]],
      minPaymentPercentage: [2, [Validators.required, Validators.min(1), Validators.max(100)]],
      annualFee: [0, [Validators.required, Validators.min(0)]],
      interestRate: [0, [Validators.required, Validators.min(0)]],
      rewardPoints: [0, [Validators.required, Validators.min(0)]],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.cardId = +params['id'];
        this.loadCardData(this.cardId);
      }
    });
  }

  loadCardData(id: number): void {
    this.creditCardService.getCreditCardById(id).subscribe(card => {
      if (card) {
        this.cardForm.patchValue({
          ...card,
          expiryDate: card.expiryDate.toISOString().substring(0, 10)
        });
      }
    });
  }

  onSubmit(): void {
    if (this.cardForm.valid) {
      const formValue = this.cardForm.value;
      const currentBalance = +formValue.currentBalance;
      const creditLimit = +formValue.creditLimit;
      
      // Calculate available credit
      const availableCredit = creditLimit - currentBalance;
      
      const cardData: CreditCard = {
        ...formValue,
        employeeId: 1, // In a real app, get this from auth service
        currentBalance,
        creditLimit,
        availableCredit,
        expiryDate: new Date(formValue.expiryDate)
      };
      
      if (this.isEditMode && this.cardId) {
        this.creditCardService.updateCreditCard({
          ...cardData,
          id: this.cardId
        });
      } else {
        this.creditCardService.addCreditCard(cardData);
      }
      
      this.router.navigate(['/personal-finances/credit-cards']);
    }
  }

  cancel(): void {
    this.router.navigate(['/personal-finances/credit-cards']);
  }
}

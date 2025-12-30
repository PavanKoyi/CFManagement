export interface CreditCard {
  id?: number;
  employeeId: number;
  cardName: string;
  cardNumber: string;
  cardType: string;
  issuer: string;
  expiryDate: Date;
  creditLimit: number;
  currentBalance: number;
  availableCredit: number;
  statementDate: number;
  paymentDueDate: number;
  minPaymentPercentage: number;
  annualFee: number;
  interestRate: number;
  rewardPoints: number;
  isActive: boolean;
}
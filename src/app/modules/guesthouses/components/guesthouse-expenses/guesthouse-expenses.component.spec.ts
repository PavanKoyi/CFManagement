import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuesthouseExpensesComponent } from './guesthouse-expenses.component';

describe('GuesthouseExpensesComponent', () => {
  let component: GuesthouseExpensesComponent;
  let fixture: ComponentFixture<GuesthouseExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuesthouseExpensesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuesthouseExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

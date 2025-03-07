import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestHouseFormComponent } from './guest-house-form.component';

describe('GuestHouseFormComponent', () => {
  let component: GuestHouseFormComponent;
  let fixture: ComponentFixture<GuestHouseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestHouseFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuestHouseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

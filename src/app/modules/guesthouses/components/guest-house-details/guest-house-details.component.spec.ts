import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestHouseDetailsComponent } from './guest-house-details.component';

describe('GuestHouseDetailsComponent', () => {
  let component: GuestHouseDetailsComponent;
  let fixture: ComponentFixture<GuestHouseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestHouseDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuestHouseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

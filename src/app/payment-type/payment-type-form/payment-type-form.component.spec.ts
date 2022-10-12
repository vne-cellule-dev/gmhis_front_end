import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTypeFormComponent } from './payment-type-form.component';

describe('PaymentTypeFormComponent', () => {
  let component: PaymentTypeFormComponent;
  let fixture: ComponentFixture<PaymentTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentTypeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

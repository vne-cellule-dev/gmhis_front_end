import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashRegisterFormComponent } from './cash-register-form.component';

describe('CashRegisterFormComponent', () => {
  let component: CashRegisterFormComponent;
  let fixture: ComponentFixture<CashRegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashRegisterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashRegisterListComponent } from './cash-register-list.component';

describe('CashRegisterListComponent', () => {
  let component: CashRegisterListComponent;
  let fixture: ComponentFixture<CashRegisterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashRegisterListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashRegisterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

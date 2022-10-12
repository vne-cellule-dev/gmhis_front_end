import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacologicformFormComponent } from './pharmacologicform-form.component';

describe('PharmacologicformFormComponent', () => {
  let component: PharmacologicformFormComponent;
  let fixture: ComponentFixture<PharmacologicformFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacologicformFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacologicformFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

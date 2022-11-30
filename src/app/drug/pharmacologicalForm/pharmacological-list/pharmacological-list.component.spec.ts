import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacologicalListComponent } from './pharmacological-list.component';

describe('PharmacologicalListComponent', () => {
  let component: PharmacologicalListComponent;
  let fixture: ComponentFixture<PharmacologicalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacologicalListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacologicalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

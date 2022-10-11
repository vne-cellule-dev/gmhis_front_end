import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacologicformListComponent } from './pharmacologicform-list.component';

describe('PharmacologicformListComponent', () => {
  let component: PharmacologicformListComponent;
  let fixture: ComponentFixture<PharmacologicformListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacologicformListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacologicformListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

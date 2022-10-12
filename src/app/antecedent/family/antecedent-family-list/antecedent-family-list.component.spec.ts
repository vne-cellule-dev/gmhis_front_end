import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntecedentFamilyListComponent } from './antecedent-family-list.component';

describe('AntecedentFamilyListComponent', () => {
  let component: AntecedentFamilyListComponent;
  let fixture: ComponentFixture<AntecedentFamilyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntecedentFamilyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AntecedentFamilyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

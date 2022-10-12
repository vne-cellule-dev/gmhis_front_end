import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CroFamilyListComponent } from './cro-family-list.component';

describe('CroFamilyListComponent', () => {
  let component: CroFamilyListComponent;
  let fixture: ComponentFixture<CroFamilyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CroFamilyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CroFamilyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

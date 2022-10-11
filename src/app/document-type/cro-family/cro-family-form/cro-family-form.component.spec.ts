import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CroFamilyFormComponent } from './cro-family-form.component';

describe('CroFamilyFormComponent', () => {
  let component: CroFamilyFormComponent;
  let fixture: ComponentFixture<CroFamilyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CroFamilyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CroFamilyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

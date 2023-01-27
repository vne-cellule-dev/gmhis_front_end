import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CractivityFormComponent } from './cractivity-form.component';

describe('CractivityFormComponent', () => {
  let component: CractivityFormComponent;
  let fixture: ComponentFixture<CractivityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CractivityFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CractivityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

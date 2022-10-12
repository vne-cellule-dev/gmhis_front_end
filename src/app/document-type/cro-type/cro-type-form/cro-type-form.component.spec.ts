import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CroTypeFormComponent } from './cro-type-form.component';

describe('CroTypeFormComponent', () => {
  let component: CroTypeFormComponent;
  let fixture: ComponentFixture<CroTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CroTypeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CroTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

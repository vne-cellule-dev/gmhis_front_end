import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcuFormComponent } from './dcu-form.component';

describe('DcuFormComponent', () => {
  let component: DcuFormComponent;
  let fixture: ComponentFixture<DcuFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcuFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DcuFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

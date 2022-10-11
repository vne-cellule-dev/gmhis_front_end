import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstantTypeFormComponent } from './constant-type-form.component';

describe('ConstantTypeFormComponent', () => {
  let component: ConstantTypeFormComponent;
  let fixture: ComponentFixture<ConstantTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstantTypeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstantTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

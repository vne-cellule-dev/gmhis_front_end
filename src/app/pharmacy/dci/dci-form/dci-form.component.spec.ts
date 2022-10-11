import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DciFormComponent } from './dci-form.component';

describe('DciFormComponent', () => {
  let component: DciFormComponent;
  let fixture: ComponentFixture<DciFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DciFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DciFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

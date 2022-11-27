import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionCollectComponent } from './prescription-collect.component';

describe('PrescriptionCollectComponent', () => {
  let component: PrescriptionCollectComponent;
  let fixture: ComponentFixture<PrescriptionCollectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrescriptionCollectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionCollectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratyListComponent } from './laboraty-list.component';

describe('LaboratyListComponent', () => {
  let component: LaboratyListComponent;
  let fixture: ComponentFixture<LaboratyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

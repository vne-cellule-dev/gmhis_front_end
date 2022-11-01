import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientInWaitingRoomComponent } from './patient-in-waiting-room.component';

describe('PatientInWaitingRoomComponent', () => {
  let component: PatientInWaitingRoomComponent;
  let fixture: ComponentFixture<PatientInWaitingRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientInWaitingRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientInWaitingRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

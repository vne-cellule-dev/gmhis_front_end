import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstantWaitingRoomComponent } from './constant-waiting-room.component';

describe('ConstantWaitingRoomComponent', () => {
  let component: ConstantWaitingRoomComponent;
  let fixture: ComponentFixture<ConstantWaitingRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstantWaitingRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstantWaitingRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

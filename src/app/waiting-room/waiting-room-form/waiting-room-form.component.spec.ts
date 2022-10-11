import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingRoomFormComponent } from './waiting-room-form.component';

describe('WaitingRoomFormComponent', () => {
  let component: WaitingRoomFormComponent;
  let fixture: ComponentFixture<WaitingRoomFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingRoomFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingRoomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

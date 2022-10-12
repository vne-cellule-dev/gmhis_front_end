import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingRoomListComponent } from './waiting-room-list.component';

describe('WaitingRoomListComponent', () => {
  let component: WaitingRoomListComponent;
  let fixture: ComponentFixture<WaitingRoomListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingRoomListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingRoomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

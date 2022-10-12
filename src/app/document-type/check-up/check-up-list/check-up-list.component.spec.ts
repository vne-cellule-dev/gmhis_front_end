import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckUpListComponent } from './check-up-list.component';

describe('CheckUpListComponent', () => {
  let component: CheckUpListComponent;
  let fixture: ComponentFixture<CheckUpListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckUpListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckUpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

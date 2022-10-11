import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticianListComponent } from './practician-list.component';

describe('PracticianListComponent', () => {
  let component: PracticianListComponent;
  let fixture: ComponentFixture<PracticianListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticianListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticianListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

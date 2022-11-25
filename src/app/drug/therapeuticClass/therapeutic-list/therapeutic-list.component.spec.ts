import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapeuticListComponent } from './therapeutic-list.component';

describe('TherapeuticListComponent', () => {
  let component: TherapeuticListComponent;
  let fixture: ComponentFixture<TherapeuticListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TherapeuticListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapeuticListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

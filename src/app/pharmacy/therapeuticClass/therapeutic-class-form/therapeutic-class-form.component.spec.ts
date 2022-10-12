import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapeuticClassFormComponent } from './therapeutic-class-form.component';

describe('TherapeuticClassFormComponent', () => {
  let component: TherapeuticClassFormComponent;
  let fixture: ComponentFixture<TherapeuticClassFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TherapeuticClassFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapeuticClassFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

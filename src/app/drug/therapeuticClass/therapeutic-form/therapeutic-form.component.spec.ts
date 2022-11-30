import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapeuticFormComponent } from './therapeutic-form.component';

describe('TherapeuticFormComponent', () => {
  let component: TherapeuticFormComponent;
  let fixture: ComponentFixture<TherapeuticFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TherapeuticFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapeuticFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntecedentFormComponent } from './antecedent-form.component';

describe('AntecedentFormComponent', () => {
  let component: AntecedentFormComponent;
  let fixture: ComponentFixture<AntecedentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntecedentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AntecedentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

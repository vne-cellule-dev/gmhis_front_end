import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntecedentListComponent } from './antecedent-list.component';

describe('AntecedentListComponent', () => {
  let component: AntecedentListComponent;
  let fixture: ComponentFixture<AntecedentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntecedentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AntecedentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

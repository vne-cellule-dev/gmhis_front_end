import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActFamilyListComponent } from './act-family-list.component';

describe('ActFamilyListComponent', () => {
  let component: ActFamilyListComponent;
  let fixture: ComponentFixture<ActFamilyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActFamilyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActFamilyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

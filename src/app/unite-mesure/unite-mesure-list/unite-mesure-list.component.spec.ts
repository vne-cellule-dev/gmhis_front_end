import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniteMesureListComponent } from './unite-mesure-list.component';

describe('UniteMesureListComponent', () => {
  let component: UniteMesureListComponent;
  let fixture: ComponentFixture<UniteMesureListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniteMesureListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniteMesureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisBulletinComponent } from './analysis-bulletin.component';

describe('AnalysisBulletinComponent', () => {
  let component: AnalysisBulletinComponent;
  let fixture: ComponentFixture<AnalysisBulletinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalysisBulletinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisBulletinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

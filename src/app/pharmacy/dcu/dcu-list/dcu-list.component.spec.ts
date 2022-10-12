import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcuListComponent } from './dcu-list.component';

describe('DcuListComponent', () => {
  let component: DcuListComponent;
  let fixture: ComponentFixture<DcuListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcuListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DcuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

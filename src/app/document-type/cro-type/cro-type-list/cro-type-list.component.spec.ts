import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CroTypeListComponent } from './cro-type-list.component';

describe('CroTypeListComponent', () => {
  let component: CroTypeListComponent;
  let fixture: ComponentFixture<CroTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CroTypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CroTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

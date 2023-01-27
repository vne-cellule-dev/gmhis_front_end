import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CractivityListComponent } from './cractivity-list.component';

describe('CractivityListComponent', () => {
  let component: CractivityListComponent;
  let fixture: ComponentFixture<CractivityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CractivityListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CractivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

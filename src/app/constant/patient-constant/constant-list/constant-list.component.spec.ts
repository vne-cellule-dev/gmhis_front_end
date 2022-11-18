import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstantListComponent } from './constant-list.component';

describe('ConstantListComponent', () => {
  let component: ConstantListComponent;
  let fixture: ComponentFixture<ConstantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstantListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

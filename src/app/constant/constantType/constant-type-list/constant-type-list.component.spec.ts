import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstantTypeListComponent } from './constant-type-list.component';

describe('ConstantTypeListComponent', () => {
  let component: ConstantTypeListComponent;
  let fixture: ComponentFixture<ConstantTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstantTypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstantTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

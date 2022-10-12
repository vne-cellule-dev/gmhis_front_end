import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActCodeListComponent } from './act-code-list.component';

describe('ActCodeListComponent', () => {
  let component: ActCodeListComponent;
  let fixture: ComponentFixture<ActCodeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActCodeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActCodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

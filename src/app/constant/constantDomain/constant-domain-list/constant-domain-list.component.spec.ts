import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstantDomainListComponent } from './constant-domain-list.component';

describe('ConstantDomainListComponent', () => {
  let component: ConstantDomainListComponent;
  let fixture: ComponentFixture<ConstantDomainListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstantDomainListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstantDomainListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

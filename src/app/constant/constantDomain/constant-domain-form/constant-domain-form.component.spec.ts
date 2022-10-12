import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstantDomainFormComponent } from './constant-domain-form.component';

describe('ConstantDomainFormComponent', () => {
  let component: ConstantDomainFormComponent;
  let fixture: ComponentFixture<ConstantDomainFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstantDomainFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstantDomainFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

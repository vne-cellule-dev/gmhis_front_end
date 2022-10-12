import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailTypeFormComponent } from './mail-type-form.component';

describe('MailTypeFormComponent', () => {
  let component: MailTypeFormComponent;
  let fixture: ComponentFixture<MailTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailTypeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

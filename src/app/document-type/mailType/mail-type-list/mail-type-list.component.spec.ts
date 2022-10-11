import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailTypeListComponent } from './mail-type-list.component';

describe('MailTypeListComponent', () => {
  let component: MailTypeListComponent;
  let fixture: ComponentFixture<MailTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailTypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

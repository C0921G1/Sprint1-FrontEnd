import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberAccountRegistrationComponent } from './member-account-registration.component';

describe('MemberAccountRegistrationComponent', () => {
  let component: MemberAccountRegistrationComponent;
  let fixture: ComponentFixture<MemberAccountRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberAccountRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberAccountRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

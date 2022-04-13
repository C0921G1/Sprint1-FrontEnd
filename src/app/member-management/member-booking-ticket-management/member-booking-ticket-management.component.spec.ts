import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberBookingTicketManagementComponent } from './member-booking-ticket-management.component';

describe('MemberBookingTicketManagementComponent', () => {
  let component: MemberBookingTicketManagementComponent;
  let fixture: ComponentFixture<MemberBookingTicketManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberBookingTicketManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberBookingTicketManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

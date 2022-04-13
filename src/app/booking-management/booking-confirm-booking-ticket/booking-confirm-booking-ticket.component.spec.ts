import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingConfirmBookingTicketComponent } from './booking-confirm-booking-ticket.component';

describe('BookingConfirmBookingTicketComponent', () => {
  let component: BookingConfirmBookingTicketComponent;
  let fixture: ComponentFixture<BookingConfirmBookingTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingConfirmBookingTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingConfirmBookingTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

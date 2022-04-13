import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingBookingTicketListComponent } from './booking-booking-ticket-list.component';

describe('BookingBookingTicketListComponent', () => {
  let component: BookingBookingTicketListComponent;
  let fixture: ComponentFixture<BookingBookingTicketListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingBookingTicketListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingBookingTicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

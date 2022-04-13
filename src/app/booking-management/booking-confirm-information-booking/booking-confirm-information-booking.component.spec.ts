import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingConfirmInformationBookingComponent } from './booking-confirm-information-booking.component';

describe('BookingConfirmInformationBookingComponent', () => {
  let component: BookingConfirmInformationBookingComponent;
  let fixture: ComponentFixture<BookingConfirmInformationBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingConfirmInformationBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingConfirmInformationBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

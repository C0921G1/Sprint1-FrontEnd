import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingTicketSelectionComponent } from './booking-ticket-selection.component';

describe('BookingTicketSelectionComponent', () => {
  let component: BookingTicketSelectionComponent;
  let fixture: ComponentFixture<BookingTicketSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingTicketSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingTicketSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

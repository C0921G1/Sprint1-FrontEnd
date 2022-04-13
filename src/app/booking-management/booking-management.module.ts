import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookingConfirmBookingTicketComponent} from './booking-confirm-booking-ticket/booking-confirm-booking-ticket.component';
import {BookingInformationBookingTicketComponent} from './booking-information-booking-ticket/booking-information-booking-ticket.component';
import {BookingSeatSelectionComponent} from './booking-seat-selection/booking-seat-selection.component';
import {BookingBookingTicketListComponent} from './booking-booking-ticket-list/booking-booking-ticket-list.component';
import {BookingConfirmInformationBookingComponent} from './booking-confirm-information-booking/booking-confirm-information-booking.component';
import {BookingManagementRoutingModule} from './booking-management-routing.module';
import {BookingTicketSelectionComponent} from './booking-ticket-selection/booking-ticket-selection.component';
import {NgxPayPalModule} from 'ngx-paypal';
import {FormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [BookingConfirmBookingTicketComponent, BookingInformationBookingTicketComponent, BookingSeatSelectionComponent, BookingBookingTicketListComponent, BookingConfirmInformationBookingComponent, BookingTicketSelectionComponent],

    imports: [
        CommonModule,
        BookingManagementRoutingModule,
        NgxPayPalModule,
        BookingManagementRoutingModule,
        FormsModule,
        MatProgressSpinnerModule
    ]
})

export class BookingManagementModule {
}

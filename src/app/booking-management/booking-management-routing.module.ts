import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BookingBookingTicketListComponent} from "./booking-booking-ticket-list/booking-booking-ticket-list.component";
import {BookingConfirmBookingTicketComponent} from "./booking-confirm-booking-ticket/booking-confirm-booking-ticket.component";
import {BookingConfirmInformationBookingComponent} from "./booking-confirm-information-booking/booking-confirm-information-booking.component";
import {BookingSeatSelectionComponent} from "./booking-seat-selection/booking-seat-selection.component";
import {BookingInformationBookingTicketComponent} from "./booking-information-booking-ticket/booking-information-booking-ticket.component";
import {BookingTicketSelectionComponent} from "./booking-ticket-selection/booking-ticket-selection.component";
import {RoleAdminGuard} from "../login/role-admin.guard";
import {RoleUserGuard} from '../login/role-user.guard';


const routes: Routes = [
  {
    path: 'list', component: BookingBookingTicketListComponent,canActivate: [RoleUserGuard]
  },


  {

    path: 'confirm-booking/:id', component: BookingConfirmBookingTicketComponent, canActivate: [RoleAdminGuard]
  },
  {
    path: 'confirm-info-booking', component: BookingConfirmInformationBookingComponent
  },
  {
    path: 'info-booking', component: BookingInformationBookingTicketComponent,canActivate: [RoleUserGuard]
  },
  {
    path: 'booking-ticket/:id', component: BookingTicketSelectionComponent
  },
  {
    path: 'seat-select', component: BookingSeatSelectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingManagementRoutingModule {
}

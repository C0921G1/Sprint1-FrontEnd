import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmSelectionComponent } from './film-selection/film-selection.component';
import { SeatSelectionComponent } from './seat-selection/seat-selection.component';
import {BuyTicketRoutingModule} from './buy-ticket-routing.module';



@NgModule({
  declarations: [FilmSelectionComponent, SeatSelectionComponent],
  exports: [
    FilmSelectionComponent
  ],
  imports: [
    CommonModule,
    BuyTicketRoutingModule
  ]
})
export class BuyTicketModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FilmSelectionComponent} from './film-selection/film-selection.component';
import {SeatSelectionComponent} from './seat-selection/seat-selection.component';
import {RoleUserGuard} from "../login/role-user.guard";

const routes: Routes = [
  {
    path: '', component: FilmSelectionComponent
  },
  {
    path: 'seat-selection/:id', component: SeatSelectionComponent, canActivate: [RoleUserGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BuyTicketRoutingModule { }

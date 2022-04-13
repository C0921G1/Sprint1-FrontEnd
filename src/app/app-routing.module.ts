import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './layout/home/home.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'home/:status',
    component: HomeComponent
  },
  {
    path: 'statistical',
    loadChildren: () => import('./statistical/statistical.module').then(module => module.StatisticalModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(module => module.LoginModule)
  },
  {
    path: 'member',
    loadChildren: () => import('./member-management/member-management.module').then(module => module.MemberManagementModule)
  },
  {
    path: 'film',
    loadChildren: () => import('./film-management/film-management.module').then(module => module.FilmManagementModule)
  },
  {
    path: 'booking',
    loadChildren: () => import('./booking-management/booking-management.module').then(module => module.BookingManagementModule)
  },
  {
    path: 'buy-ticket',
    loadChildren: () => import('./buy-ticket/buy-ticket.module').then(module => module.BuyTicketModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

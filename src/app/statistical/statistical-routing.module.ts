import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StatisticalCommonManagementComponent} from "./statistical-common-management/statistical-common-management.component";
import {StatisticalFilmComponent} from "./statistical-film/statistical-film.component";
import {StatisticalMemberComponent} from "./statistical-member/statistical-member.component";
import {SeatSelectionComponent} from "../buy-ticket/seat-selection/seat-selection.component";
import {RoleUserGuard} from "../login/role-user.guard";
import {RoleAdminGuard} from "../login/role-admin.guard";



const routes: Routes = [
  {
    path: 'common', component: StatisticalCommonManagementComponent, canActivate: [RoleAdminGuard]
  },
  {
    path: 'film', component: StatisticalFilmComponent, canActivate: [RoleAdminGuard]
  },
  {
    path: 'member', component: StatisticalMemberComponent, canActivate: [RoleAdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticalRoutingModule {
}

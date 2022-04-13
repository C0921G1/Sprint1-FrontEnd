import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FilmClientFilmDetailComponent} from './film-client-film-detail/film-client-film-detail.component';
import {FilmManagementCreateComponent} from './film-management-create/film-management-create.component';
import {FilmManagementDeleteComponent} from './film-management-delete/film-management-delete.component';
import {FilmManagementEditComponent} from './film-management-edit/film-management-edit.component';
import {FilmManagementListComponent} from './film-management-list/film-management-list.component';
import {RoleAdminGuard} from '../login/role-admin.guard';



const routes: Routes = [
  {
    path: 'detail-client/:id', component: FilmClientFilmDetailComponent,
  },

  {
    path: 'create', component: FilmManagementCreateComponent, canActivate: [RoleAdminGuard]
  },
  {
    path: 'delete/:id', component: FilmManagementDeleteComponent, canActivate: [RoleAdminGuard]
  },
  {
    path: 'edit/:id', component: FilmManagementEditComponent, canActivate: [RoleAdminGuard]
  },
  {
    path: 'list-manager', component: FilmManagementListComponent, canActivate: [RoleAdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmManagementRoutingModule {
}

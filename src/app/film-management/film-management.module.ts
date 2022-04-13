import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilmManagementCreateComponent} from './film-management-create/film-management-create.component';
import {FilmManagementEditComponent} from './film-management-edit/film-management-edit.component';
import {FilmManagementListComponent} from './film-management-list/film-management-list.component';
import {FilmClientFilmDetailComponent} from './film-client-film-detail/film-client-film-detail.component';
import {FilmManagementDeleteComponent} from './film-management-delete/film-management-delete.component';
import {FilmManagementRoutingModule} from './film-management-routing.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    FilmManagementCreateComponent,
    FilmManagementEditComponent,
    FilmManagementListComponent,
    FilmClientFilmDetailComponent,
    FilmManagementDeleteComponent],
  imports: [
    CommonModule,
    FilmManagementRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    // SafePipeModule

  ]
})
export class FilmManagementModule {
}

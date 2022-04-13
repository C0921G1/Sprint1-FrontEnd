import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {HomeComponent} from './layout/home/home.component';
import {LoadCssService} from './loadCss/load-css-service.service';
import {HttpClientModule} from '@angular/common/http';
import {NgxPayPalModule} from 'ngx-paypal';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MemberManagementModule} from './member-management/member-management.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireDatabase} from '@angular/fire/database';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {MatProgressSpinnerModule, MatSpinner} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPayPalModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MemberManagementModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatProgressSpinnerModule
  ],

  providers: [
    LoadCssService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

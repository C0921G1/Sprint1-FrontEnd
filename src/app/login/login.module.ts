import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import {LoginRoutingModule} from "./login-routing-module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormDirective} from "./login/form-directive";



@NgModule({
    declarations: [LoginComponent, ForgetPasswordComponent, FormDirective],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class LoginModule { }

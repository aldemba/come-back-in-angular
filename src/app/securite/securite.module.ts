import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecuriteRoutingModule } from './securite-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    SecuriteRoutingModule
  ]
})
export class SecuriteModule { }

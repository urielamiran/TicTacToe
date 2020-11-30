import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([{ path: 'login', component: LoginComponent }, {path: 'signup', component: SignupComponent}]),
  ]
})
export class AuthModule { }

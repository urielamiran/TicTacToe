import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { CanDeactivateGuard } from './guard.service';
import { SocketioService } from './socketio.service';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar'
import { FormsModule } from '@angular/forms';
import { AuthModule } from 'src/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    TicTacToeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthModule,
    FormsModule,
    AppRoutingModule,
    MatGridListModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  providers: [SocketioService, CanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

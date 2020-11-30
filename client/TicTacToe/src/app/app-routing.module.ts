import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from './guard.service';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';


const routes: Routes = [{path: 'game', component: TicTacToeComponent, canDeactivate: [CanDeactivateGuard] }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

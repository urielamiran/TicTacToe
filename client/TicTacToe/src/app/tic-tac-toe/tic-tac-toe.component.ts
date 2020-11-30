import { Component, OnInit } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { SocketioService } from '../socketio.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AuthService } from '../../../src/auth/auth.service';
import { CanComponentDeactivate } from '../guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit, CanComponentDeactivate {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  opponentName
  userName
  username$

  myVictories = 0
  opponentVictories = 0
  tie = 0

  ticTacToeSymbol: string = '' 
  continue= false
  zone = []
  winZones = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  board: any[] = [null, null, null, null, null, null, null, null, null]

  constructor(private socketService: SocketioService, private _snackBar: MatSnackBar, private authService: AuthService) { 
    this.socketService.setupSocketConnection();
    this.username$ = this.authService.getUser()
    // this.authService.getU().subscribe(user=>{
    //   if(user) {
    //     this.userName = user.firstName
    //   }
    // })

    this.socketService.getSocket().on('turn', (index)=>{     
      this.board[index] = this.ticTacToeSymbol == 'X' ? 'O' : 'X'
      this.continue = true
    })

    this.socketService.getSocket().on('startGame', (data)=>{
      if(data.start) {
        this.ticTacToeSymbol = 'X'
        this.continue = true
       
      }else{
        this.ticTacToeSymbol = 'O'
      }
      this.opponentName = data.opponentName
    })

    this.socketService.getSocket().on('endGame', (zone)=>{
      this.continue = false
      this.opponentVictories++
      this.zone = zone
    })
  }

  getOpponentSymbol() {
    this.ticTacToeSymbol == 'X' ? 'O' : 'X';
  }

  ngOnInit(): void {

  }
  
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean{
    this.socketService.getSocket().emit('leaveGame')
    return true;
    
  }

  startGame() {
    this.zone = []
    this.board = [null, null, null, null, null, null, null, null, null]

    this.socketService.getSocket().emit('startGame', this.userName)

  }

  setClassStyle(str) {

    switch (str) {
      case 'X':
        return 'fas fa-times fa-lg'
       
      case 'O':
        return 'far fa-circle fa-lg'
        
      default:
        return ''
    }
  }

  setCell(index: number) {
    if( this.board[index] == null && this.continue) {
      this.board[index]= this.ticTacToeSymbol;

      this.socketService.getSocket().emit('turn', index)

      if(this.board.filter(item => item != null).length >= 5 ) {
        this.checkWinner()
      }

      this.continue= false
    }
 
  }

  checkWinner() {
    for (let index = 0; index < 8; index++) {
      if(this.board[this.winZones[index][0]] == this.ticTacToeSymbol && this.board[this.winZones[index][1]] == this.ticTacToeSymbol 
        && this.board[this.winZones[index][2]] == this.ticTacToeSymbol) {
          this.zone = this.winZones[index]
          this.myVictories++
          this.openSnackBar('You win!!!')
          this.continue = false
          this.socketService.getSocket().emit('endGame', this.winZones[index])
          return
        }

    }

    if(this.board.filter(item => item != null).length == 9) {
      this.tie++
      this.openSnackBar('Tie')
    } 
  }

  setTdStyle(index: number) {
    if(this.zone.includes(index)) {
      return 'btn btn-secondary'
    }
    return 'btn btn-dark'
  }

  private openSnackBar(message: string) {
    this._snackBar.open(message, 'Play again', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}

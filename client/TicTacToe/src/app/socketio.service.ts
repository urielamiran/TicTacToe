import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  private socket;
  constructor() {   }
  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT,  { transport : ['websocket'] })
  }

  getSocket(){
    return this.socket
  }
}

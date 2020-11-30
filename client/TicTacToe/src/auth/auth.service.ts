import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService  {


  
    constructor(private httpClient: HttpClient){
 
    }

    register(user: User){
        return this.httpClient.post('http://localhost:8080/users/register', user, {withCredentials: true})
    }

    getUser() {
        return this.httpClient.get('http://localhost:8080/users/user', {withCredentials: true})
    }

    login(body){
        return this.httpClient.post('http://localhost:8080/users/login', body ,{withCredentials: true})
    }

    logout(){
        return this.httpClient.get('http://localhost:8080/users/logout',{withCredentials: true})
    }
}
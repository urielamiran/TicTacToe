import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'game';
  loggedIn = true
  user;
  user$

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(){
  
    this.setUser()

    this.user$.subscribe((user: any) =>{
     
      if(user){
        console.log(user)
        this.user = user.firstName
        this.loggedIn = true
        this.router.navigate(['/'])
        console.log("here")

      }else{
        this.loggedIn = false
      }
    })
  }

  setUser() {
    this.user$ = this.authService.getUser()

    // this.authService.getUser().subscribe((user: any) =>{
     
    //   if(user){
    //     console.log(user)
    //     this.user = user.firstName
    //     this.loggedIn = true
    //     this.router.navigate(['/'])
    //     console.log("here")

    //   }else{
    //     this.loggedIn = false
    //   }
    // })
  }

  logout(){
    this.loggedIn = false
    this.authService.logout()
    this.router.navigate(['/login']);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'todo-list';
  isLogOut:boolean = false

  constructor(
    private router: Router
  ){

  }

  logout(){
    localStorage.removeItem('auth-user');
    this.router.navigate(['/sign-in']);
    // location.reload();
    if(localStorage.getItem('auth-user')){
     const log = this.isLogOut = true;
    }
    
  }
}

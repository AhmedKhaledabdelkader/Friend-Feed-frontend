import { Component } from '@angular/core';

import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {



  logOut(){

    this.user.signOut()
  }
  
  
  
    isLogin:boolean=false
  
    constructor(private user:UserService) { }

   
  
    ngOnInit(): void {
  
  
     // this.display()
  this.user.userData.subscribe({
  
  next:()=>{
  
  if(this.user.userData.getValue()!=null){
  
  this.isLogin=true
  
  }
  else{
    this.isLogin=false
  }
  
  
  
  }
  
  
  }) 
  
  
  
  }








}

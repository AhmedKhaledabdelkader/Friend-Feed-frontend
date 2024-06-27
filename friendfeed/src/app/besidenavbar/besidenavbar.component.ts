import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'app-besidenavbar',
  templateUrl: './besidenavbar.component.html',
  styleUrls: ['./besidenavbar.component.css']
})
export class BesidenavbarComponent {

constructor(private user:UserService,private router:Router){}


isLogin:boolean=false

username:string="" ;
userImage:string="";

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


this.user.userData.subscribe((user: { name: string; userImage: string; }) => {
  if (user) {
    this.username = user.name; // Assuming 'name' is the property name for username in your userData
    this.userImage = user.userImage; // Assuming 'userImage' is the property name for userImage in your userData
  } 
});



}








goToMyPosts(){


  this.router.navigate(["/myposts"])


}




}

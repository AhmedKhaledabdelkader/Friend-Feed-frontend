import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'app-myfriends',
  templateUrl: './myfriends.component.html',
  styleUrls: ['./myfriends.component.css']
})
export class MyfriendsComponent {

  errMsg="" ;

  searchFriendName:string="";

  isLogin:boolean=false

constructor(private user:UserService,private router:Router){}


ngOnInit(): void {


  this.user.userData.subscribe({

    next:()=>{
    
    if(this.user.userData.getValue()!=null){
    
    this.isLogin=true
    this.getMyFriends() ;
 
    
    }
    else{
     this.isLogin=false
     this.friends=[] ;
    }
    
    
    
    }
    
    
    }) 



 /*........display.......*/ 

 

  
}



friends:any[]=[];





getMyFriends(){

  

this.user.getMyFriends().subscribe({


  next:(response)=>{

    console.log("success");


    this.friends=response.user.friends ;
    



  },

  error:(error)=>{


    console.log(error.error.message);
    this.errMsg=error.error.message
    


  }






})

  }


}







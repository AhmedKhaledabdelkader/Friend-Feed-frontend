import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  errorMessage:string=""

constructor(private router:Router,private user:UserService){}


formData= new FormGroup({


email:new FormControl(null,[Validators.required,Validators.email]),

password:new FormControl(null,[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)])



})



  goToSignUp(){

this.router.navigate(["/register"])

  }


  makeSignin(formData:FormGroup){

    if(formData.valid){



      this.user.makeSignin(formData.value).subscribe({

        next:(response)=>{


          console.log("sign in sucess");

          localStorage.setItem("token",response.token)

          this.user.decodeToken()

          this.router.navigate(["/home"])
          




        },

        error:(error)=>{


          console.log(error.error.message);

          this.errorMessage=error.error.message




          


        }



      })



    }



  }


}

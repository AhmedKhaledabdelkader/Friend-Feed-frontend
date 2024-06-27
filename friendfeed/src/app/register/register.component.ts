import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  
  errorMessage:String="" ;

  constructor(private user: UserService,private router:Router) { }


  ngOnInit(): void {

    

  }


  formData: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]),
    userImage: new FormControl(null, Validators.required)
  });




  


  makeSignup(imageFile: HTMLInputElement) {
   

    // Check if files property exists and is not empty
    if (imageFile && imageFile.files && imageFile.files.length > 0) {
        const file = imageFile.files[0]; // Access the files property from the file input

        if (this.formData.valid && file) {
            const formData = new FormData();
            formData.append('username', this.formData.get("username")?.value);
            formData.append('email', this.formData.get('email')?.value);
            formData.append('password', this.formData.get('password')?.value);
            formData.append('userImage', file);

            this.user.makeSignup(formData).subscribe({
                next: (response) => {
                    console.log("Success:", response);
                    localStorage.setItem("email",this.formData.get('email')?.value)
                    this.router.navigate(["/verify"])
                    
                },
                error: (error) => {
                    console.error("Error:", error.error.message);

                    this.errorMessage=error.error.message
                }
            });
        }
    }
}

 
}






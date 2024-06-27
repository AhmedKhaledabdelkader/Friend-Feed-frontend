import {
  Component,
  ElementRef,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent {

  verificationCode: string = '';

  verificationCodeError: string = '';


  constructor(private el: ElementRef, private user: UserService,private router:Router) { }

  @HostListener('keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): boolean {
    const key = event.which || event.keyCode;
  
    if (key !== 9 && (key < 48 || key > 57)) {
      event.preventDefault();
      return false;
    }
  
    if (key === 9) {
      return true;
    }
  
    const target = event.target as HTMLInputElement;
    let nextInput = target.nextElementSibling as HTMLInputElement;
  
    if (!nextInput || !nextInput.tagName || nextInput.tagName.toLowerCase() !== 'input') {
      nextInput = document.querySelector('input') as HTMLInputElement;
    }
    nextInput.select();
    nextInput.focus();
  
    // Return true by default if no other condition matches
    return true;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const key = event.which || event.keyCode;

    if (key === 9 || (key >= 48 && key <= 57)) {
      return true;
    }

    event.preventDefault();
    return false;
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLInputElement;
    target.focus();
  }

  onInputChange(event: any, index: number) {
    const input = event.target as HTMLInputElement;
    this.verificationCode = this.verificationCode.substr(0, index) + input.value + this.verificationCode.substr(index + 1);
    console.log('Verification Code:', this.verificationCode);
  }

  verifyEmail() {
    /*const formData = new FormData();
    formData.append('code', this.verificationCode);

    const email = localStorage.getItem('email');
    console.log('Email:', email);
    formData.append('email', email as string);

    console.log('FormData:', formData);*/

    const data: { code: string, email: string } = {
      code: this.verificationCode,
      email: localStorage.getItem('email') as string
    };
    this.user.verifyEmail(data).subscribe({
      next: (response) => {
        console.log('Verification success:', response);
        this.router.navigate(["/signin"])
      },
      error: (error) => {
        console.error('Verification error:', error.error.message);

        this.verificationCodeError=error.error.message
      }
    });
  }
}

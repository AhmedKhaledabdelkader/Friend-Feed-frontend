import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { jwtDecode } from 'jwt-decode';
import {
  BehaviorSubject,
  Observable,
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class UserService {

  constructor(private http: HttpClient,private router:Router) {

    if(localStorage.getItem("token")){

      this.decodeToken()
      
      
      }



   }


   userData:any=new BehaviorSubject(null)


  makeSignup(formData:object):Observable<any>{


    return this.http.post(`http://localhost:3000/api/user/register`,formData)


  }


  verifyEmail(formData:object):Observable<any>{


    return this.http.post(`http://localhost:3000/api/user/verify`,formData)


  }

  makeSignin(formData:object):Observable<any>{


    return this.http.post(`http://localhost:3000/api/user/login`,formData)


  }


  decodeToken(){

    let encodedToken:any=JSON.stringify(localStorage.getItem("token"))
   
    let decodedToken:any=jwtDecode(encodedToken)
    this.userData.next(decodedToken)
    console.log(this.userData._value);
    
   
   }

   signOut(){

    localStorage.removeItem("token")
    
    this.userData.next(null)
    
    this.router.navigate(['/signin'])

    console.log(this.userData);
    

    }
    
    getUser(id:any): Observable<any> {
  
      const token = localStorage.getItem('token');
      
     
      const headers = new HttpHeaders({
        'authorization': `${token}`
      });
  
      return this.http.get(`http://localhost:3000/api/user/${id}`, { headers });
    }





    getMyFriends(): Observable<any> {
  
      const token = localStorage.getItem('token');
      
     
      const headers = new HttpHeaders({
        'authorization': `${token}`
      });
    
      return this.http.get(`http://localhost:3000/api/user/myfriends`, { headers });
    }
    
    
    
    }








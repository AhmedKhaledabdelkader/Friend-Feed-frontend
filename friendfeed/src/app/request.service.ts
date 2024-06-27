import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http:HttpClient) { }


  getRequestedFriends():Observable<any>{


    const token = localStorage.getItem('token');
    
   
    const headers = new HttpHeaders({
      'authorization': `${token}`
    });

    return this.http.get(`http://localhost:3000/api/request/confirm`, { headers });



    
  }


  checkRequest(formData:object):Observable<any>{


    const token = localStorage.getItem('token');
    
   
    const headers = new HttpHeaders({
      'authorization': `${token}`
    });

    return this.http.put(`http://localhost:3000/api/request/check`,formData, { headers });




  }

  getaddingFriends():Observable<any>{


    const token = localStorage.getItem('token');
    
   
    const headers = new HttpHeaders({
      'authorization': `${token}`
    });

    return this.http.get(`http://localhost:3000/api/request/addfriends`, { headers });




  }


  addFriend(formData:object):Observable<any>{


    const token = localStorage.getItem('token');
    
   
    const headers = new HttpHeaders({
      'authorization': `${token}`
    });

    return this.http.post(`http://localhost:3000/api/request/make`,formData, { headers });




  }

  



}

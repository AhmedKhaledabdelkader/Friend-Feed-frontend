import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }





  getPosts(): Observable<any> {
  
    const token = localStorage.getItem('token');
    
   
    const headers = new HttpHeaders({
      'authorization': `${token}`
    });

    return this.http.get(`http://localhost:3000/api/post/`, { headers });
  }



  likePosts(formData:object): Observable<any> {
  
    const token = localStorage.getItem('token');
    
   
    const headers = new HttpHeaders({
      'authorization': `${token}`
    });

    return this.http.put(`http://localhost:3000/api/post/update/like`,formData, { headers });
  }

  addComment(formData:object): Observable<any> {
  
    const token = localStorage.getItem('token');
    
   
    const headers = new HttpHeaders({
      'authorization': `${token}`
    });

    return this.http.put(`http://localhost:3000/api/post/comment/add`,formData, { headers });
  }


  getUserPosts(id:any): Observable<any> {
  
    const token = localStorage.getItem('token');
    
   
    const headers = new HttpHeaders({
      'authorization': `${token}`
    });

    return this.http.get(`http://localhost:3000/api/post/user/${id}`, { headers });
  }


  addPost(formData:object): Observable<any> {
  
    const token = localStorage.getItem('token');
    
   
    const headers = new HttpHeaders({
      'authorization': `${token}`
    });

    return this.http.post(`http://localhost:3000/api/post/add`,formData, { headers });
  }



  deletePost(postId: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'authorization': `${token}`
    });

    return this.http.delete(`http://localhost:3000/api/post/delete/${postId}`, { headers });
  }


  getFriendsPosts(): Observable<any> {
  
    const token = localStorage.getItem('token');
    
   
    const headers = new HttpHeaders({
      'authorization': `${token}`
    });

    return this.http.get(`http://localhost:3000/api/post/show`, { headers });
  }





}
 







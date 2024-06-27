import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { PostService } from '../post.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  commentInput:string = "";
  posts: any[] = [];

  constructor(private post: PostService, private user: UserService,private router:Router, private eRef: ElementRef) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.post.getPosts().subscribe({
      next: (response) => {
        this.posts = response.result;
        this.posts.forEach(post => {
          post.isLike = this.getLikeStatus(post._id);
        });
      },
      error: (error) => {
        console.log(error.error.message);
      }
    });
  }

  toggleComments(post: any): void {
    post.showComments = !post.showComments;
  }

  likePosts(postId: any): void {
    const data = {
      postId: postId,
      userId: this.user.userData._value.id
    };

    this.post.likePosts(data).subscribe({
      next: (response) => {
        console.log("manage like success");

        const post = this.posts.find(p => p._id === postId);
        if (post) {
          post.isLike = !post.isLike;
          this.saveLikeStatus(postId, post.isLike);
        }
        this.getPosts();
      },
      error: (error) => {
        console.log(error.error.message);
      }
    });
  }

  private saveLikeStatus(postId: any, isLike: boolean): void {
    let likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}');
    likedPosts[postId] = isLike;
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  }

  private getLikeStatus(postId: any): boolean {
    let likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}');
    return likedPosts[postId] || false;
  }

  addComment(postId: any): void {
    const data = {
      comment: this.commentInput,
      commentBy: this.user.userData._value.id,
      postId: postId
    };

    this.post.addComment(data).subscribe({
      next: (response) => {
        console.log("add comment success");
        this.getPosts();
      },
      error: (error) => {
        console.log(error.error.message);
      }
    });
  }

  closeComments(post: any): void {
    post.showComments = false;
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    this.posts.forEach(post => {
      if (!this.eRef.nativeElement.contains(event.target)) {
        post.showComments = false;
      }
    });
  }


  goToUserPosts(id: any) {
    this.router.navigate(["/userposts", id]);
  }




}
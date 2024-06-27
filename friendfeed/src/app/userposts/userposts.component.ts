import {
  Component,
  ElementRef,
  HostListener,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import { PostService } from '../post.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userposts',
  templateUrl: './userposts.component.html',
  styleUrls: ['./userposts.component.css']
})
export class UserpostsComponent {

  errorCheck:boolean=false ;
  errMsg:string="" ;

  constructor(private router:Router,private post:PostService,private route: ActivatedRoute,private user:UserService,private eRef: ElementRef){}

  userId: any=this.route.snapshot.paramMap.get('id');
  profileImage:string="";
  profileName:string="";
  ngOnInit(): void {
   
    this.getPosts()


    this.user.getUser(this.userId).subscribe({


      next:(response)=>{


        this.profileImage=response.result.userImage ;

        this.profileName=response.result.username ;




      }



    })



  }

  

 

  commentInput:string = "";
  posts: any[] = [];


getPosts(): void {
  this.post.getUserPosts(this.userId).subscribe({
    next: (response) => {
      this.posts = response.result;
      this.posts.forEach(post => {
        post.isLike = this.getLikeStatus(post._id);
      });
    },
    error: (error) => {
      console.log(error.error.message);
       this.errorCheck=true
       this.errMsg=error.error.message

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








}

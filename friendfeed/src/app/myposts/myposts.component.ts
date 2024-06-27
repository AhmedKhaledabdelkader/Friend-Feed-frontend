import {
  Component,
  ElementRef,
  HostListener,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { PostService } from '../post.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.css']
})
export class MypostsComponent {


  constructor(private user:UserService,private post:PostService,private eRef: ElementRef){





  }

  ngOnInit(): void {
    this.getPosts();
  }



  formData:FormGroup=new FormGroup({


    postDesc:new FormControl(null),

    postImage:new FormControl(null,Validators.required),

    postBy:new FormControl(this.user.userData._value.id)



    



  })


  formVisible: boolean = false; // Control the form visibility

  profileImage:string=this.user.userData._value.userImage

  profileName:string=this.user.userData._value.name


  showPostForm:boolean=false

  sucessMsg:string=""
  errorMsg:string=""
  commentInput:string = "";
  posts: any[] = [];

  closeForm() {
    this.formVisible = false; // Set form visibility to false to hide it
    this.showPostForm=false
  }

  showPost(){

   this.formVisible=true
    
  }



  addPost(imageFile: HTMLInputElement) {
   

    // Check if files property exists and is not empty
    if (imageFile && imageFile.files && imageFile.files.length > 0) {
        const file = imageFile.files[0]; // Access the files property from the file input

        if (this.formData.valid && file) {
            const formData = new FormData();
            formData.append('postDesc', this.formData.get("postDesc")?.value);
            formData.append('postImage', file);
            formData.append("postBy",this.user.userData._value.id)

            this.post.addPost(formData).subscribe({
                next: (response) => {
                    console.log("Success:", response);



                    this.sucessMsg=response.message

                    this.getPosts()

                    
                    
                },
                error: (error) => {
                    console.error("Error:", error.error.message);
                    this.errorMsg=error.error.message

                  
                }
            });
        }
    }
}



/*.....................*/


getPosts(): void {
  this.post.getUserPosts(this.user.userData._value.id).subscribe({
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



deletePost(postId:any){

this.post.deletePost(postId).subscribe({

  next:(response)=>{

    console.log("sucess",response.message);

    this.getPosts()
    

  }
  ,

  error:(error)=>{


    console.log("fail",error.error.message);
    


  }




})




}







}




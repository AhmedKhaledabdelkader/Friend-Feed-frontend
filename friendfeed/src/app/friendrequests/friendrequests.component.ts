import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { RequestService } from '../request.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-friendrequests',
  templateUrl: './friendrequests.component.html',
  styleUrls: ['./friendrequests.component.css']
})
export class FriendrequestsComponent implements OnInit {

  errMsg:string="" ;
  requests: any[] = [];
  checkButtons: { [key: string]: boolean } = {};
  checkAccept: { [key: string]: boolean } = {};
  checkReject: { [key: string]: boolean } = {};
  

  constructor(private user: UserService, private request: RequestService,private router:Router) {}

  ngOnInit(): void {
    this.getRequests();
  }

  getRequests() {
    this.request.getRequestedFriends().subscribe({
      next: (response) => {
        this.requests = response.result;
        this.requests.forEach(request => {
          this.checkButtons[request._id] = true;
          this.checkAccept[request._id] = false;
          this.checkReject[request._id] = false;
        });
      },
      error: (error) => {
        console.log(error.error.message);
        this.errMsg=error.error.message
      }
    });
  }

  checkRequest(id: any, reply: string) {
    const data = { requestId: id, replyRequest: reply };

    this.request.checkRequest(data).subscribe({
      next: (response) => {
        console.log(response.message);
        this.updateRequestStatus(id, reply);
      },
      error: (error) => {
        console.log(error.error.message);
     
      }
    });
  }

  updateRequestStatus(id: any, reply: string) {
    this.checkButtons[id] = false;
    if (reply === 'accept') {
      this.checkAccept[id] = true;
      this.checkReject[id] = false;
    } else {
      this.checkAccept[id] = false;
      this.checkReject[id] = true;
    }
  }

  goToUserPosts(id: any) {
    this.router.navigate(["/userposts", id]);
  }



}
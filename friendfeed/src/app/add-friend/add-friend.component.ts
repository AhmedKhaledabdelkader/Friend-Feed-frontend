import {
  Component,
  OnInit,
} from '@angular/core';

import { RequestService } from '../request.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {

  addingRequests: any[] = [];
  selectedRequestId: string | null = null; // Track the selected request ID

  constructor(private request: RequestService, private user: UserService) { }

  ngOnInit(): void {
    this.getAddingFriends();
  }

  getAddingFriends(): void {
    this.request.getaddingFriends().subscribe({
      next: (response) => {
        this.addingRequests = response.result;
      },
      error: (error) => {
        console.log(error.error.message);
      }
    });
  }

  addFriend(id: string): void {
    const data: { senderUser: string, recieverUser: string } = {
      senderUser: this.user.userData._value.id,
      recieverUser: id
    };

    this.request.addFriend(data).subscribe({
      next: (response) => {
        console.log(response.message);
        this.selectedRequestId = id; // Set the selected request ID
      },
      error: (error) => {
        console.log(error.error.message);
      }
    });
  }

  isButtonVisible(requestId: string): boolean {
    return !this.selectedRequestId || this.selectedRequestId !== requestId;
  }

  isDivSelected(requestId: string): boolean {
    return this.selectedRequestId === requestId;
  }
}

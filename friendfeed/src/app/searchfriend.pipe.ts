import {
  Pipe,
  PipeTransform,
} from '@angular/core';

@Pipe({
  name: 'searchfriend'
})
export class SearchfriendPipe implements PipeTransform {

  transform(friends:any[],searchName:string): any[] {
    return friends.filter((friend)=>friend.username.includes(searchName));
  }

}

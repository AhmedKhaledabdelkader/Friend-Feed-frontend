import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { AddFriendComponent } from './add-friend/add-friend.component';
import {
  FriendrequestsComponent,
} from './friendrequests/friendrequests.component';
import { HomeComponent } from './home/home.component';
import { MypostsComponent } from './myposts/myposts.component';
import { RegisterComponent } from './register/register.component';
import {
  ShowfriendsonlyComponent,
} from './showfriendsonly/showfriendsonly.component';
import { SigninComponent } from './signin/signin.component';
import { UserGuard } from './user.guard';
import { UserpostsComponent } from './userposts/userposts.component';
import { VerifyComponent } from './verify/verify.component';

const routes: Routes = [

  {path:"",redirectTo:"home",pathMatch:'full'},
  {path:"home",canActivate:[UserGuard],component:HomeComponent},
  {path:"verify",component:VerifyComponent},
  {path:"myposts",canActivate:[UserGuard],component:MypostsComponent},
  {path:"register",component:RegisterComponent},
  {path:"signin",component:SigninComponent},
{path:"requests",canActivate:[UserGuard],component:FriendrequestsComponent},
{path:"addfriends",canActivate:[UserGuard],component:AddFriendComponent},
{path:"friendsposts",canActivate:[UserGuard],component:ShowfriendsonlyComponent},
{path:"userposts/:id",canActivate:[UserGuard],component:UserpostsComponent},


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

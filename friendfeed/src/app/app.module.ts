import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { UserService } from './user.service';
import { NavbarComponent } from './navbar/navbar.component';
import { VerifyComponent } from './verify/verify.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { BesidenavbarComponent } from './besidenavbar/besidenavbar.component';
import { MypostsComponent } from './myposts/myposts.component';
import { UserpostsComponent } from './userposts/userposts.component';
import { FriendrequestsComponent } from './friendrequests/friendrequests.component';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { MyfriendsComponent } from './myfriends/myfriends.component';
import { ShowfriendsonlyComponent } from './showfriendsonly/showfriendsonly.component';
import { SearchfriendPipe } from './searchfriend.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavbarComponent,
    VerifyComponent,
    SigninComponent,
    HomeComponent,
    BesidenavbarComponent,
    MypostsComponent,
    UserpostsComponent,
    FriendrequestsComponent,
    AddFriendComponent,
    MyfriendsComponent,
    ShowfriendsonlyComponent,
    SearchfriendPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

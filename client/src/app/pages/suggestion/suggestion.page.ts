/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ApicallsService } from 'src/app/core/services/apicalls.service';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.page.html',
  styleUrls: ['./suggestion.page.scss'],
})
export class SuggestionPage implements OnInit {

  users: any;
  public search: string;
  toggle: boolean;
  suggestion:any;
  username: string;
  id: string;
  email: string;
  constructor(private searchservice: ApicallsService) { }

  ngOnInit() {
  //   this.users.push({
  //     name : "Sam Raj",
  //     profilepic: "https://presidio-hack-172022.s3.amazonaws.com/profile_pic/eight.png",
  //     description: "This is a bot user",
  // });
  this.username =localStorage.getItem('name');
    this.id = localStorage.getItem('id');
    this.email = localStorage.getItem('email');
   this.fetchData();
  }
  fetchData(){
    this.searchservice.getSuggestionUser(this.id).subscribe(res=>{this.suggestion=res.data;console.log(res);});
   // console.log(this.users);
  }
  buttonToggle(user:any,tog:number){
    this.toggle = tog===0?false:true;
    if(user!==undefined){
      if(user.followers.includes(this.id)){
        this.toggle=false; //unfollow active
      }
      else{
        this.toggle=true; //follow active
      }
    }
    return this.toggle;
  }
  searchUser(){
    const name=this.search;
    if(name!==undefined && name!==''){
      this.searchservice.findColleague(name).subscribe(res=>{this.users=res.data;});
    }
    console.log(this.users);
    this.fetchData();
  }
  follow(user: any){
    console.log("follow clicked...");
    const follow={
      userId: this.id,
      tofollow: user._id
    };
    this.searchservice.followUser(follow).subscribe(res=>{console.log(res);});
    this.searchUser();
    this.searchUser();
    this.buttonToggle(undefined,0);
    this.fetchData();
  }

  unfollow(user: any){
    console.log("unfollow clicked..");
    const follow={
      userId: this.id,
      tofollow: user._id
    };
    console.log(follow);
    this.searchservice.unfollowUser(follow).subscribe(res=>{console.log(res);});
    this.buttonToggle(undefined,1);
    this.searchUser();
    this.searchUser();
    this.fetchData();
  }

}

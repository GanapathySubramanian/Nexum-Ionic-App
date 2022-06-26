/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable guard-for-in */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { Comments } from 'src/app/core/interfaces/comments';
import { CommentServiceService } from 'src/app/core/services/comment-service.service';
import { PostlistService } from 'src/app/core/services/postlist.service';
import { Post } from '../../core/interfaces/post';
import { AddStoryPage } from '../add-story/add-story.page'
import { SinglepostviewPage } from '../singlepostview/singlepostview.page';
import { SinglestoryPage } from '../singlestory/singlestory.page';

enum Visibility{
  private,
  public
};
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  postlist: any ;
  select: any={};
  //select: string[]=[];
  comment: Comments[]=[];
  liked: boolean;
  public likecount: number;
  plus: number;
  st: any;
  //
  slideOpts = {};
  stories: any;
  buttonValue = 'grid';
  buttonItems: any[] = [];
  storiesValue: any;
  //local storage variables
  username:string;
  id:string;
  email:string;

  constructor(private posts: PostlistService,
     private comments: CommentServiceService,
     private modalCtrl: ModalController,
     router:ActivatedRoute){
     // this.likecount ='2';
     //this.fetchData();

     }

  async showPost(post: any){
    console.log('parameter to child '+post);
    const postselected = await this.modalCtrl.create({
      component: SinglepostviewPage,
      componentProps: {postselected: post,tab: 'home'},
    });
    await postselected.present();
  }
  // ngOnChange():void{
  //   console.log("onchange");
  //   this.fetchData();
  // }
  ngOnInit(): void{
    this.username =localStorage.getItem('name');
    this.id = localStorage.getItem('id');
    this.email = localStorage.getItem('email');
    this.fetchData();

   console.log("oninit");
   this.stories = [
    { name: 'New' },
    { name: 'Android', src: 'assets/imgs/circles/android.png' },
    { name: 'Angular', src: 'assets/imgs/circles/angular.png' },
    { name: 'Ionic', src: 'assets/imgs/circles/ionic.png' },
    { name: 'Nodejs', src: 'assets/imgs/circles/nodejs.png' },
    { name: 'Laravel', src: 'assets/imgs/circles/laravel.png' },
    { name: 'IOS', src: 'assets/imgs/circles/ios.png' },
    { name: 'Php', src: 'assets/imgs/circles/php.png' },
  ];
  this.slideOpts = {
    slidesPerView: this.checkScreen(),
    slideShadows: true,
    speed:1000,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  };
  this.buttonItems = [
    {value: 'grid', icon: 'grid'},
    {value: 'reels', icon: 'film'},
    {value: 'photos', icon: 'images'},
  ];
  this.getStories(this.id).subscribe((data:any)=>{
    this.storiesValue = data.data;
    this.storiesValue.reverse();
    console.log(typeof data);
    console.log(this.storiesValue);
  })
  }
  fetchData():any{
    console.log("Calling fetch......");
    this.posts.generatePosts(this.id).subscribe((data: any)=>{this.postlist=data.data;console.log(data.data);});
    return this.postlist;
  }

  likeSelect(post: any,num: number){
    console.log('Like selected..'+post._id);
    const data={
      postid:post._id,
      userid:this.id
    };
    if(num===0){
      this.select[post._id]++;
    }
    else{
      this.select[post._id]--;
    }
    console.log("this.select .."+this.select[post._id]);
    console.log("like count..."+post.likes.length);
    this.comments.addLike(data).subscribe(res=>{console.log("like returns .."+res.toString());});
    // this.fetchData();
  }

  iconChange(el: any){
    const name = 'like+'+el._id;
    const count = '#likecount'+el._id;
    console.log(document.getElementById(name).getAttribute('name'));
    const icon=document.getElementById(name).getAttribute('name');
    let num=0;
    let index = this.postlist.indexOf(el);
    if(icon==='heart'){
      document.getElementById(name).setAttribute('name','heart-outline');
      let idIndex = this.postlist[index].likes.indexOf(el);
      this.postlist[index].likes.splice(idIndex,1);
      num=1;
    }
    else{
      document.getElementById(name).setAttribute('name','heart');
      this.postlist[index].likes.push(this.id);
      num=0;
    }
    this.likeSelect(el,num);
   // el.querySelector('ion-icon').setAttribute('name', 'heart-outline');
  }

  isImage(url: string) {
    if(url!==undefined){
      url=url.toLowerCase();
      // eslint-disable-next-line max-len
      if(url.includes('.jpg')||url.includes('.jpeg')||url.includes('.png')||url.includes('.webp')||url.includes('.avif')||url.includes('.gif')||url.includes('.svg')){
          return true;
      }else{
        return false;
      }
    }
    return false;
  }

  loadThumbnail(url: string){
    return url+'#t=2';
  }
  getLikesCount(post: any){
    if(this.select[post._id]!==undefined){
      return this.select[post._id];
    }
    this.select[post._id]=post.likes.length;
    console.log("check"+this.select+" "+post.likes.length);
    localStorage.setItem('select',this.select);
    return this.select[post._id];
  }

  getStories(id){
    return this.comments.getStories(id);
  }
  checkScreen() {
    let innerWidth = window.innerWidth;
    switch (true) {
      case 340 > innerWidth:
        return this.checkLength(5.5);
      case 340 <= innerWidth && innerWidth <= 400:
        return this.checkLength(5.5);
      case 401 <= innerWidth && innerWidth <= 700:
        return this.checkLength(6.5);
      case 701 <= innerWidth && innerWidth <= 900:
        return this.checkLength(7.5);
      case 901 <= innerWidth:
        return this.checkLength(9.5);
    }
  }

  checkLength(val) {
    let length = this.stories.length;
    return val < length ? val : length;
  }

  buttonsChanged(event) {
    console.log(event.detail.value);
    this.buttonValue = event.detail.value;
  }

  async viewStory(url:string){
    // console.log(this.storiesValue.storyUrl);
    const postselected = await this.modalCtrl.create({
      component: SinglestoryPage,
      componentProps: {postselected: url},
    });
    await postselected.present();
  }
  async addStory(){
    const addstory = await this.modalCtrl.create({
      component:AddStoryPage,
      componentProps:{userid:this.id}
    })
    await addstory.present();
}



}

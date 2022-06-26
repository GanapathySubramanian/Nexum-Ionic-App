/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit } from '@angular/core';
import { AnimationController, ModalController } from '@ionic/angular';
import { User } from 'src/app/core/interfaces/user';
import { ApicallsService } from 'src/app/core/services/apicalls.service';
import { UpdateProfilePage } from '../update-profile/update-profile.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  slideOpts = {};
  stories: any[] = [];
  buttonValue = 'grid';
  buttonItems: any[] = [];
  posts: any;//[]=[];
  user: any ={};
  images: any[]=[];

  //local storage variables
  username: string;
  id: string;
  email: string;

  constructor(private profileapi: ApicallsService,private animationCtrl: AnimationController,private modalCtrl: ModalController) {
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
      slideShadows: true
    };
    this.buttonItems = [
      {value: 'grid', icon: 'grid'},
      {value: 'reels', icon: 'film'},
      {value: 'photos', icon: 'images'},
    ];
   }


  ngOnInit() {
    this.username =localStorage.getItem('name');
    this.id = localStorage.getItem('id');
    this.email = localStorage.getItem('email');
    this.profileapi.getUserById(this.id).subscribe(data=>{this.user=data.data;console.log(data.data);});
    this.profileapi.getPost(this.id).subscribe(data=>{this.posts=data.data;console.log(data);});

    console.log('without subscribe...'+ this.user);
  }
  getPostCount(){
    if(this.posts!==undefined){
      console.log(this.posts);
      return this.posts.length;
    }
  }
  getFollowerCount(){
    if(this.user!==undefined){
      console.log(this.user);
      return this.user.followers.length;
    }
  }
  getFollowingCount(){
    if(this.user!==undefined){
      return this.user.following.length;
    }
  }
  shuffleArray(){
    return  this.posts
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  }


  checkScreen() {
    const innerWidth = window.innerWidth;
    //console.log(innerWidth);
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
  checkFormat(url: any,index: number)
  {
    if(!this.isImage(url))
    {
      return 'video-container';
    }
    return 'image-container';
  }
  checkLength(val) {
    const length = this.stories.length;
    return val < length ? val : length;
  }

  buttonsChanged(event) {
    console.log(event.detail.value);
    this.buttonValue = event.detail.value;
  }

  isImage(url: string) {
   // console.log(url);
    if(url!==undefined){
      url=url.toLowerCase();
      // eslint-disable-next-line max-len
      if(url.includes('.jpg')||url.includes('.jpeg')||url.includes('.png')||url.includes('.webp')||url.includes('.avif')||url.includes('.gif')||url.includes('.svg')){
        //console.log('image '+url);
          return true;
      }else{
        //console.log('Not image '+url);
        return false;
      }
    }
  }

  loadThumbnail(url: string){
    return url+'#t=2';
  }
  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => this.enterAnimation(baseEl).direction('reverse');

  async editProfile(){
    const addstory = await this.modalCtrl.create({
      component:UpdateProfilePage ,
      componentProps:{userid:this.id}
    });
    await addstory.present();
}
}

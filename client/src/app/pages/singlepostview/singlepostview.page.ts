/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommentServiceService } from 'src/app/core/services/comment-service.service';
import { ExplorePage } from '../explore/explore.page';
import { TabsPageRoutingModule } from '../tabs/tabs-routing.module';
import { TabsPage } from '../tabs/tabs.page';

@Component({
  selector: 'app-singlepostview',
  templateUrl: './singlepostview.page.html',
  styleUrls: ['./singlepostview.page.scss'],
})
export class SinglepostviewPage implements OnInit {

  @Input() postselected: any;
  @Input() tab: string;
  select: string[]=[];
  comment: any;
  usercomment: string;
  username: string;
  id: string;
  email: string;
  profilepic: string;
  constructor(private comments: CommentServiceService,private modalCtrl: ModalController) { }

  async back(){
    let post: any;
    if(this.tab==='home'){
      post = await this.modalCtrl.create({
        component: TabsPage,
      });
    }
    else{
      post=await this.modalCtrl.create({
        component: TabsPage,
      });
    }
    await post.present();
  }

  ngOnInit() {
    this.username =localStorage.getItem('name');
    this.id = localStorage.getItem('id');
    this.email = localStorage.getItem('email');
    this.profilepic = localStorage.getItem('profilepic');
    console.log(this.postselected);
    this.comments.getComments(this.postselected._id).subscribe((res: any)=>{this.comment=res.data;console.log(res);});
  }
  getLikeCount(){
    return this.comment.likeCount;
  }
  getCommentCount(){
    if(this.comment!==undefined){
      return this.comment.commentCount;
    }
  }

  likeselect(){
    console.log('Like selected..');
    return this.postselected.likes.length;
  }
  commentCount(){
    return this.postselected.comments.length;
  }
  addComment(){
     const cmt: any={
      // eslint-disable-next-line no-underscore-dangle
      post: this.postselected._id,
      user: this.id,
      comment: this.usercomment,
     };
     const dummyuser: any={
      id: this.id,
      name: this.username,
      profilepic: this.profilepic
     };
     const dummycmt: any={
      // eslint-disable-next-line no-underscore-dangle
      post: this.postselected._id,
      user: dummyuser,
      comment: this.usercomment
     };
     this.comment.commentCount++;
    this.comment.data.push(dummycmt);
    console.log(this.comment);
     this.comments.uploadComment(cmt).subscribe(res=>{console.log(res);});
    // this.comment = this.comments.commentCount(this.postselected.postUrl);
     this.usercomment='';
  }
  // likeselectForComment(comment: Comments){

  // }
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

}

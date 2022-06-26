import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostService } from 'src/app/core/services/post.service';
import { SinglepostviewPage } from '../singlepostview/singlepostview.page';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {

  postDetails: any[]=[];
  noOfRows = 0;

  constructor(private postservice: PostService,private modalCtrl: ModalController) { this.getExplorePosts();
  }

  getExplorePosts(){
    this.postservice.getPublicPost().subscribe((res: any)=>{
      console.log('explore..'+res);

      this.postDetails=res.data;
      this.postDetails = this.shuffleArray();
    });
    // this.postDetails=this.shuffleArray();
  }

  async showPost(post: any){
    console.log('parameter to child '+post+''+post.postUrl);
    const postselected = await this.modalCtrl.create({
      component: SinglepostviewPage,
      componentProps: {postselected: post,tab:'explore'},
    });
    await postselected.present();
  }
  isImage(url: string) {
    if(url!==undefined){
      if(url.includes('.mp4')){
        return false;
      }else{
        return true;
      }
    }
  }

  loadThumbnail(url: string){
    return url+'#t=2';
  }

  ngOnInit(): void {
    this.getExplorePosts();
  }
  // showPost(postId: string){

  //   console.log(postId);

  //   this.selected=postId;
  //   // this.postservice.viewPost(postId);
  // }

  checkFormat(url: any,index: number)
  {
    if(!this.isImage(url))
    {
      return 'video-container';
    }
    return 'image-container';
  }

  shuffleArray(){
  return  this.postDetails
  .map(value => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value);
  }

}


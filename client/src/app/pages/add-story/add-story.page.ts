/* eslint-disable no-trailing-spaces */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from 'src/app/core/services/post.service';
import { ModalController } from '@ionic/angular';
import { CommentServiceService } from 'src/app/core/services/comment-service.service';
import { TabsPage } from '../tabs/tabs.page';
import { ApicallsService } from 'src/app/core/services/apicalls.service';

@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.page.html',
  styleUrls: ['./add-story.page.scss'],
})
export class AddStoryPage implements OnInit {

  format='';
  url: any='';
  isSelected=false;
  isaccess=false;
  noImagePost=false;
  accessbility='public';
  isuncheked=true;
  comments='';
  selectedFiles: any;
  inprogress=false;
  //local storage variables
  username:string;
  id:string;
  email:string;
  constructor(private postservice: PostService,private modalCtrl: ModalController,private api:ApicallsService) { }

  ngOnInit() {
    this.username =localStorage.getItem('name');
    this.id = localStorage.getItem('id');
    this.email = localStorage.getItem('email');
  }


  @Input() userid;
  description:string="";
  fileInput:any;

  // submit(){
  //   const form = new FormData();
  //   console.log("user ID from tabb" + this.userid)
  //   form.append('user',this.userid);
  //   form.append("story",this.fileInput);
  //   this.saveStroyToDb(form).subscribe(data => {
  //    // alert("successfully added");
  //     console.log(data);
  //     this.back();
  //   })
  // }

  // saveStroyToDb(form:FormData){
  //   return this.http.post("http://localhost:5000/api/addstory",form);
  // }
  // async back(){
  //   const post = await this.modalCtrl.create({
  //     component: TabsPage,
  //   });
  //   await post.present();
  // }
  showAccessbility(){
    if(this.isaccess===true){
      this.isaccess=false;
    }else{
      this.isaccess=true;
    }
  }
  onChange(event: any) {

    this.selectFile(event);
      const file = event.target.files && event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        if(file.type.indexOf('image')> -1){
          this.format = 'image';
        } else if(file.type.indexOf('video')> -1){
          this.format = 'video';
        }
        // eslint-disable-next-line @typescript-eslint/no-shadow
        reader.onload = (event) => {
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          this.url = (<FileReader>event.target).result;
          this.isSelected=true;
        };
      }else{
        this.isSelected=false;
      }
    }
    async back(){
      const post = await this.modalCtrl.create({
        component: TabsPage,
      });
      await post.present();
    }
    selectFile(event: any): void {
      this.selectedFiles = event.target.files[0];
    }

    selectedStatus(){
      if(this.isSelected){
        this.isSelected=false;
        this.url='';
        this.format='';
      }
    }

    changeAccessbility(){
        if(this.accessbility==='public'){
          this.accessbility='private';
        }else{
          this.accessbility='public';
        }
    }


    onClickSubmit(data: NgForm) {

      this.noImagePost=true;
      //   var user:any;
      // this.api.getUserById(this.userid).subscribe((res:any)=>{
      //   user=res.data;
      //   console.log(user);
      // })
      console.log(this.selectedFiles);

      const form = new FormData();
      form.append('user',this.userid);
      form.append('story',this.selectedFiles);

        this.inprogress=true;

        this.api.addStory(form).subscribe((res:any)=>{
          console.log(res);
          this.selectedFiles='';
          this.url='';
          this.isSelected=false;
          this.inprogress=false;
        });

   }


}

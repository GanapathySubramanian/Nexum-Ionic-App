/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable quote-props */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/quotes */
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApicallsService } from 'src/app/core/services/apicalls.service';
import {ProfilePage} from '../profile/profile.page'
import { TabsPage } from '../tabs/tabs.page';
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {

  @Input() userid;
  format:string='';

  selectedFiles?: any;

  hidechooseProfile:boolean=true;

  username:string='';
  description:string='';

  isSelected: boolean=false;
  url: string | ArrayBuffer;
  previous_url:any;
  inprogress:boolean=false;
  constructor(private modalCtrl: ModalController,private apiservice:ApicallsService) {

  }

  ngOnInit() {
    this.apiservice.getUserById(this.userid).subscribe((res:any)=>{
      console.log(this.userid);
      // console.log(data.data.name);

      this.username=res.data.name;
      this.url=res.data.profilepic;
      this.previous_url=this.url;
      this.description=res.data.description

    })
  }


  showChooseProfile(){
    this.hidechooseProfile=false;
  }
  closechooseProfile(){
    this.hidechooseProfile=true;
    this.isSelected=false;
    this.url=this.previous_url;
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

  saveProfilePost(){


    const formData = new FormData();
    formData.append('id',this.userid);
    formData.append('profilepic',this.selectedFiles);

    this.inprogress=true;

    this.apiservice.updateProfilePic(formData).subscribe((data:any)=>{
      this.inprogress=false;
      this.hidechooseProfile=true;
    this.isSelected=false;
    })



    // console.log(this.userid);

  }
  saveProfileData(){
    console.log(this.username);
    console.log(this.description);
    this.inprogress=true;

   var data= {
      "name":this.username,
      "description":this.description,
      "_id":this.userid
  }

    this.apiservice.updateProfileDetails(data).subscribe((data:any)=>{
      this.inprogress=false;
      console.log(data);
    })
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
}

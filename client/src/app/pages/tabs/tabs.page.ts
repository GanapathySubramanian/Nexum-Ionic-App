/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  selectTab: any;
  token:any;
  tokenDetails:any;
  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit() {
    console.log('Token: ', localStorage.getItem('token'));

    this.token = localStorage.getItem('token');

    if (this.token) {
      const base64Url = this.token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      this.tokenDetails = JSON.parse(atob(base64));

      console.log(this.tokenDetails);
      localStorage.setItem('userid',this.tokenDetails.sub);
      localStorage.setItem('email',this.tokenDetails.username);
      this.saveUser(this.tokenDetails.sub,this.tokenDetails.username).subscribe((data:any) => {
        localStorage.setItem('id',data.data._id);
        localStorage.setItem('name',data.data.name);
        localStorage.setItem('profilepic',data.data.profilepic);
        console.log('function called....');
        // console.log(data);
      });
      // localStorage.setItem('tokendetails',this.tokenDetails);
      // localStorage.setItem('hello','hello');
      // console.log(localStorage.getItem('hello')+'\n '+localStorage.getItem('tokendetails'));
    }
  }
  saveUser(id,name){
    const formdata = new FormData();
    const origianl_name = name.substring(13, name.indexOf("@"))
    console.log(origianl_name)
    console.log(id)
    console.log(name)
    formdata.append('name',origianl_name);
    formdata.append('emailid',name);
    formdata.append('userid',id);
    // http://localhost:5000/api/adduser
    return this.http.post('http://localhost:5000/api/adduser',formdata);
  }

  setCurrentTab(event) {
    console.log(event);
   // this.selectTab = this.tabs.getSelected();
  }
  routeUrl(){
    this.route.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    }
    this.route.onSameUrlNavigation = 'reload'
    this.route.navigateByUrl('/tabs/home',{replaceUrl:true});
  }

}

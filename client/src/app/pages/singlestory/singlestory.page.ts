/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular'
import { TabsPage } from '../tabs/tabs.page';

@Component({
  selector: 'app-singlestory',
  templateUrl: './singlestory.page.html',
  styleUrls: ['./singlestory.page.scss'],
})
export class SinglestoryPage implements OnInit {

  constructor(private modalCtrl : ModalController) { }
  @Input() postselected;
  username: string;
  id: string;
  email: string;
  ngOnInit() {
    this.username =localStorage.getItem('name');
    this.id = localStorage.getItem('id');
    this.email = localStorage.getItem('email');
  }
  getBack(){
    this.back()
  }
  async back(){
    const post = await this.modalCtrl.create({
      component: TabsPage,
    });
    await post.present();
  }


}

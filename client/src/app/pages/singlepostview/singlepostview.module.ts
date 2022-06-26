import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SinglepostviewPageRoutingModule } from './singlepostview-routing.module';

import { SinglepostviewPage } from './singlepostview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SinglepostviewPageRoutingModule
  ],
  declarations: [SinglepostviewPage]
})
export class SinglepostviewPageModule {}

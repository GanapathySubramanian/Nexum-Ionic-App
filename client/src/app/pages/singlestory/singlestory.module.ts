import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SinglestoryPageRoutingModule } from './singlestory-routing.module';

import { SinglestoryPage } from './singlestory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SinglestoryPageRoutingModule
  ],
  declarations: [SinglestoryPage]
})
export class SinglestoryPageModule {}

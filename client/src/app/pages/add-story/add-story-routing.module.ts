import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddStoryPage } from './add-story.page';

const routes: Routes = [
  {
    path: '',
    component: AddStoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddStoryPageRoutingModule {}

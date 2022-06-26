import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SinglestoryPage } from './singlestory.page';

const routes: Routes = [
  {
    path: '',
    component: SinglestoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SinglestoryPageRoutingModule {}

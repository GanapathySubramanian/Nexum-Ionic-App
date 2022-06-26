import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
          path:'home',
          canActivate:[AuthGuard],
          loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path:'explore',
        loadChildren:() => import('../explore/explore.module').then(m => m.ExplorePageModule)
      },
      {
        path:'add',
        canActivate:[AuthGuard],
        loadChildren:() => import('../add-post/add-post.module').then(m => m.AddPostPageModule)
      },
      {
        path:'suggestion',
        canActivate:[AuthGuard],
        loadChildren:() => import('../suggestion/suggestion.module').then(m => m.SuggestionPageModule)
      },
      {
        path:'profile',
        canActivate:[AuthGuard],
        loadChildren:() => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path:'addstory',
        canActivate:[AuthGuard],
        loadChildren:() => import('../add-story/add-story.module').then(m => m.AddStoryPageModule)
      },
      {
        path:'edit-profile',
        canActivate:[AuthGuard],
        loadChildren:() => import('../update-profile/update-profile.module').then(m => m.UpdateProfilePageModule)
      },
      {
        path:'',
        redirectTo:'/tabs/explore',
        pathMatch:'full'
      }
    ]
  },
  {
    path:'',
    redirectTo:'/tabs/explore',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}

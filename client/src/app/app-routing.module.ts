import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutoLoginGuard } from './pages/guard/auto-login.guard';
import { TokenResolverService } from './resolver/token-resolver.service';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    //loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule),
    resolve: {
      access: TokenResolverService
    }
  },
  // {
  //   path:'home',
  //   loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  //  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'callback',
    redirectTo: 'tabs',
  },
  {
    path: 'login',
    canActivate:[AutoLoginGuard],
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'singlepostview',
    loadChildren: () => import('./pages/singlepostview/singlepostview.module').then( m => m.SinglepostviewPageModule)
  },
  {
    path: 'add-story',
    loadChildren: () => import('./pages/add-story/add-story.module').then( m => m.AddStoryPageModule)
  },
  {
    path: 'update-profile',
    loadChildren: () => import('./pages/update-profile/update-profile.module').then( m => m.UpdateProfilePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

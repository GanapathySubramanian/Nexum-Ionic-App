import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './services/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { TabsPageModule } from './pages/tabs/tabs.module';
import { UpdateProfilePageModule } from './pages/update-profile/update-profile.module';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { CommonModule } from '@angular/common';
import { Storage } from '@ionic/storage';



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,TabsPageModule,UpdateProfilePageModule],
  providers: [AuthGuard, AuthenticationService,Storage,StatusBar,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {}

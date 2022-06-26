/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/quotes */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate() {
    const isLoggedIn =  localStorage.getItem('token');
    console.log("From the autoLoginGaurd" +   isLoggedIn);
    if(isLoggedIn)
    {
      this.router.navigateByUrl('/tabs/home',{replaceUrl:true});
      return false;
    }else{
      return true;
    }

  }
}

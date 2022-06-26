import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate()
  {
    const hasSeenIntro =  localStorage.getItem('token');
      if (hasSeenIntro) {
        // this.router.navigateByUrl('/tabs/home',{replaceUrl:true})
        console.log(hasSeenIntro);
        return true;
      } else {
        this.router.navigateByUrl('/', { replaceUrl:true });
        return false;
      }
  }
}

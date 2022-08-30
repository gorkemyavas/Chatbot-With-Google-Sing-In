import { Injectable }                                                                from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable }                                                                from 'rxjs';
import { GoogleSingOnService } from '../services/google-sing-on.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoginGuard implements CanActivate {
  constructor(private googleSingOnService: GoogleSingOnService,
              private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.googleSingOnService.user){
      return true;
    }else{
      this.router.navigateByUrl('/login').then(() => {
      });
      return false
    }
  }

}

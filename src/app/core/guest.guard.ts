import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from "./authentication.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(public authService: AuthenticationService,
              public router: Router) {
  }

  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.firebaseUserStatus.pipe(
        map(isAuth => {
          if (isAuth) {
            console.warn('Access Denied, Logout before Access This Page!');
            this.authService.navigateHome();
          }
          return !isAuth;
        })
    );
  }

}

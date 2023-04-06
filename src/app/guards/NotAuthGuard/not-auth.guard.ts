import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.getAuthenticatedUser().pipe(
      map(user => {
        if (user) {
          this.router.navigate(['/dashboard']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }

}

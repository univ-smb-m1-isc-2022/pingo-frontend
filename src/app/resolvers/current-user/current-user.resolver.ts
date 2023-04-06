import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserResolver implements Resolve<any> {

  constructor(private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.getAuthenticatedUser();
  }
}

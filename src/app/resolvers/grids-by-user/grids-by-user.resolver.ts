import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, catchError, of, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { GridService } from 'src/app/services/grid-service/grid.service';

@Injectable({
  providedIn: 'root'
})
export class GridsByUserResolver implements Resolve<any> {
  constructor(private gridService: GridService, private router: Router, private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.authService.getAuthenticatedUser().pipe(
      switchMap(authUser => {
        return this.gridService.getAllGridByUser(authUser.body.id).pipe(
          catchError(error => {
            this.router.navigateByUrl("/");
            return of(null);
          }));
      })
    )
  }
}

import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, of } from 'rxjs';
import { GridService } from 'src/app/services/grid-service/grid.service';

@Injectable({
  providedIn: 'root'
})
export class GridByCodeResolver implements Resolve<any> {
  constructor(private gridService: GridService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const url_code = route.paramMap.get("url_code");

    if (url_code == null)
      throw new Error("No grid url_code parameter provided");

    return this.gridService.getGridByUrlCode(url_code)
      .pipe(catchError(error => {
        this.router.navigateByUrl("/");
        return of(null);
      })
      );
  }
}

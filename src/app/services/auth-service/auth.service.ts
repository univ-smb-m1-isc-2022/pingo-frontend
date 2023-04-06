import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, concat, last, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GridSaveService } from '../grid-save/grid-save.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authenticatedUser: any

  constructor(private http: HttpClient, private gridSaveService: GridSaveService) { }

  login(formValue: any) {
    return this.http.post(
      `//${environment.apiDomain}/auth/authentication`,
      formValue,
      { observe: 'response', withCredentials: true, responseType: 'text'}
    );
  }

  register(formValue: any) {
    return this.http.post(
      `//${environment.apiDomain}/auth/register`,
      formValue,
      { observe: 'response', withCredentials: true, responseType: 'text' }
    );
  }

  disconnect() {
    return this.http.post(
      `//${environment.apiDomain}/auth/disconnect`,
      {},
      { observe: 'response', withCredentials: true, responseType: 'text' }
    ).pipe(map(response => {
        this.authenticatedUser = null;
        this.gridSaveService.deleteLocalSaves();
        return response;
    }));
  }

  getAuthenticatedUser(): Observable<any> {
    if (this.authenticatedUser) {
      return of(this.authenticatedUser);
    } else {
      return this.http.get(`//${environment.apiDomain}/auth/user`,
        { observe: 'response', withCredentials: true }
      ).pipe(
        map(response => {
          this.authenticatedUser = response;
          return this.authenticatedUser;
        }),
        catchError(error => {
          console.error(error);
          return of(null);
        })
      );
    }
  }
}

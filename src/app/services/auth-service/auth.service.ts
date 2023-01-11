import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concat, last } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(formValue: any) {
    const csrfRequest = this.http.head(
      `//${environment.apiDomain}/sanctum/csrf-cookie`
    );

    const loginRequest = this.http.post(
      `//${environment.apiDomain}/login`,
      formValue,
      { observe: 'response' }
    );

    const mergedRequests = concat(csrfRequest, loginRequest);

    return mergedRequests.pipe(last());
  }

  register(formValue: any) {
    const csrfRequest = this.http.head(
      `//${environment.apiDomain}/sanctum/csrf-cookie`
    );

    const registerRequest = this.http.post(
      `//${environment.apiDomain}/register`,
      formValue,
      { observe: 'response' }
    );

    const mergedRequests = concat(csrfRequest, registerRequest);

    return mergedRequests.pipe(last());
  }
}

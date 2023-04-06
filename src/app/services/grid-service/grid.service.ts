import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  constructor(private http: HttpClient) { }

  createGrid(gridValue: any) {
    return this.http.post(`//${environment.apiDomain}/bingo`,
      gridValue,
      { observe: 'response', withCredentials: true }
    );
  }

  getGridByUrlCode(url_code: string) {
    return this.http.get(`//${environment.apiDomain}/bingo/url_code/${url_code}`,
      { observe: 'response' }
    );
  }

  getAllGridByUser(user_id: number) {
    return this.http.get(`//${environment.apiDomain}/user/${user_id}/bingo`,
      { observe: 'response', withCredentials: true }
    );
  }

  deleteGrid(url_code: string) {
    return this.http.delete(`//${environment.apiDomain}/bingo/${url_code}`,
      { withCredentials: true, responseType: 'text' }
    );
  }
}

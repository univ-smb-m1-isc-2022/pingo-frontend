import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GridSaveService {

  constructor(private http: HttpClient) { }

  saveGridSave(gridCompletionAsString: String, userId: number, urlCode: string) {
    return this.http.post(`//${environment.apiDomain}/user/${userId}/save`,
    {urlCode: urlCode, gridCompletion: gridCompletionAsString},
      { observe: 'response', withCredentials: true }
    );
  }

  getGridSave(userId: number, urlCode: string) {
    return this.http.get(`//${environment.apiDomain}/user/${userId}/save/${urlCode}`,
      { observe: 'response', withCredentials: true }
    );
  }

  modifyGridSave(gridCompletionAsString: String, userId: number, urlCode: string) {
    return this.http.put(`//${environment.apiDomain}/user/${userId}/save/${urlCode}`,
    {urlCode: urlCode, gridCompletion: gridCompletionAsString},
      { observe: 'response', withCredentials: true }
    );
  }

  deleteLocalSaves() {
    localStorage.removeItem("gridSaves");
  }
}

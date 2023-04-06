import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertSource = new Subject<{type: 'info' | 'success' | 'error', message: string}>();


  alert$ = this.alertSource.asObservable();

  sendAlert(payload: {type: 'info' | 'success' | 'error', message: string}) {
    this.alertSource.next(payload);
  }
}

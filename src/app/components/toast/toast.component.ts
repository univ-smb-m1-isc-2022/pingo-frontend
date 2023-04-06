import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { AlertService } from 'src/app/services/alert-service/alert.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('showHide', [
      state('shown', style({
        bottom: 50,
      })),
      state('hidden', style({
        bottom: -120
      })),
      transition('* => shown', [
        animate('0.5s'),
      ]),
      transition('shown => hidden', [
        animate('0.5s'),
      ]),
    ])
  ]
})
export class ToastComponent {

  isShown: boolean = false;
  type: string = "info";
  message: string = "Default message";

  alertSubscription: Subscription;

  constructor(private alertService: AlertService) {
    this.alertSubscription = this.alertService.alert$.subscribe(
      payload => { this.type = payload.type; this.message = payload.message; this.showToast() }
    );
  }


  showToast() {
    this.isShown = true;  
    timer(5000).subscribe(() => {
      this.isShown = false;
    })
  }

  ngOnDestroy() {
    this.alertSubscription.unsubscribe();
  }

}

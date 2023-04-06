import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import * as SockJS from 'sockjs-client';

import * as Stomp from 'stompjs';
import { AlertService } from 'src/app/services/alert-service/alert.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

	constructor() {}
}

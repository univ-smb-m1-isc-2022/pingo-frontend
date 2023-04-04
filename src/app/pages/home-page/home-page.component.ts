import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import * as SockJS from 'sockjs-client';

import * as Stomp from 'stompjs';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

	returnValue!: string;
	from: string = "";
	text: string = "";

	stompClient!: Stomp.Client

	constructor(private http: HttpClient) {}

	ngOnInit(): void {
		this.http.get(`//${environment.apiDomain}/hello`, { observe: 'body' }).subscribe((data) => this.returnValue = data.toString());

		var socket = new SockJS(`${environment.httpIsSecure}://${environment.apiDomain}/chat`);
		this.stompClient = Stomp.over(socket);
		this.stompClient.connect({}, (frame) => {
			console.log("connected !");
			this.stompClient.subscribe(`/topic/messages`, (messageOutput) => {
				console.log("MESSAGE : ", JSON.parse(messageOutput.body));
			})
		}, (error) => {
			console.log("ERROR, ", error);
		})
	}

	sendMessage() {
		console.log("send", this.from, this.text);
		this.stompClient.send(`/app/chat`, {}, JSON.stringify({from: this.from, text: this.text}))
	}
}

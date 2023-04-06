import { Injectable } from '@angular/core';

import * as SockJS from 'sockjs-client';
import { environment } from 'src/environments/environment';

import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root'
})
export class GridWSService {

  socket!: WebSocket;
  stompClient!: Stomp.Client;
  username!: string;

  constructor() {
    
  }

  createWsConnection(room_url: string, username: string ,onReceive: (messageOutput: any) => any) {
    this.username = username;

    if(this.stompClient || this.stompClient) {
      this.socket.close();
    }

    this.socket = new SockJS(`${environment.httpIsSecure}://${environment.apiDomain}/websocket`);
    this.stompClient = Stomp.over(this.socket);
    this.stompClient.connect({}, (frame) => {
      console.log("connected !");
      this.stompClient.subscribe(`/topic/messages/${room_url}`, (messageOutput) => {
        var parsedMessageOutput = JSON.parse(messageOutput.body);
        if(parsedMessageOutput.from != this.username)
        onReceive(parsedMessageOutput);
      })
    }, (error) => {
      console.log("ERROR, ", error);
    })
  }

  sendBingoNotification(room_url: string) {
    this.stompClient.send(`/app/bingo_rooms/${room_url}`, {}, JSON.stringify({ from: this.username, text: "Got a Bingo !" }));
  }

}

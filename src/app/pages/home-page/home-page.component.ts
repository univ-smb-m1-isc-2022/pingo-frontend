import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
	returnValue!: string;

	constructor(private http: HttpClient) {}

	ngOnInit(): void {
		this.http.get("http://0.0.0.0/api/test", { observe: 'body', responseType: 'json'}).subscribe((data) => this.returnValue = JSON.stringify(data));
	}
}

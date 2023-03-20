import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
	returnValue!: string;

	constructor(private http: HttpClient) {}

	ngOnInit(): void {
		this.http.get(`//${environment.apiDomain}/hello`, { observe: 'body' }).subscribe((data) => this.returnValue = data.toString());
	}
}

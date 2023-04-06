import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent {
  data: any;


  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.data = this.route.snapshot.data;
  }

  onDisconnectClick() {
    console.log("test");
    this.authService.disconnect().subscribe(() => {
      this.router.navigateByUrl("/");
    });
  }

}

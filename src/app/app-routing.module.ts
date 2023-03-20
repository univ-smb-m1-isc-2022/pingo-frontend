import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/AuthGuard/auth.guard';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const routes: Routes = [
	{
		path: "",
		component: HomePageComponent
	},
	{
		path: "login",
		component: LoginPageComponent
	},
	{
		path: "register",
		component: RegisterPageComponent
	},
	{
		path: "app",
		canActivateChild: [AuthGuard],
		component: DashboardLayoutComponent,
		children: [
			{
				path: "",
				redirectTo: "/app/dashboard",
				pathMatch: "full"
			},
			{
				path: "dashboard",
				component: DashboardPageComponent,
				pathMatch: "full"
			}
		]
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

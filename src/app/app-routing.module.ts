import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/AuthGuard/auth.guard';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { GuestLayoutComponent } from './layouts/guest-layout/guest-layout.component';
import { CreateGridComponent } from './pages/create-grid/create-grid.component';
import { PlayGridComponent } from './pages/play-grid/play-grid.component';
import { GridByCodeResolver } from './resolvers/grid-by-code/grid-by-code.resolver';
import { CurrentUserResolver } from './resolvers/current-user/current-user.resolver';
import { NotAuthGuard } from './guards/NotAuthGuard/not-auth.guard';
import { GridsByUserResolver } from './resolvers/grids-by-user/grids-by-user.resolver';

const routes: Routes = [
	{
		path: "",
		component: GuestLayoutComponent,
		children: [
			{
				path: "",
				canActivate: [NotAuthGuard],
				component: HomePageComponent
			},
			{
				path: "login",
				canActivate: [NotAuthGuard],
				component: LoginPageComponent
			},
			{
				path: "register",
				canActivate: [NotAuthGuard],
				component: RegisterPageComponent
			},
			{
				path: "play/:url_code",
				component: PlayGridComponent,
				pathMatch: "full",
				resolve: {
					grid: GridByCodeResolver,
					authUser: CurrentUserResolver
				},
			}
		]
	},
	{
		path: "dashboard",
		component: DashboardLayoutComponent,
		canActivateChild: [AuthGuard],
		resolve: {
			authUser: CurrentUserResolver
		},
		children: [
			{
				path: "",
				component: DashboardPageComponent,
				resolve: {
					gridList: GridsByUserResolver
				},
				pathMatch: "full"
			},
			{
				path: "create_grid",
				component: CreateGridComponent,
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

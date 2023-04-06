import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { httpInterceptorProviders } from './http-interceptors';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ToastComponent } from './components/toast/toast.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { GuestLayoutComponent } from './layouts/guest-layout/guest-layout.component';
import { CreateGridComponent } from './pages/create-grid/create-grid.component';
import { PlayGridComponent } from './pages/play-grid/play-grid.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    DashboardPageComponent,
    ToastComponent,
    DashboardLayoutComponent,
    GuestLayoutComponent,
    CreateGridComponent,
    PlayGridComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

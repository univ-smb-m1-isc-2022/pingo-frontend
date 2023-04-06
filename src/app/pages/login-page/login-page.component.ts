import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  response!: string;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void { }

  onLoginSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService
      .login(this.loginForm.getRawValue())
      .subscribe({
        error: (error: HttpErrorResponse) => {
          this.response = JSON.stringify(error);
        },
        next: () => {
          this.router.navigateByUrl('/dashboard');
        }
      });

  }
}

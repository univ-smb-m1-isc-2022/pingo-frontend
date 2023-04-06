import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { passwordConfirmationValidator } from 'src/app/shared/password-confirmation.directive';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  registerForm = this.fb.group(
    {
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      password_confirmation: [
        '',
        [Validators.required, Validators.minLength(5)],
      ],
    },
    { validators: passwordConfirmationValidator }
  );

  response!: string;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {}

  onRegisterSubmit(): void {
    this.authService.register(this.registerForm.getRawValue()).subscribe({
		error: (error: HttpErrorResponse) => {
			this.response = JSON.stringify(error);
		},
		next: () => {
      this.router.navigateByUrl('/dashboard');
		}
	});
  }
}

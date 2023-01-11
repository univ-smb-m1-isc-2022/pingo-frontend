import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordConfirmationValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const password_confirmation = control.get('password_confirmation');

  return password &&
    password_confirmation &&
    password.value !== password_confirmation.value
    ? { passwordConfirmed: false }
    : null;
};

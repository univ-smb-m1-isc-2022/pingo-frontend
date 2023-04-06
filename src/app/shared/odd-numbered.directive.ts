import { AbstractControl, ValidatorFn } from '@angular/forms';

export function oddNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (value % 2 === 0) {
      return { odd: true };
    }
    return null;
  };
}

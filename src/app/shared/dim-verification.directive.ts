import { Directive } from '@angular/core';
import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';

export const dimVerificationValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const dim = control.get('dim');
  const gridData = control.get('gridData') as FormArray;
  
  return dim &&
    gridData &&
    gridData.length < dim.value * dim.value
    ? { dimensionConfirmed: false }
    : null;
};
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert-service/alert.service';
import { GridService } from 'src/app/services/grid-service/grid.service';
import { dimVerificationValidator } from 'src/app/shared/dim-verification.directive';
import { oddNumberValidator } from 'src/app/shared/odd-numbered.directive';



@Component({
  selector: 'app-create-grid',
  templateUrl: './create-grid.component.html',
  styleUrls: ['./create-grid.component.scss']
})
export class CreateGridComponent {
  gridForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    dim: [3, [Validators.required, Validators.min(3), oddNumberValidator]],
    gridData: this.fb.array([
      this.fb.control('', Validators.required),
      this.fb.control('', Validators.required),
      this.fb.control('', Validators.required),
      this.fb.control('', Validators.required),
      this.fb.control('', Validators.required),
      this.fb.control('', Validators.required),
      this.fb.control('', Validators.required),
      this.fb.control('', Validators.required),
      this.fb.control('', Validators.required)
    ], [Validators.required])
  }, { validators: dimVerificationValidator});

  constructor(private fb: FormBuilder, private gridService: GridService, private router: Router, private alertService: AlertService) { }

  onGridSubmit() {

    if (this.gridForm.invalid) {
      return;
    }

    console.log(this.gridForm.getRawValue());

    this.gridService
      .createGrid(this.gridForm.getRawValue())
      .subscribe({
        error: (error: any) => {
          this.alertService.sendAlert({ type: "error", message: error.error });
        },
        next: (response: { body: any; }) => {
          console.log(response.body);
          this.router.navigateByUrl(`/play/${(response.body! as any).urlCode}`)

        }
      });
  }


  get gridData() {
    return this.gridForm.get('gridData') as FormArray;
  }

  addBox() {
    this.gridData.push(this.fb.control('', Validators.required));
  }

  removeBox() {
    if (this.gridData.length > 9)
      this.gridData.removeAt(-1);
  }
}

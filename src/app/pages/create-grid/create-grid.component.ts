import { Component } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { GridService } from 'src/app/services/grid-service/grid.service';
import { dimVerificationValidator } from 'src/app/shared/dim-verification.directive';



@Component({
  selector: 'app-create-grid',
  templateUrl: './create-grid.component.html',
  styleUrls: ['./create-grid.component.scss']
})
export class CreateGridComponent {
  gridForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    dim: [3, [Validators.required, Validators.min(3)]],
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

  constructor(private fb: FormBuilder, private gridService: GridService, private router: Router) { }

  onGridSubmit() {

    if (this.gridForm.invalid) {
      return;
    }

    console.log(this.gridForm.getRawValue());

    this.gridService
      .createGrid(this.gridForm.getRawValue())
      .subscribe({
        error: (error) => {

        },
        next: (response) => {
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

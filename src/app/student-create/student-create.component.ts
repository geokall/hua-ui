import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {

  form: FormGroup;
  saving: boolean = false;
  loading: boolean = false;
  successModal: boolean = false;
  errorModal: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required),
      fatherName: new FormControl(null, Validators.required),
      motherName: new FormControl(null, Validators.required)

    });
  }

  onClear(): void {
    // this.form.reset(this.form); //not sure
  }

  onSubmit(): void {
    // this.saving = true;
    // const form = this.form.value as any; //as student form
    // this.form.reset(form);
    // this.decisionFormService
    //   .save(form)
    //   .pipe(first())
    //   .subscribe((res: HttpResponse<any>) => this.successModal = true, (error: HttpErrorResponse) => this.errorModal = true)
    //   .add(() => this.saving = false);
  }

}

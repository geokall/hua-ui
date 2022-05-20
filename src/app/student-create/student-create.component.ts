import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {StudentDirection} from "../shared/models/student-direction";

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
  isDisabled: boolean = true;

  studentDirections: StudentDirection[];
  studentDirection: StudentDirection[];

  constructor() {
  }

  ngOnInit(): void {
    this.initForm();
    this.initStudentDirections();
  }

  initForm(): void {
    this.form = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required),
      fatherName: new FormControl(null, Validators.required),
      motherName: new FormControl(null, Validators.required),
      curriculum: new FormControl({value: 'ΤΜΗΜΑ ΠΛΗΡΟΦΟΡΙΚΗΣ ΚΑΙ ΤΗΛΕΜΑΤΙΚΗΣ (ΜΠΣ)', disabled: true}),
      studentDirection: new FormGroup({
        id: new FormControl(null),
        name: new FormControl(null)
      })
    });
  }

  initStudentDirections(): void {
    this.studentDirections = [
      {name: 'Τεχνολογίες και Εφαρμογές Ιστού', id: 1},
      {name: 'Διαχείριση Δικτύων Επικοινωνιών και Υπηρεσιών Επόμενης Γενιάς', id: 2},
      {name: 'Πληροφοριακά Συστήματα στη Διοίκηση Επιχειρήσεων', id: 3},
    ]

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

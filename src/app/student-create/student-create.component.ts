import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {StudentDirection} from "../shared/models/student-direction";
import {StudentGender} from "../shared/models/student-gender";
import {environment} from "../../environments/environment";

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
  studentGenders: StudentGender[] = [];

  showDebug = environment.debug;

  constructor() {
  }

  ngOnInit(): void {
    this.initForm();
    this.initStudentDirections();
    this.initStudentGender();
  }

  initForm(): void {
    this.form = new FormGroup({
      id: new FormControl(null),
      surname: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      fatherName: new FormControl(null, Validators.required),
      motherName: new FormControl(null, Validators.required),
      birthDate: new FormControl(null),
      gender: new FormControl(null),
      studentDetails: new FormGroup({
        id: new FormControl(null),
        department: new FormControl({value: 'ΤΜΗΜΑ ΠΛΗΡΟΦΟΡΙΚΗΣ ΚΑΙ ΤΗΛΕΜΑΤΙΚΗΣ (ΜΠΣ)', disabled: true}),
        direction: new FormControl(null),
      }),
      studentContactInfo: new FormGroup({
        id: new FormControl(null),
        address: new FormControl(null),
        city: new FormControl(null),
        postalCode: new FormControl(null),
        mobileNumber: new FormControl(null),
        vatNumber: new FormControl(null),
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

  initStudentGender(): void {
    this.studentGenders = [
      {name: 'Άρεν', id: 1},
      {name: 'Θήλυ', id: 2}
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

  get gender(): FormControl {
    return this.form.get('gender') as FormControl;
  }

  get studentDetails(): FormGroup {
    return this.form.get('studentDetails') as FormGroup;
  }

  get department(): FormControl {
    return this.studentDetails.get('department') as FormControl;
  }

  get direction(): FormControl {
    return this.studentDetails.get('direction') as FormControl;
  }

  get studentContactInfos(): FormGroup {
    return this.form.get('studentContactInfo') as FormGroup;
  }

  get street(): FormControl {
    return this.studentContactInfos.get('street') as FormControl;
  }

  get city(): FormControl {
    return this.studentContactInfos.get('city') as FormControl;
  }

  get postalCode(): FormControl {
    return this.studentContactInfos.get('postalCode') as FormControl;
  }

  get mobileNumber(): FormControl {
    return this.studentContactInfos.get('mobileNumber') as FormControl;
  }

  get vatNumber(): FormControl {
    return this.studentContactInfos.get('vatNumber') as FormControl;
  }

}

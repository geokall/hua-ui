import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {StudentDirection} from "../../../shared/models/student-direction";
import {StudentGender} from "../../../shared/models/student-gender-enum";
import {environment} from "../../../../environments/environment";
import {StudentService} from "../../services/student.service";
import {Router} from "@angular/router";
import {StudentDTO} from "../../../shared/models/student-dto";
import {MessageService} from "primeng/api";
import {AuthService} from "../../../shared/auth.service";

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {

  studentForm?: StudentDTO;
  form: FormGroup;

  saving: boolean = false;
  loading: boolean = false;
  successModal: boolean = false;
  errorModal: boolean = false;
  isEditMode: boolean = false;
  isGraduateInfoEnabled: boolean = false;

  studentDirections: StudentDirection[];

  studentGenders: any[] = Object.keys(StudentGender)
    .map((item) => { // @ts-ignore
      return {key: item, value: StudentGender[item]}
    });

  showDebug = environment.debug;

  constructor(private api: StudentService,
              private messageService: MessageService,
              public auth: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
    this.initStudentDirections();
    this.fetchStudent();
    this.graduateInfoEnabled();
  }

  initForm(): void {
    this.form = new FormGroup({
      id: new FormControl(null),
      username: new FormControl(null),
      surname: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      fatherName: new FormControl(null),
      motherName: new FormControl(null),
      birthDate: new FormControl(null),
      gender: new FormControl(null),
      department: new FormControl('ΤΜΗΜΑ ΠΛΗΡΟΦΟΡΙΚΗΣ ΚΑΙ ΤΗΛΕΜΑΤΙΚΗΣ (ΠΜΣ)'),
      direction: new FormControl(null),
      address: new FormControl(null),
      city: new FormControl(null),
      postalCode: new FormControl(null),
      mobileNumber: new FormControl(null, Validators.required),
      vatNumber: new FormControl(null, Validators.required),
      file: new FormGroup({
        actualFile: new FormControl(null),
        fileName: new FormControl(null),
        mimeType: new FormControl(null),
      })
    });
  }

  initStudentDirections(): void {
    this.studentDirections = [
      {name: 'Τεχνολογίες και Εφαρμογές Ιστού'},
      {name: 'Διαχείριση Δικτύων Επικοινωνιών και Υπηρεσιών Επόμενης Γενιάς'},
      {name: 'Πληροφοριακά Συστήματα στη Διοίκηση Επιχειρήσεων'},
    ]
  }

  onClear(): void {
    this.form.reset(this.studentForm);
    this.department.setValue('ΤΜΗΜΑ ΠΛΗΡΟΦΟΡΙΚΗΣ ΚΑΙ ΤΗΛΕΜΑΤΙΚΗΣ (ΜΠΣ)')
  }

  onSubmit(): void {
    this.saving = true;
    const form = this.form.value as StudentDTO;
    this.form.reset(form);

    this.api.createStudent(form).subscribe(result => {
      this.successModal = true;
      this.saving = false;
    }, error => {
      this.saving = false;
      this.successModal = false;
      this.messageService.add({
        severity: 'error',
        detail: error.error.errorMessage
      });
    })
  }

  private fetchStudent(): void {
    if (this.router.url === '/student-profile') {
      this.isEditMode = true;
      this.api.getStudent(this.auth.getId())
        .subscribe(decision => this.form.reset(decision))
        .add(() => this.loading = false);
    } else {
      this.isEditMode = false;
    }
  }

  private graduateInfoEnabled(): void {
    this.isGraduateInfoEnabled = (this.router.url === '/actions/create' && this.auth.isAdmin())
      || (this.router.url === '/student-profile' && !this.auth.isAdmin());
  }

  get gender(): FormControl {
    return this.form.get('gender') as FormControl;
  }

  get department(): FormControl {
    return this.form.get('department') as FormControl;
  }

  get direction(): FormControl {
    return this.form.get('direction') as FormControl;
  }

  get address(): FormControl {
    return this.form.get('address') as FormControl;
  }

  get city(): FormControl {
    return this.form.get('city') as FormControl;
  }

  get postalCode(): FormControl {
    return this.form.get('postalCode') as FormControl;
  }

  get mobileNumber(): FormControl {
    return this.form.get('mobileNumber') as FormControl;
  }

  get vatNumber(): FormControl {
    return this.form.get('vatNumber') as FormControl;
  }

}

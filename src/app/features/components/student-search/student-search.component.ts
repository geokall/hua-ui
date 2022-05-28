import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/api.service";
import {AuthService} from "../../../shared/auth.service";
import {MessageService} from "primeng/api";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-student-search',
  templateUrl: './student-search.component.html',
  styleUrls: ['./student-search.component.scss']
})
export class StudentSearchComponent implements OnInit {

  studentForm: any;
  newStudentDialog: boolean | undefined;
  students: any;
  student: any;
  editable: boolean | undefined;
  deleteStudent: boolean | undefined;
  //@ts-ignore
  formErrors: Message[];
  isLoading = true;

  constructor(private api: ApiService,
              public authService: AuthService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.editable = false;
    this.deleteStudent = false;
    this.isLoading = true;
    this.studentForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', [
        Validators.required
      ]),
      isVerified: new FormControl(Boolean),
    })
    this.getStudents();
  }

  hideStudentDialog() {
    this.newStudentDialog = false;
    this.studentForm.reset();
  }

  getStudents() {
    this.api.getAllStudents().subscribe(student => {
        this.students = student;
        this.isLoading = false;
      },
      error => {

        console.log("error", error);
        this.messageService.add({
          severity: 'error',
          detail: 'den efere',
        });
      });
  }

  deleteCreditor(creditor: any) {
    this.deleteStudent = true;
    this.editable = false;
    this.studentForm.patchValue(creditor);
    this.newStudentDialog = true;
  }

  editCreditor(creditor: any) {
    this.editable = true;
    this.deleteStudent = false;
    this.studentForm.patchValue(creditor);
    console.log(creditor);
    this.newStudentDialog = true;
  }

  removeCreditor() {
    let creditor = this.studentForm.value;
    // this.api.deleteCreditor(creditor).subscribe(creditorsDetails => {
    //
    //     console.log("success!", creditorsDetails);
    //     this.newCreditorDialog = false;
    //     this.getCreditors();
    //     this.messageService.add({
    //       severity: 'success',
    //       detail: this.translate.instant('CREDITORS.CREDITOR_SUCCESS_DELETE'),
    //     });
    //   },
    //   error => {
    //     console.log("error", error);
    //     if (error.error != null) {
    //       this.formErrors = [
    //         {severity: 'error', detail: this.translate.instant(error.error.errorMessage)}
    //       ];
    //     }
    //   })
  }

  updateStudent() {
    let creditor = this.studentForm.value;
    this.api.updateStudent(creditor).subscribe(studentDetails => {
        console.log("success!", studentDetails);
        this.newStudentDialog = false;
        this.messageService.add({
          severity: 'success',
          detail: 'Επιτυχία',
        });
        this.getStudents();
        this.studentForm.reset();
      },
      error => {
        console.log("error", error);
        if (error.error != null) {
          this.formErrors = [
            {severity: 'error', detail: 'failed baby'}
          ];
        }
      })
  }

  get name() {
    return this.studentForm.get('name');
  }

}

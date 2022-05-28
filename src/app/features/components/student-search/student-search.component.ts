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
  newCreditorDialog: boolean | undefined;
  students: any;
  student: any;
  editable: boolean | undefined;
  deleteCr: boolean | undefined;
  //@ts-ignore
  formErrors: Message[];
  isLoading = true;

  constructor(private api: ApiService,
              public authService: AuthService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.editable = false;
    this.deleteCr = false;
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

  openNewCreditor() {
    this.editable = false;
    this.deleteCr = false;
    this.newCreditorDialog = true;
  }

  hideCreditorDialog() {
    this.newCreditorDialog = false;
    this.studentForm.reset();
  }

  saveCreditor() {
    this.editable = false;
    this.deleteCr = false;
    let creditor = this.studentForm.value;

    // this.api.createCreditor(creditor).subscribe(result => {
    //
    //     console.log("success!", result);
    //
    //     this.getCreditors();
    //
    //     this.messageService.add({
    //       severity: 'success',
    //       detail: this.translate.instant('CREDITORS.CREDITOR_SUCCESS_ADD'),
    //     });
    //
    //     this.creditorForm.reset();
    //     this.newCreditorDialog = false;
    //   },
    //   error => {
    //
    //     console.log("error", error);
    //     if(error.error != null){
    //       this.formErrors = [
    //         {severity:'error',detail: this.translate.instant(error.error.errorMessage)}
    //       ];
    //     }
    //
    //   })
    this.studentForm.markAllAsTouched();

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
    this.deleteCr = true;
    this.editable = false;
    this.studentForm.patchValue(creditor);
    this.newCreditorDialog = true;
  }

  editCreditor(creditor: any) {
    this.editable = true;
    this.deleteCr = false;
    this.studentForm.patchValue(creditor);
    console.log(creditor);
    this.newCreditorDialog = true;
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

  updateCreditor() {
    let creditor = this.studentForm.value;
    this.api.updateStudent(creditor).subscribe(studentDetails => {
        console.log("success!", studentDetails);
        this.newCreditorDialog = false;
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

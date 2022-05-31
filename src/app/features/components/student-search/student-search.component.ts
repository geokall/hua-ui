import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/auth.service";
import {MessageService} from "primeng/api";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {StudentDirection} from "../../../shared/models/student-direction";
import {StudentService} from "../../services/student.service";

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
  direction: StudentDirection[];

  constructor(private api: StudentService,
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
      dateCreated: new FormControl(null)
    })
    this.getStudents();
    this.direction = [
      {name: 'Τεχνολογίες και Εφαρμογές Ιστού'},
      {name: 'Διαχείριση Δικτύων Επικοινωνιών και Υπηρεσιών Επόμενης Γενιάς'},
      {name: 'Πληροφοριακά Συστήματα στη Διοίκηση Επιχειρήσεων'},
    ]
  }

  hideStudentDialog() {
    this.newStudentDialog = false;
    this.studentForm.reset();
  }

  getStudents() {
    this.api.getAllStudents().subscribe(students => {
        this.students = students;
        this.isLoading = false;
      },
      error => {
       this.messageService.add({
         severity: 'error',
         detail: 'den efere',
       });
      });
  }

  updateStudent() {
    let creditor = this.studentForm.value;
    this.api.updateStudent(creditor).subscribe(studentDetails => {
        console.log("success!", studentDetails);
        this.newStudentDialog = false;
        this.messageService.add({
          severity: 'success',
          detail: 'Ο Χρήστης ενημερώθηκε',
        });
        this.getStudents();
        this.studentForm.reset();
      },
      error => {
        console.log("error", error);
        if (error.error != null) {
          this.formErrors = [
            {severity: 'error', detail: 'Υπήρξε σφάλμα'}
          ];
        }
      })
  }

  editStudent(student: any) {
    this.editable = true;
    this.deleteStudent = false;
    this.studentForm.patchValue(student);
    this.newStudentDialog = true;
  }

  // deleteStudentForm(student: any) {
  //   this.deleteStudent = true;
  //   this.editable = false;
  //   this.studentForm.patchValue(student);
  //   this.newStudentDialog = true;
  // }
  //

  //
  // removeStudent() {
  //   let creditor = this.studentForm.value;
  // }

  get name() {
    return this.studentForm.get('name');
  }
}

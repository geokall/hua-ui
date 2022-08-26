import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/auth.service";
import {MessageService} from "primeng/api";
import {FormControl, FormGroup} from "@angular/forms";
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
  isMinioFileExist: boolean = false;

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
      username: new FormControl(null),
      isVerified: new FormControl(Boolean),
      dateCreated: new FormControl(null),
      surname: new FormControl(null),
      name: new FormControl(null),
      fatherName: new FormControl(null),
      motherName: new FormControl(null),
      address: new FormControl(null),
      city: new FormControl(null),
      postalCode: new FormControl(null),
      mobileNumber: new FormControl(null),
      vatNumber: new FormControl(null),
      file: new FormGroup({
        actualFile: new FormControl(null),
        fileName: new FormControl(null),
        mimeType: new FormControl(null),
      })
    });

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
         detail: 'υπήρξε σφάλμα',
       });
      });
  }

  updateStudent() {
    let creditor = this.studentForm.value;
    this.api.updateStudent(creditor).subscribe(studentDetails => {
        this.newStudentDialog = false;
        this.messageService.add({
          severity: 'success',
          detail: 'Ο Χρήστης ενημερώθηκε',
        });
        this.getStudents();
        this.studentForm.reset();
      },
      error => {
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

    this.api.getMinioFile(this.username?.value).subscribe(file => {
        this.getActualFile.setValue(file.actualFile);
        this.getFileName.setValue(file.fileName);

        this.isMinioFileExist = file.actualFile !== null;
      },
      error => {
      });
  }

  get name() {
    return this.studentForm.get('name');
  }

  get postalCode(): FormControl {
    return this.studentForm.get('postalCode') as FormControl;
  }

  get mobileNumber(): FormControl {
    return this.studentForm.get('mobileNumber') as FormControl;
  }

  get vatNumber(): FormControl {
    return this.studentForm.get('vatNumber') as FormControl;
  }

  get username(): FormControl {
    return this.studentForm.get('username') as FormControl;
  }

  get getFile() {
    return this.studentForm.get('file') as FormGroup;
  }

  get getFileName() {
    return this.getFile.get('fileName') as FormControl;
  }

  get getActualFile() {
    return this.getFile.get('actualFile') as FormControl;
  }

  get getMimeType() {
    return this.getFile.get('mimeType') as FormControl;
  }
}

import {Component, OnInit} from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {MessageService} from "primeng/api";
import {FormControl, FormGroup} from "@angular/forms";
import {StudentService} from "../features/services/student.service";
import {PasswordDTO} from "../shared/models/password-dto";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  passwordForm: any;
  newPasswordDialog: boolean | undefined = true;
  //@ts-ignore
  formErrors: Message[];

  constructor(private api: StudentService,
              public authService: AuthService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.passwordForm = new FormGroup({
      id: new FormControl(null),
      password: new FormControl(null)
    })
  }

  hideStudentDialog() {
    this.newPasswordDialog = false;
    this.passwordForm.reset();
  }

  updatePassword() {
    let passwordDTO = this.passwordForm.value as PasswordDTO;
    passwordDTO.id = this.authService.getId();
    this.api.updatePassword(passwordDTO).subscribe(response => {
        this.newPasswordDialog = false;
        this.messageService.add({
          severity: 'success',
          detail: 'Η αλλαγή κωδικού έγινε με επιτυχία',
        });
      },
      error => {
        if (error.error != null) {
          this.formErrors = [
            {severity: 'error', detail: 'Η αλλαγή κωδικού απέτυχε'}
          ];
        }
      })
  }

}

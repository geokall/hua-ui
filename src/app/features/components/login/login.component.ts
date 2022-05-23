import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {FormControl, FormGroup} from "@angular/forms";
import {OAuthService} from "angular-oauth2-oidc";
import {MessageService} from "primeng/api";
import {AuthService} from "../../../shared/auth.service";
import {Router} from "@angular/router";
import {ApiService} from "../../../shared/api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  env = environment;

  constructor(private api: ApiService,
              private router: Router,
              private auth: AuthService,
              private messageService: MessageService,
              private oauth2: OAuthService) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  submit(): void {
    this.api.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(result => {
          this.auth.setAuthDetails(result);
          this.auth.startTokenExpirationCounter();

          this.router.navigateByUrl('');
        },
        error => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            detail: 'Ο χρήστης δεν υπάρχει ή λάθος κωδικός'
          });
        });
  }

}

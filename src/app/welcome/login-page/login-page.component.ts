import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorage } from '../../../common/local-storage';
import ERROR_MESSAGES from '../../../common/Constants';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../../core/Service/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  angForm: FormGroup;
  nameError: any;
  passwordError: any;
  email = '';
  password = '';
  isLoading = false;
  showInputFeild = true;
  requestError: any = '';
  loginInput: any = {};
  loginFailed = false;
  signupSuccess: string;
  @ViewChild('loginFormDirective') private loginFormDirective: NgForm;

  constructor(
    private fb: FormBuilder,
    private storage: LocalStorage,
    private dialog: MatDialog,
    private auth: AuthService,
    private router: Router
  ) {
    this.createForm();
    this.nameError = ERROR_MESSAGES.LOGIN_USERNAME_EMPTY;
    this.passwordError = ERROR_MESSAGES.LOGIN_PASSWORD_EMPTY;
  }

  /**
   * creates the login form controls
   */
  createForm() {
    this.angForm = this.fb.group({
      email: [this.email, Validators.required],
      password: [this.password, Validators.required]
    });
  }

  /**
   * Submits the user credentials to the login API to succcessfully
   * login and retrieve the auth token
   */
  async submitClick() {
    this.isLoading = true;
    this.showInputFeild = false;

    try {
      const res = await this.auth.login(
        this.angForm.get('email').value,
        this.angForm.get('password').value
      );
      if ((res as any).success) {
        this.loginFailed = false;
        this.router.navigateByUrl('/clothes');
      }
    } catch (error) {
      this.loginFailed = true;
      this.isLoading = false;
      this.showInputFeild = true;
      if (error.status === 401) {
        this.requestError =
          'This can occur for invalid email and password or a wrong password for a given email.';
      } else if (error.status === 500) {
        this.requestError = 'A server side error has been occurred.';
      }
    }
  }
}

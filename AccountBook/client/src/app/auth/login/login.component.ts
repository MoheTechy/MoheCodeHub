import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../service/userManagement/authService/auth.service';
import { Router } from '@angular/router';
import { fade } from './login.animations';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fade]
})

export class LoginComponent implements OnInit {

  errorMessage: string;
  loginForm: FormGroup
  submitted: boolean = false;
  formSubmitAttempt: boolean;
  isError: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      emailId: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([
        Validators.required,
      ]))
    });
    if (this.authService.isLoggedIn()) {
      this.authService.logout();
    }
  }

  get f() { return this.loginForm.controls; }

  login(): void {
    this.isError = false;
    this.submitted = true;
    try {
      let loginForm = this.loginForm.value;
      if (loginForm && this.loginForm.valid && loginForm.emailId && loginForm.password) {

        const emailId = loginForm.emailId;
        const password = loginForm.password;
      
        this.authService.login(emailId, password)
          .subscribe((response) => {
            let user = response;
            if (user) {
              this.router.navigate(['/dashboard']);
            }
          }, err => {
            console.log(err);
            this.isError = true;
            this.errorMessage = err.error.message;
          });
      } else {
        this.isError = true;
        this.errorMessage = 'Please enter a user name and password.';
      }
    }
    catch (err) {
    }
  }

  isFieldInvalid(field: string) {
    if (this.loginForm.get(field) !== undefined && this.loginForm.get(field) !== null) {
      return (
        (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
        (this.loginForm.get(field).untouched && this.formSubmitAttempt)
      );
    }
  }

}

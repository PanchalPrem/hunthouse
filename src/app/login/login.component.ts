import { Component, OnInit, VERSION } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { CommonService } from 'src/app/common.service';
// import { ReCaptchaV3Service } from 'ng-recaptcha';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: CommonService,
    private toster: ToastrService
  ) {}
  loginForm: any = FormGroup;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  adminEmail = 'admin@mailinator.com';
  adminPassword = '123456';
  get f() {
    return this.loginForm.controls;
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required]],
    });
  }
  login() {
    if (this.loginForm.invalid) {
      this.loginForm.get('email').markAsTouched();
      this.loginForm.get('password').markAsTouched();
    } else {
      if (this.loginForm.value.email == this.adminEmail &&this.loginForm.value.password == this.adminPassword) {
        let data = {
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
        };
        this.service.loginUser(data).subscribe((res: any) => {
          if (res.ErrorCode == 200) {
            localStorage.setItem('token', res.data[0].authToken);
            localStorage.setItem('authKey', res.authkey);
            localStorage.setItem('id', res.data[0]._id);
            this.router.navigateByUrl('/dashboard');
          } else {
            this.toster.error(res.ErrorMessage);
          }
        });
      } else {
        alert('User Not Authorized');
      }
    }
  }
}
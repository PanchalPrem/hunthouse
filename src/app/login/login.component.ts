import { Component, OnInit, VERSION } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  loader: boolean = false;
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
      this.loader = true;
      let data = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      this.service.loginUser(data).subscribe((res: any) => {
        if (res.ErrorCode == 200) {
          if (res.data[0].roleId != 2) {
            localStorage.setItem('token', res.data[0].authToken);
            localStorage.setItem('authKey', res.authkey);
            localStorage.setItem('id', res.data[0]._id);
            if (res.data[0].roleId == 1) {
              let brokerObj: any = {
                _id: res.data[0]._id,
                name: res.data[0].name,
              };
              localStorage.setItem('broker', JSON.stringify(brokerObj));
              localStorage;
            } else {
              localStorage.removeItem('broker');
            }
            this.router.navigateByUrl('/dashboard');
          } else {
            this.toster.error('User not authorized');
            this.loader = false;
          }
        } else {
          this.toster.error(res.ErrorMessage);
          this.loader = false;
        }
      });
    }
  }
}

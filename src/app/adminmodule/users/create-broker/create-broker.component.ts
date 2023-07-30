import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { CommonService } from 'src/app/common.service';
@Component({
  selector: 'app-create-broker',
  templateUrl: './create-broker.component.html',
  styleUrls: ['./create-broker.component.css']
})
export class CreateBrokerComponent {
  creatBrokerForm:any=FormGroup;
  get f() { return this.creatBrokerForm.controls; }
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.com";
  nonWhitespaceRegExp: RegExp = new RegExp("\\S");
  alphabet = "^[a-zA-Z ]*$";
  constructor(private router: Router,private fb: FormBuilder,private service: CommonService,private toster: ToastrService) {}
ngOnInit(): void {
  this.creatBrokerForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.alphabet), Validators.pattern(this.nonWhitespaceRegExp)]],
    username: ['', [Validators.required, Validators.pattern(this.nonWhitespaceRegExp)]],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern),]],
    mobileno: ['', [Validators.required,Validators.pattern("^[0-9]*$")]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern(this.nonWhitespaceRegExp)]],
    gender: ['', [Validators.required]],
    isactive:['1'],
    countrycode:['91'],
    roleId:['1']
  })
}
createBroker(){
  if (this.creatBrokerForm.invalid) {
    this.creatBrokerForm.get('name').markAsTouched();
    this.creatBrokerForm.get('username').markAsTouched();
    this.creatBrokerForm.get('email').markAsTouched();
    this.creatBrokerForm.get('mobileno').markAsTouched();
    this.creatBrokerForm.get('password').markAsTouched();
    this.creatBrokerForm.get('gender').markAsTouched();
  } else {
    this.service.createBroker(this.creatBrokerForm.value).subscribe((res: any) => {
      if (res.ErrorCode == 200) {
        this.toster.success("Broker create successfully");
        this.router.navigateByUrl('/users');
      }else{
        this.toster.error(res.ErrorMessage);
      }
    })
  }

}
}

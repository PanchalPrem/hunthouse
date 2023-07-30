import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-edit-broker',
  templateUrl: './edit-broker.component.html',
  styleUrls: ['./edit-broker.component.css'],
})
export class EditBrokerComponent {
  id: any;
  updateBrokerForm: any = FormGroup;
  get f() {
    return this.updateBrokerForm.controls;
  }
  emailPattern = '^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.com';
  nonWhitespaceRegExp: RegExp = new RegExp('\\S');
  alphabet = '^[a-zA-Z ]*$';
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: CommonService,
    private toster: ToastrService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getBrokerDetails();
    this.updateBrokerForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(this.alphabet), Validators.pattern(this.nonWhitespaceRegExp)]],
      username: ['', [Validators.required, Validators.pattern(this.nonWhitespaceRegExp)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern),]],
      mobileno: ['', [Validators.required,Validators.pattern("^[0-9]*$")]],
      gender: ['', [Validators.required]],
      isactive:['1'],
      countrycode:['91'],
      _id:[this.id]
    })
  }
  getBrokerDetails(){
  this.service.getBrokerDetails(this.id).subscribe((res:any)=>{
    if (res.ErrorCode==200) {
      let details=res.data[0]
      this.updateBrokerForm = this.fb.group({
        name: [details.name],
        username: [details.username],
        email: [details.email],
        mobileno: [details.mobileno],
        gender: [details.gender],
        isactive:['1'],
        countrycode:['91'],
        _id:[this.id]

      })

    }else{
      this.toster.error(res.ErrorMessage)
    }
  console.log(res.data);


})
  }

  updateBroker(){
    if (this.updateBrokerForm.invalid) {
      this.updateBrokerForm.get('name').markAsTouched();
      this.updateBrokerForm.get('username').markAsTouched();
      this.updateBrokerForm.get('email').markAsTouched();
      this.updateBrokerForm.get('mobileno').markAsTouched();
      this.updateBrokerForm.get('password').markAsTouched();
      this.updateBrokerForm.get('gender').markAsTouched();
    } else {
      this.service.updateBroker(this.updateBrokerForm.value).subscribe((res: any) => {
        if (res.ErrorCode == 200) {
          this.toster.success("Broker update successfully");
          this.router.navigateByUrl('/users');
        }else{
          this.toster.error(res.ErrorMessage);
        }
      })
    }
  }
}

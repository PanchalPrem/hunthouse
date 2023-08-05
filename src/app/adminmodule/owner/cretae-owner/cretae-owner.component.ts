import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { CommonService } from 'src/app/common.service';
@Component({
  selector: 'app-cretae-owner',
  templateUrl: './cretae-owner.component.html',
  styleUrls: ['./cretae-owner.component.css']
})
export class CretaeOwnerComponent {

  creatOnwerForm:any=FormGroup;
  get f() { return this.creatOnwerForm.controls; }
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.com";
  nonWhitespaceRegExp: RegExp = new RegExp("\\S");
  alphabet = "^[a-zA-Z ]*$";
  constructor(private router: Router,private fb: FormBuilder,private service: CommonService,private toster: ToastrService) {}
ngOnInit(): void {
  this.creatOnwerForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.alphabet), Validators.pattern(this.nonWhitespaceRegExp)]],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern),]],
    number: ['', [Validators.required,Validators.pattern("^[0-9]*$")]],
  })
}

createOwner(){
  if (this.creatOnwerForm.invalid) {
    this.creatOnwerForm.get('name').markAsTouched();
    this.creatOnwerForm.get('email').markAsTouched();
    this.creatOnwerForm.get('number').markAsTouched();
  } else {
    this.service.createOnwer(this.creatOnwerForm.value).subscribe((res: any) => {
      if (res.ErrorCode == 200) {
        this.toster.success("Onwer create successfully");
        this.router.navigateByUrl('/owner');
      }else{
        this.toster.error(res.ErrorMessage);
      }
    })
  }

}

}

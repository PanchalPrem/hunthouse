import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { CommonService } from 'src/app/common.service';
@Component({
  selector: 'app-create-house',
  templateUrl: './create-house.component.html',
  styleUrls: ['./create-house.component.css']
})
export class CreateHouseComponent {
  createHouseForm:any=FormGroup;
  get f() { return this.createHouseForm.controls; }
  constructor(private router: Router,private fb: FormBuilder,private service: CommonService,private toster: ToastrService) {}
  ngOnInit(): void {
    this.createHouseForm = this.fb.group({
      name: ['', [Validators.required, ]],
      username: ['', [Validators.required, ]],
      email: ['', [Validators.required,]],
      mobileno: ['', [Validators.required,]],
      password: ['', [Validators.required,]],
      gender: ['', [Validators.required]],
      isactive:['1'],
      countrycode:['91'],
      roleId:['1']
    })

  }
  createBroker(){

  }
}

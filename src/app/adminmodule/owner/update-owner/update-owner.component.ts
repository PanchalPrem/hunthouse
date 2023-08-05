import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';
@Component({
  selector: 'app-update-owner',
  templateUrl: './update-owner.component.html',
  styleUrls: ['./update-owner.component.css'],
})
export class UpdateOwnerComponent {
  updateOnwerForm: any = FormGroup;
  get f() {
    return this.updateOnwerForm.controls;
  }
  emailPattern = '^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.com';
  nonWhitespaceRegExp: RegExp = new RegExp('\\S');
  alphabet = '^[a-zA-Z ]*$';
  routeId: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: CommonService,
    private toster: ToastrService
  ) {}
  ngOnInit(): void {
    this.routeId = this.route.snapshot.params['id'];
    this.getDateById();
    this.updateOnwerForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(this.alphabet),
          Validators.pattern(this.nonWhitespaceRegExp),
        ],
      ],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      number: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      _id: [this.routeId],
    });
  }

  getDateById() {
    this.service.getAllDetailsById(this.routeId).subscribe((res: any) => {
      this.updateOnwerForm = this.fb.group({
        name: [
          res.data[0].name,
          [
            Validators.required,
            Validators.pattern(this.alphabet),
            Validators.pattern(this.nonWhitespaceRegExp),
          ],
        ],
        email: [
          res.data[0].email,
          [Validators.required, Validators.pattern(this.emailPattern)],
        ],
        number: [res.data[0].number, [Validators.required, Validators.pattern('^[0-9]*$')]],
        _id: [this.routeId],
      });
    });
  }

  updateOwner() {
    if (this.updateOnwerForm.invalid) {
      this.updateOnwerForm.get('name').markAsTouched();
      this.updateOnwerForm.get('email').markAsTouched();
      this.updateOnwerForm.get('number').markAsTouched();
    } else {
      this.service
        .updateOnwer(this.updateOnwerForm.value)
        .subscribe((res: any) => {
          if (res.ErrorCode == 200) {
            this.toster.success('Onwer update successfully');
            this.router.navigateByUrl('/owner');
          } else {
            this.toster.error(res.ErrorMessage);
          }
        });
    }
  }
}

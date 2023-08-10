import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';
@Component({
  selector: 'app-update-house',
  templateUrl: './update-house.component.html',
  styleUrls: ['./update-house.component.css'],
})
export class UpdateHouseComponent {
  updateHouseForm: any = FormGroup;
  selectedFiles: any = [];
  brokerData: any = [];
  categoryData: any = [];
  ownerData: any = [];
  houseImages: any = [];
  routeId: any;
  get f() {
    return this.updateHouseForm.controls;
  }
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: CommonService,
    private toster: ToastrService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.routeId = this.route.snapshot.params['id'];
    this.getHouseDetailsById();
    this.getBrokerData();
    this.getcategory();
    this.getOwner();
    this.updateHouseForm = this.fb.group({
      brokerId: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      ownerId: ['', [Validators.required]],
      configuration: ['', [Validators.required]],
      rent: ['', [Validators.required]],
      area: ['', [Validators.required]],
      address: ['', [Validators.required]],
      furnishing: ['', [Validators.required]],
      availableFor: ['', [Validators.required]],
      availableFrom: ['', [Validators.required]],
      postedByandOn: ['', [Validators.required]],
      totalFloors: ['', [Validators.required]],
      facing: ['', [Validators.required]],
      flooring: ['', [Validators.required]],
      parking: ['', [Validators.required]],
      rentAgreementDuration: ['', [Validators.required]],
      monthsOfNotice: ['', [Validators.required]],
      electricityWaterCharges: ['', [Validators.required]],
      powerBackup: ['', [Validators.required]],
      propertyAge: ['', [Validators.required]],
      propertyCode: ['', [Validators.required]],
      aboutProperty: ['', [Validators.required]],
      status: [1],
    });
  }
  UpdateHouse() {
    let data = {
      brokerId: this.updateHouseForm.value.brokerId,
      categoryId: this.updateHouseForm.value.categoryId,
      ownerId: this.updateHouseForm.value.ownerId,
      configuration: this.updateHouseForm.value.configuration,
      rent: this.updateHouseForm.value.rent,
      area: this.updateHouseForm.value.area,
      address: this.updateHouseForm.value.address,
      furnishing: this.updateHouseForm.value.furnishing,
      availableFor: this.updateHouseForm.value.availableFor,
      availableFrom: this.updateHouseForm.value.availableFrom,
      postedByandOn: this.updateHouseForm.value.postedByandOn,
      totalFloors: this.updateHouseForm.value.totalFloors,
      facing: this.updateHouseForm.value.facing,
      flooring: this.updateHouseForm.value.flooring,
      parking: this.updateHouseForm.value.parking,
      rentAgreementDuration: this.updateHouseForm.value.rentAgreementDuration,
      monthsOfNotice: this.updateHouseForm.value.monthsOfNotice,
      electricityWaterCharges:
        this.updateHouseForm.value.electricityWaterCharges,
      powerBackup: this.updateHouseForm.value.powerBackup,
      propertyAge: this.updateHouseForm.value.propertyAge,
      propertyCode: this.updateHouseForm.value.propertyCode,
      aboutProperty: this.updateHouseForm.value.aboutProperty,
      status: 1,
      _id: this.routeId,
    };
    if (this.updateHouseForm.invalid) {
      this.updateHouseForm.get('brokerId').markAsTouched();
      this.updateHouseForm.get('categoryId').markAsTouched();
      this.updateHouseForm.get('ownerId').markAsTouched();
      this.updateHouseForm.get('configuration').markAsTouched();
      this.updateHouseForm.get('rent').markAsTouched();
      this.updateHouseForm.get('area').markAsTouched();
      this.updateHouseForm.get('address').markAsTouched();
      this.updateHouseForm.get('furnishing').markAsTouched();
      this.updateHouseForm.get('availableFor').markAsTouched();
      this.updateHouseForm.get('availableFrom').markAsTouched();
      this.updateHouseForm.get('postedByandOn').markAsTouched();
      this.updateHouseForm.get('totalFloors').markAsTouched();
      this.updateHouseForm.get('facing').markAsTouched();
      this.updateHouseForm.get('flooring').markAsTouched();
      this.updateHouseForm.get('parking').markAsTouched();
      this.updateHouseForm.get('rentAgreementDuration').markAsTouched();
      this.updateHouseForm.get('monthsOfNotice').markAsTouched();
      this.updateHouseForm.get('electricityWaterCharges').markAsTouched();
      this.updateHouseForm.get('powerBackup').markAsTouched();
      this.updateHouseForm.get('propertyAge').markAsTouched();
      this.updateHouseForm.get('propertyCode').markAsTouched();
      this.updateHouseForm.get('aboutProperty').markAsTouched();
    } else {
      this.service.updateHouse(data).subscribe((res: any) => {
        if (res.ErrorCode == 200) {
          this.toster.success('House update successfully');
          this.router.navigateByUrl('/house');
        } else {
          this.toster.error(res.ErrorMessage);
        }
      });
    }
  }
  // onFileSelected(event: any) {
  //   if (event.target.files && event.target.files.length > 0) {
  //     const files: File[] = event.target.files;
  //    this.houseImages=files;
  //     for (const file of files) {
  //       const reader = new FileReader();
  //       reader.onload = (e: any) => {
  //         this.selectedFiles.push(e.target.result);
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   }
  // }

  getHouseDetailsById() {
    this.service.getHouseDetailsById(this.routeId).subscribe((res: any) => {
      console.log(res.data);
      this.updateHouseForm = this.fb.group({
        brokerId: [res.data[0].brokerId, [Validators.required]],
        categoryId: [res.data[0].categoryId, [Validators.required]],
        ownerId: [res.data[0].ownerId, [Validators.required]],
        configuration: [res.data[0].configuration, [Validators.required]],
        rent: [res.data[0].rent, [Validators.required]],
        area: [res.data[0].area, [Validators.required]],
        address: [res.data[0].address, [Validators.required]],
        furnishing: [res.data[0].furnishing, [Validators.required]],
        availableFor: [res.data[0].availableFor, [Validators.required]],
        availableFrom: [res.data[0].availableFrom, [Validators.required]],
        postedByandOn: [res.data[0].postedByandOn, [Validators.required]],
        totalFloors: [res.data[0].totalFloors, [Validators.required]],
        facing: [res.data[0].facing, [Validators.required]],
        flooring: [res.data[0].flooring, [Validators.required]],
        parking: [res.data[0].parking, [Validators.required]],
        rentAgreementDuration: [
          res.data[0].rentAgreementDuration,
          [Validators.required],
        ],
        monthsOfNotice: [res.data[0].monthsOfNotice, [Validators.required]],
        electricityWaterCharges: [
          res.data[0].electricityWaterCharges,
          [Validators.required],
        ],
        powerBackup: [res.data[0].powerBackup, [Validators.required]],
        propertyAge: [res.data[0].propertyAge, [Validators.required]],
        propertyCode: [res.data[0].propertyCode, [Validators.required]],
        aboutProperty: [res.data[0].aboutProperty, [Validators.required]],
        status: [1],
      });
    });
  }
  getBrokerData() {
    this.service.getBrokerList().subscribe((res: any) => {
      this.brokerData = res.data;
    });
  }

  getcategory() {
    this.service.getcategoey().subscribe((res: any) => {
      this.categoryData = res.data;
    });
  }

  getOwner() {
    this.service.getAllOwner().subscribe((res: any) => {
      this.ownerData = res.data;
    });
  }
}

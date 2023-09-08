import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';
@Component({
  selector: 'app-create-house',
  templateUrl: './create-house.component.html',
  styleUrls: ['./create-house.component.css'],
})
export class CreateHouseComponent {
  createHouseForm: any = FormGroup;
  selectedFiles: any = [];
  brokerData: any = [];
  categoryData: any = [];
  ownerData: any = [];
  houseImages: any = [];
  isCheckBroker: any;
  get f() {
    return this.createHouseForm.controls;
  }
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: CommonService,
    private toster: ToastrService
  ) {}
  ngOnInit(): void {
    this.createHouseForm = this.fb.group({
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
      houseName: ['', [Validators.required]],
      status: [1],
    });
    this.isCheckBroker = localStorage.getItem('broker');
    if (this.isCheckBroker == null) {
      this.getBrokerData();
    } else {
      console.log(this.isCheckBroker);
      let data: any = JSON.parse(this.isCheckBroker);
      this.brokerData = [data];
      console.log(this.brokerData);
    }

    this.getcategory();
    this.getOwner();
  }
  createHouse() {
    const formData = new FormData();
    for (let i = 0; i < this.houseImages.length; i++) {
      formData.append('images', this.houseImages[i]);
    }
    formData.append('brokerId', this.createHouseForm.value.brokerId);
    formData.append('categoryId', this.createHouseForm.value.categoryId);
    formData.append('ownerId', this.createHouseForm.value.ownerId);
    formData.append('configuration', this.createHouseForm.value.configuration);
    formData.append('rent', this.createHouseForm.value.rent);
    formData.append('area', this.createHouseForm.value.area);
    formData.append('address', this.createHouseForm.value.address);
    formData.append('furnishing', this.createHouseForm.value.furnishing);
    formData.append('availableFor', this.createHouseForm.value.availableFor);
    formData.append('availableFrom', this.createHouseForm.value.availableFrom);
    formData.append('postedByandOn', this.createHouseForm.value.postedByandOn);
    formData.append('totalFloors', this.createHouseForm.value.totalFloors);
    formData.append('facing', this.createHouseForm.value.facing);
    formData.append('flooring', this.createHouseForm.value.flooring);
    formData.append('parking', this.createHouseForm.value.parking);
    formData.append(
      'rentAgreementDuration',
      this.createHouseForm.value.rentAgreementDuration
    );
    formData.append(
      'monthsOfNotice',
      this.createHouseForm.value.monthsOfNotice
    );
    formData.append(
      'electricityWaterCharges',
      this.createHouseForm.value.electricityWaterCharges
    );
    formData.append('powerBackup', this.createHouseForm.value.powerBackup);
    formData.append('propertyAge', this.createHouseForm.value.propertyAge);
    formData.append('propertyCode', this.createHouseForm.value.propertyCode);
    formData.append('aboutProperty', this.createHouseForm.value.aboutProperty);
    formData.append('status', '1');
    if (this.createHouseForm.invalid) {
      this.createHouseForm.get('brokerId').markAsTouched();
      this.createHouseForm.get('categoryId').markAsTouched();
      this.createHouseForm.get('ownerId').markAsTouched();
      this.createHouseForm.get('configuration').markAsTouched();
      this.createHouseForm.get('rent').markAsTouched();
      this.createHouseForm.get('area').markAsTouched();
      this.createHouseForm.get('address').markAsTouched();
      this.createHouseForm.get('furnishing').markAsTouched();
      this.createHouseForm.get('availableFor').markAsTouched();
      this.createHouseForm.get('availableFrom').markAsTouched();
      this.createHouseForm.get('postedByandOn').markAsTouched();
      this.createHouseForm.get('totalFloors').markAsTouched();
      this.createHouseForm.get('facing').markAsTouched();
      this.createHouseForm.get('flooring').markAsTouched();
      this.createHouseForm.get('parking').markAsTouched();
      this.createHouseForm.get('rentAgreementDuration').markAsTouched();
      this.createHouseForm.get('monthsOfNotice').markAsTouched();
      this.createHouseForm.get('electricityWaterCharges').markAsTouched();
      this.createHouseForm.get('powerBackup').markAsTouched();
      this.createHouseForm.get('propertyAge').markAsTouched();
      this.createHouseForm.get('propertyCode').markAsTouched();
      this.createHouseForm.get('aboutProperty').markAsTouched();
    } else {
      this.service.createHouse(formData).subscribe((res: any) => {
        if (res.ErrorCode == 200) {
          console.log('1', res);
          this.toster.success('House create successfully');
          this.router.navigateByUrl('/house');
        } else {
          this.toster.error(res.ErrorMessage);
        }
      });
    }
  }
  onFileSelected(event: any) {
    // this.selectedFiles = event.target.files;
    if (event.target.files && event.target.files.length > 0) {
      const files: File[] = event.target.files;
      this.houseImages = files;
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedFiles.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
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

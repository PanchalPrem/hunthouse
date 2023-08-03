import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import {
  NgbActiveModal,
  NgbModal,
  NgbModalConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [NgbModalConfig, NgbModal, NgbActiveModal],
})
export class CategoryComponent {
  modalReference: any;
  createCategoryForm: any = FormGroup;
  updateCategoryForm: any = FormGroup;
  cateID: any;
  get f() {
    return this.createCategoryForm.controls;
  }
  get g() {
    return this.updateCategoryForm.controls;
  }
  @ViewChild('content1') content1!: ElementRef;
  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private service: CommonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getcategoryData();
    this.createCategoryForm = this.fb.group({
      name: ['', Validators.required],
    });

    this.updateCategoryForm = this.fb.group({
      name: ['', Validators.required],
    });

    $(document).on('click', '#editCategory', ($event: any) => {
      this.modalService.open(this.content1);
      this.getcatById($event.target.value);
    });
    $(document).on('click', '#deleteCategory', ($event: any) => {
      this.deleteCategory($event.target.value);
    });
  }
  openXl(content: any) {
    this.modalReference = this.modalService.open(content, {
      size: 'xl',
      backdrop: 'static',
    });
  }
  openXl1(content: any) {
    this.modalReference = this.modalService.open(content, {
      size: 'xl',
      backdrop: 'static',
    });
  }
  createCategory() {
    if (this.createCategoryForm.invalid) {
      this.createCategoryForm.get('name').markAsTouched();
    } else {
      let data = { name: this.createCategoryForm.value.name, status: 1 };
      this.service.createCategory(data).subscribe((res: any) => {
        if (res.ErrorCode == 200) {
          this.toastr.success('Category Create Successfully');
          this.createCategoryForm.reset();
          this.getcategoryData();
        } else {
          this.toastr.error('Something want wrong');
        }
      });
    }
  }

  getcategoryData() {
    this.service.getcategoey().subscribe((res: any) => {
      if (res.ErrorCode == 200) {
        this.allCategory(res.data);
      } else {
        this.toastr.success('Something want wrong');
      }
      console.log(res);
    });
  }

  allCategory(data1: any) {
    $('#myTable').DataTable({
      destroy: true,
      data: data1,
      columns: [
        {
          data: null,
          render: function (data: any, type: any, item: any, meta: any) {
            return meta.row + 1;
          },
        },
        { data: 'name' },
        {
          data: 'status',
          render: function (data: any, type: any, item: any, meta: any) {
            if (data == 1) {
              var status = `<span class="alarm_1 alarm_2"><span class="crcll" style="background: #4ba700;"></span></span>`;
            } else {
              var status = `<span class="alarm_1 alarm_2"><span class="crcll" style="background: #f00;"></span></span>`;
            }
            return status;
          },
        },
        {
          data: '_id',
          render: function (data: any, type: any, item: any, meta: any) {
            return `<button class="btn btn_theme" id="editCategory" value=${data}  >Edit</button>
        <button  class="btn btn_theme" id="deleteCategory" value=${data}  style="background: #f00;" >Delete</button>`;
          },
        },
      ],
      columnDefs: [{ className: 'text-center', targets: [0, 1, 2, 3] }],
    });
  }

  deleteCategory(id: any) {
    let data: any = { _id: id };
    console.log(data);

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this category',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // this.service.deleteCategory(id).subscribe((res: any) => {
        //   if (res.ErrorCode == 200) {
        //     this.getCategory();
        //     this.toster.success("Delete Successfully")
        //   }
        // })
      }
    });
  }
  getcatById(id: any) {
    this.service.getCategoryById(id).subscribe((res: any) => {
      this.cateID = res.data[0]._id;
      this.updateCategoryForm = this.fb.group({
        name: [res.data[0].name, Validators.required],
      });
    });
  }

  updateCategory() {
    if (this.updateCategoryForm.invalid) {
      this.updateCategoryForm.get('name').markAsTouched();
    } else {
      let data = {
        name: this.updateCategoryForm.value.name,
        status: 1,
        _id: this.cateID,
      };
      this.service.updateCategory(data).subscribe((res: any) => {
        if (res.ErrorCode == 200) {
          this.toastr.success('Category Update Successfully');
          this.updateCategoryForm.reset();
          this.getcategoryData();
        } else {
          this.toastr.error('Something want wrong');
        }
      });
    }
  }
}

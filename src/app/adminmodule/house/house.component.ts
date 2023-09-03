import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/common.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css'],
})
export class HouseComponent {
  constructor(
    private service: CommonService,
    private router: Router,
    private toster: ToastrService
  ) {}
  ngOnInit(): void {
    this.getAllHouse();
    $('#myTable').on('click', '#removeHouse', ($event: any) => {
      this.deleteHouse($event.target.value);
    });
    $('#myTable').on('click', '#updateHouse', ($event: any) => {
      this.router.navigateByUrl('/updatehouse/' + $event.target.value);
    });
  }

  getAllHouse() {
    this.service.getAllHouse().subscribe((res: any) => {
      this.datatable(res.data);
    });
  }
  datatable(value: any) {
    $('#myTable').DataTable({
      data: value,
      destroy: true,
      columns: [
        {
          data: null,
          render: function (data: any, type: any, item: any, meta: any) {
            return meta.row + 1;
          },
        },
        { data: 'address' },
        { data: 'availableFor' },
        { data: 'availableFrom' },
        { data: 'rent' },
        {
          data: '_id',
          render: function (data: any, type: any, item: any, meta: any) {
            return `<button class="fa fa-trash" style="color: red;font-size: 20px;background: none;border: none;" id="removeHouse" value=${data}></button> &nbsp;&nbsp;
          <button class="fa fa-edit"  style="color: blue; font-size:20px;background: none;border: none;" id="updateHouse" value=${data} ></button>`;
          },
        },
      ],
    });
  }
  deleteHouse(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't to delete this house",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteHouse(id).subscribe((res: any) => {
          if (res.ErrorCode == 200) {
            this.toster.success('House deleted successfully');
            this.getAllHouse()
          } else {
            this.toster.error('Something want wrong');
          }
        });
      }
    })

  }
}

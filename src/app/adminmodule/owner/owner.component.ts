import { Component } from '@angular/core';
import { CommonService } from './../../common.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;
import Swal from 'sweetalert2';
@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css'],
})
export class OwnerComponent {
  constructor(
    private service: CommonService,
    private router: Router
  ) {}
  allUsersList: any = [];
  ngOnInit(): void {
    this.getOwner();
    $('#myTable').on('click', '#removeBro', ($event: any) => {
      // this.deleteBroker($event.target.value);
    });
    $('#myTable').on('click', '#updatebro', ($event: any) => {
      this.router.navigateByUrl('/updateowner/'+$event.target.value)
    });
  }
  getOwner() {
    this.service.getAllOwner().subscribe((res: any) => {
      if (res.ErrorCode == 200) {
        this.allUsersList = res.data;
        this.datatable(this.allUsersList);
      }
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
        { data: 'name' },
        { data: 'email' },
        { data: 'number' },
        {
          data: '_id',
          render: function (data: any, type: any, item: any, meta: any) {
            return `<button class="fa fa-trash" style="color: red;font-size: 20px;background: none;border: none;" id="removeBro" value=${data}></button> &nbsp;&nbsp;
            <button class="fa fa-edit"  style="color: blue; font-size:20px;background: none;border: none;" id="updatebro" value=${data} ></button>`;
          },
        },
      ],
    });
  }


}

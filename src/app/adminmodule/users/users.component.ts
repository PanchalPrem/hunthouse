import { Component } from '@angular/core';
import { CommonService } from './../../common.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  loginRole: any = localStorage.getItem('role');

  constructor(
    private toastr: ToastrService,
    private service: CommonService,
    private toster: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  allUsersList: any = [];
  ngOnInit(): void {
    this.getBroker();
    $('#myTable').on('click', '#removeBro', ($event: any) => {
      this.deleteBroker($event.target.value);
    });
    $('#myTable').on('click', '#updatebro', ($event: any) => {
      this.router.navigateByUrl('/update-broker/'+$event.target.value)
    });
  }

  getBroker() {
    this.service.getBrokerList().subscribe((res: any) => {
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
        { data: 'username' },
        { data: 'mobileno' },
        {
          data: '_id',
          render: function (data: any, type: any, item: any, meta: any) {
            return `<button class="fa fa-trash" style="color: red;font-size: 20px;background: none;border: none;" id="removeBro" value=${data}></button>
            &nbsp;&nbsp;
            <button class="fa fa-edit"  style="color: blue; font-size:20px;background: none;border: none;" id="updatebro" value=${data} ></button>`;
          },
        },
      ],
    });
  }

  deleteBroker(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete broker',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteBroker(id).subscribe((res: any) => {
          if (res.ErrorCode == 200) {
            this.getBroker();
            this.toster.success("Broker delete successfully.")
          }
        })
      }
    });
  }
}


import { CommonService } from 'src/app/common.service';
import { Component } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {

  constructor(private service: CommonService) {}


  ngOnInit(): void {
    this.getUserList();
  }
getUserList() {
  this.service.userList().subscribe((res: any) => {
      if (res.ErrorCode == 200) {
          this.datatable(res.data);
      }
    });
  }
 async datatable(value: any) {
  await $('#myTable1').DataTable({
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
        { data: 'mobileno' },
        { data: 'email' },
        { data: 'gender' },
      ],
    });
  }
}

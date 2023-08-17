import { Component } from '@angular/core';
import { CommonService } from 'src/app/common.service';
declare var $:any
@Component({
  selector: 'app-user-inquiry',
  templateUrl: './user-inquiry.component.html',
  styleUrls: ['./user-inquiry.component.css'],
})
export class UserInquiryComponent {
  constructor(private service: CommonService) {}
  ngOnInit(): void {
    this.userInquiry();

  }
   userInquiry() {
    this.service.userInquiryList().subscribe((res: any) => {
        if (res.ErrorCode == 200) {
console.log(res.data)
          this.datatable(res.data);
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
          {data:'message'},
          {data: 'createdAt',
          "render": function (data:any) {
            var date = new Date(data);
            var month = date.getMonth() + 1;
            return date.getDate() + "/" + (   month.toString().length > 1 ? month : "0" + month) + "/" + date.getFullYear();
        }
        },
      ]
      });
    }
}

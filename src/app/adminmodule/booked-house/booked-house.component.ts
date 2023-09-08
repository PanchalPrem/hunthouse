import { CommonService } from 'src/app/common.service';
import { Component } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-booked-house',
  templateUrl: './booked-house.component.html',
  styleUrls: ['./booked-house.component.css']
})
export class BookedHouseComponent {
  bookedhouse:any=[]
  constructor(private service:CommonService) {}
  ngOnInit(): void {
    this.getHouseBooked();

  }
  getHouseBooked(){
    this.service.bookedHouseList().subscribe((res:any)=>{
      if (res.ErrorCode == 200) {
        // this.bookedhouse = res.data;
        this.datatable([res.data]);
      }

    })
  }
  datatable(value: any) {
    $('#myTable1').DataTable({
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

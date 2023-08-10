import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';

declare var $:any;
@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css'],
})
export class HouseComponent {
  constructor(private service: CommonService, private router:Router) {}
  ngOnInit(): void {
    this.getAllHouse();
    $('#myTable').on('click', '#removeHouse', ($event: any) => {
    });
    $('#myTable').on('click', '#updateHouse', ($event: any) => {
      this.router.navigateByUrl('/updatehouse/'+$event.target.value)
    });
  }

getAllHouse(){
  this.service.getAllHouse().subscribe((res:any)=>{
    console.log(res);
    this.datatable(res.data);
  })
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


}

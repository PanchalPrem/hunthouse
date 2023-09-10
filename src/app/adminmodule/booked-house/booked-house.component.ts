import { CommonService } from 'src/app/common.service';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-booked-house',
  templateUrl: './booked-house.component.html',
  styleUrls: ['./booked-house.component.css'],
})
export class BookedHouseComponent {
  bookedhouse: any = [];
  constructor(private service: CommonService,private toster:ToastrService) {}
  ngOnInit(): void {
    this.getHouseBooked();
    $(document).on('click', '#Accept_Reject', ($event: any) => {
      this.acceptRej($event.target.value);
    });
    $(document).on('click', '#relese', ($event: any) => {
      this.callAcceptReject(3,$event.target.value);
    });
  }
  getHouseBooked() {
    this.service.bookedHouseList().subscribe((res: any) => {
      if (res.ErrorCode == 200) {
        // this.bookedhouse = res.data;
        this.datatable(res.data);
      }
    });
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
        { data: 'houseDetails.houseName' },
        { data: 'houseDetails.area' },
        { data: 'houseDetails.address' },
        {
          data: '_id',
          render: function (data: any, type: any, item: any, meta: any) {
            console.log(item);
            if (item.status==0) {
              return `<button class="btn btn_theme" id="Accept_Reject" value=${data},${item.houseDetails._id}  >Accept & Reject</button>
                <button  class="btn btn_theme" id="relese" value=${data},${item.houseDetails._id}  style="background: #f00;" >Relese</button>`;
            }else if(item.status==1){
              return `<button  class="btn btn_theme" id="relese" value=${data},${item.houseDetails._id}  style="background: #f00;" >Relese</button>`
            }else{
              return 'Setteled'

            }
          },
        },
      ],
      columnDefs: [
        { className: 'text-center', targets: [4] },
      ]

    });
  }
  acceptRej(val: any) {
    Swal.fire({
      // title: 'Are you sure?',
      // text: "You won't be able to revert this!",
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Reject',
      confirmButtonText: 'Accept',
    }).then((result) => {
      if (result.isConfirmed) {
        this.callAcceptReject(1, val);
      } else {
        this.callAcceptReject(2, val);
      }
    });
  }
  callAcceptReject(status: any, id: any) {
    let ids = id.split(',');
    let data = {
      status: status,
      _id: ids[0],
      houseId: ids[1],
    };
    this.service.AcceptReject(data).subscribe((res:any)=>{
      if (res.ErrorCode==200) {
        this.getHouseBooked();
        status==1||2? this.toster.success(`House ${status==1?'Accepet':'reject'} successfully`):this.toster.success(`House reles successfully`)
      }
    })
  }

}

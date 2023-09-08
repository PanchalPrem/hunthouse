import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/common.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  loginRole: any = localStorage.getItem('role');
  earnings: any;
  dashboardData: any = [];
  isCheckBroker:any
  constructor(
    private router: Router,
    private service: CommonService,
    private route: ActivatedRoute
  ) {}
  alldata: any = [];
  ngOnInit(): void {
    this.isCheckBroker = localStorage.getItem('broker');
    this.service.getAuth();
    this.getDetails();
  }
  getDetails() {
    this.service.dashBoardCount().subscribe((res: any) => {
      this.dashboardData = res;
    });
  }
}

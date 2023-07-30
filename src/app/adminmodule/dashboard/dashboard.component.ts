import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from './../../common.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loginRole: any = localStorage.getItem("role");
  earnings: any;
  constructor(private router: Router, private service: CommonService, private route: ActivatedRoute) { }
  alldata: any = []
  ngOnInit(): void {

  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute, private service: CommonService) { }
  urlpath: any;
  adminList: any = [
    { icon: "fa fa-dashboard", name: "Dashboard", path: "/dashboard", },
    { icon: "fa fa-users fa-fw", name: "Broker", path: "/users",  },
    { icon: "fa fa-sign-out", name: "Logout", path: "", class:'logout' }
  ]
  ngOnInit(): void {
    this.urlpath = '/' + this.route.snapshot.routeConfig?.path
  }
  routeNow(path: any) {
        this.router.navigateByUrl("/" + path);
  }
}

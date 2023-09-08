import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: CommonService
  ) {}
  urlpath: any;
  isCheckBroker: any;
  sideMenu: any = [];
  adminList: any = [
    { icon: 'fa fa-dashboard', name: 'Dashboard', path: '/dashboard' },
    { icon: 'fa fa-users fa-fw', name: 'Broker', path: '/users' },
    { icon: '	fa fa-bars', name: 'Category', path: '/category' },
    { icon: '	fa fa-user', name: 'Owner', path: '/owner' },
    { icon: '	fa fa-home', name: 'House', path: '/house' },
    { icon: '	fa fa-question', name: 'Inquiry', path: '/inquiry' },
    { icon: '	fa fa-user', name: 'User', path: '/user' },
    { icon: '	fa fa-tasks', name: 'Booked House', path: '/booked-house' },
    // { icon: "fa fa-sign-out", name: "Logout", path: "", class:'logout' }
    { icon: 'fa fa-sign-out', name: 'Logout', path: '' },
  ];
  brokerList: any = [
    { icon: 'fa fa-dashboard', name: 'Dashboard', path: '/dashboard' },
    { icon: '	fa fa-bars', name: 'Category', path: '/category' },
    { icon: '	fa fa-user', name: 'Owner', path: '/owner' },
    { icon: '	fa fa-home', name: 'House', path: '/house' },
    { icon: '	fa fa-user', name: 'User', path: '/user' },
    { icon: '	fa fa-tasks', name: 'Booked House', path: '/booked-house' },
    { icon: 'fa fa-sign-out', name: 'Logout', path: '' },
  ];
  ngOnInit(): void {
    this.urlpath = '/' + this.route.snapshot.routeConfig?.path;
    this.isCheckBroker = localStorage.getItem('broker');
    this.isCheckBroker == null
      ? (this.sideMenu = this.adminList)
      : (this.sideMenu = this.brokerList);
  }
  routeNow(path: any) {
    this.router.navigateByUrl('/' + path);
  }
}

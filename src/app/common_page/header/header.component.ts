import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  usersRole: any = localStorage.getItem('role')

  constructor(private router: Router, private service: CommonService) { }
  getWalletAmount: any = 0
  ngOnInit(): void {

  }
  Logout() {
    sessionStorage.removeItem('id')

    localStorage.clear();
    this.router.navigateByUrl('')

  }

}

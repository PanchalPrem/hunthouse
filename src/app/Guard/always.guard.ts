import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlwaysGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate() {
    // var role = '' + localStorage.getItem('role')

    if (localStorage.getItem('_id')) {
      //this.router.navigateByUrl("/dashboard")
      return true;
    }
    else {
      this.router.navigateByUrl("/")
      return false
    }

  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  url: any = 'https://astroshines.com:6001/';
  token: any = localStorage.getItem('token');
  authkey: any = localStorage.getItem('authkey');

  constructor(private http: HttpClient) {}
  ngOnInit(): void {}
  header: any = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
    .set('authkey', '' + localStorage.getItem('authKey'));

  loginUser(data: any) {
    return this.http.post<any>(this.url + 'admin-sign-in', data);
  }
  // broker api
  createBroker(data: any) {
    return this.http.post<any>(this.url + 'create-broker', data, {
      headers: this.header,
    });
  }

  getBrokerList() {
    return this.http.get<any>(this.url + 'broker-list', {
      headers: this.header,
    });
  }

  deleteBroker(data: any) {
    return this.http.delete<any>(this.url + 'delete-broker?_id=' + data, {
      headers: this.header,
    });
  }

  getBrokerDetails(data: any) {
    return this.http.get<any>(this.url + 'broker-details?_id=' + data, {
      headers: this.header,
    });
  }

  updateBroker(data: any) {
    return this.http.post<any>(this.url + 'update-broker', data, {
      headers: this.header,
    });
  }
  // broker api

  //category start
  createCategory(data: any) {
    return this.http.post<any>(this.url + 'admin-create-category', data, {
      headers: this.header,
    });
  }

  getcategoey() {
    return this.http.get<any>(this.url + 'category-list?status', {
      headers: this.header,
    });
  }

  getCategoryById(data: any) {
    return this.http.get<any>(this.url + 'admin-category-details?_id=' + data, {
      headers: this.header,
    });
  }

  updateCategory(data: any) {
    return this.http.post<any>(this.url + 'admin-update-category', data, {
      headers: this.header,
    });
  }
  //category end ----------------------------------------------------

  // Onwer start

  getAllOwner() {
    return this.http.get<any>(this.url + 'owner-list', {
      headers: this.header,
    });
  }

  createOnwer(data: any) {
    return this.http.post<any>(this.url + 'create-owner', data, {
      headers: this.header,
    });
  }

  updateOnwer(data: any) {
    return this.http.post<any>(this.url + 'update-owner', data, {
      headers: this.header,
    });
  }

  getAllDetailsById(id:any) {
    return this.http.get<any>(this.url + 'owner-detail?_id='+id, {
      headers: this.header,
    });
  }

  // Owner end ------------------------------------------------------
}

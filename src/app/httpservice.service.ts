import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  constructor(private http: HttpClient) { }
  baseUrl = 'https://reqres.in/api/';

  getAllUsers() {
    return this.http.get(`${this.baseUrl}users?page=2`);
  }
  loginUser(creds: any) {
    return this.http.post(`${this.baseUrl}login`, creds);
  }
  editUser(id: number, data: any) {
    return this.http.patch(`${this.baseUrl}users/${id}`, { data });
  }
}

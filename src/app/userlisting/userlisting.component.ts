import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpserviceService } from '../httpservice.service';
import { NgxSpinnerService } from 'ngx-spinner';

export interface User {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  avatar: string
}

@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrls: ['./userlisting.component.scss']
})
export class UserlistingComponent implements OnInit {

  constructor(private httpService: HttpserviceService, private router: Router, private spinner: NgxSpinnerService) { }
  userList: User[] = [];
  currentUser: any = {};
  eUser: any = {};

  ngOnInit(): void {
    this.spinner.show();
    this.httpService.getAllUsers().subscribe((data: any) => {
      this.spinner.hide();
      this.userList = data.data;
    }, err => {
      this.spinner.hide();
      window.alert('Sorry, facing some technical issues.')
    })
  }
  viewDetails(user: User) {
    this.currentUser = user;
  }
  editUser(user: User) {
    this.eUser = user;
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

}

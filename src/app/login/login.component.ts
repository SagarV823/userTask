import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpserviceService } from '../httpservice.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  constructor(private router: Router, private httpService: HttpserviceService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  onSubmit() {
    this.spinner.show();
    this.httpService.loginUser(this.loginForm.value).subscribe(
      (data: any) => {
        this.spinner.hide();
        localStorage.setItem('token', data?.token?.toString());
        this.router.navigateByUrl('/userlisting');
      }, err => {
        this.spinner.hide();
        window.alert('Wrong credentials!')
        console.log('error');
      })
  }


}

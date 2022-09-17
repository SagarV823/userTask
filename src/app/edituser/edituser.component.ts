import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpserviceService } from '../httpservice.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit, OnChanges {

  editForm = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    job: new FormControl('', [Validators.required])
  });
  constructor(private httpService: HttpserviceService, private spinner: NgxSpinnerService) { }

  @Input() user: any;
  saved: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    this.editForm.patchValue({
      first_name: this.user.first_name,
      last_name: this.user.last_name,
      email: this.user.email,
      job: ''
    })
    this.saved = false;
  }

  ngOnInit() {

  }

  onSubmit() {
    this.spinner.show();
    const obj = {
      name: this.editForm.controls.first_name.value + '' + this.editForm.controls.last_name.value,
      job: this.editForm.controls.job.value
    }
    this.httpService.editUser(this.user.id, obj).subscribe(
      data => {
        this.spinner.hide();
        console.log(data)
        this.saved = true;
      },
      err => {
        this.spinner.hide();
        console.log(err);
        window.alert('sorry, technical error!')
      });
  }

}

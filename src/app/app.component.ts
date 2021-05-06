import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from './app.service';
type Moment = moment.Moment;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  sessionData = [];
  dataFetched = false;
  vaccinationCenter: FormGroup;

  constructor(private readonly fb: FormBuilder,
    private readonly service: AppService) { }

  ngOnInit() {
    this.vaccinationCenter = this.fb.group({
      pin: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
      date: new FormControl({ startDate: moment(), endDate: moment() }),
    })
  }

  getCurrentDate = () => {
    return moment();
  }

  findVaccinationCenter = () => {
    this.sessionData = [];
    let data = this.vaccinationCenter.getRawValue();
    console.log(data)
    let params = `?pincode=${data.pin}&date=${data.date.startDate.format('DD-MM-YYYY')}`;
    this.service.getData(params).subscribe(response => {      
      this.sessionData = response.sessions.filter(e => e.available_capacity >= 1);
      this.dataFetched = true;
    })
  }
}

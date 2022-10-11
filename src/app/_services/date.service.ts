import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  convertFomDateToDatetime( oldDate : Date){
    let date = new Date(oldDate)
    let currentDate = new Date();
    date.setHours(currentDate.getHours());
    date.setMinutes(currentDate.getMinutes());
    date.setSeconds(currentDate.getSeconds())
    return date;
  }
}

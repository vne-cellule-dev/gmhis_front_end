import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PredefinedPeriodService {

private defaultSearchPeriode: object;
private searchDateRange: string;


  constructor() { }

  getSelectedPeriode(periode) : object{

    let date = new Date();
    let start = null;
    let end = null;
    if(periode == "today") {
      let periodeStart = new Date(date.getFullYear(),date.getMonth(), date.getDate());
      let periodeEnd = new Date(date.getFullYear(),date.getMonth(), date.getDate());
      this.defaultSearchPeriode = { start: periodeStart, end: periodeEnd };
      
    }

    if(periode == "yesterday") {
      let periodeStart = new Date(date.getFullYear(),date.getMonth(), date.getDate()-1);
      let periodeEnd = new Date(date.getFullYear(),date.getMonth(), date.getDate()-1);
      this.defaultSearchPeriode = { start: periodeStart, end: periodeEnd };
      
    }

    if(periode == "currentWeek") {
      let periodeStart = new Date(date.setDate(date.getDate() - date.getDay() + 1 ));
      let periodeEnd = new Date(date.setDate(date.getDate() - date.getDay() + 7));
      this.defaultSearchPeriode = { start: periodeStart, end: periodeEnd };
    }

    if(periode == "floatingWeek") {
      let periodeStart = new Date(date.getFullYear(),date.getMonth(), date.getDate() - 6);
      let periodeEnd = new Date(date.getFullYear(),date.getMonth(), date.getDate());
      this.defaultSearchPeriode = { start: periodeStart, end: periodeEnd };
    }

    if(periode == "lastWeek") {
      // set to Monday of this week
      date.setDate(date.getDate() - (date.getDay() + 6) % 7);
      // set to previous Monday
       var periodeStart = new Date(date.setDate(date.getDate() - 7))
      // set to previous Sunday
       var periodeEnd = new Date(date.getFullYear(),date.getMonth(), date.getDate() + 6)
       this.defaultSearchPeriode = { start: periodeStart, end: periodeEnd };
      
      
    }

    if(periode == "currentMonth") {
      var periodeStart = new Date(date.getFullYear(), date.getMonth(), 1);
      var periodeEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      this.defaultSearchPeriode = { start: periodeStart, end: periodeEnd };
      
    }

    if(periode == "floatingMonth") {
      var periodeStart = new Date(date.getFullYear(),date.getMonth()-1, date.getDate());
      var periodeEnd = new Date(date.getFullYear(), date.getMonth() , date.getDate());
      this.defaultSearchPeriode = { start: periodeStart, end: periodeEnd };
      
    }

    if(periode == "lastMonth") {
       var periodeStart = new Date(date.getFullYear(),date.getMonth()-1, 1);
      var periodeEnd = new Date(date.getFullYear(), date.getMonth() , 0);
      this.defaultSearchPeriode = { start: periodeStart, end: periodeEnd };
      
    }

    if(periode == "currentYear") {
      var periodeStart = new Date(date.getFullYear(), 0 , 1);
      var periodeEnd = new Date(date.getFullYear(), 12, 0 );
      this.defaultSearchPeriode = { start: periodeStart, end: periodeEnd };
      
    }

    if(periode == "floatingYear") {
      var periodeStart = new Date(date.getFullYear()-1,date.getMonth(), date.getDate());
      var periodeEnd = new Date(date.getFullYear(), date.getMonth() , date.getDate());
      this.defaultSearchPeriode = { start: periodeStart, end: periodeEnd };
      
    }

    if(periode == "lastYear") {
      var periodeStart = new Date(date.getFullYear() -1 , 0 , 1);
      var periodeEnd = new Date(date.getFullYear(), 0, 0);
      this.defaultSearchPeriode = { start: periodeStart, end: periodeEnd };
      
    }
    start = this.defaultSearchPeriode["start"].toISOString().split('T')[0];
    end = (!this.defaultSearchPeriode["end"]) ? this.defaultSearchPeriode["start"].toISOString().split('T')[0] : this.defaultSearchPeriode["end"].toISOString().split('T')[0]
    this.searchDateRange = start + "," + end;
    return this.defaultSearchPeriode;
    
  }
}

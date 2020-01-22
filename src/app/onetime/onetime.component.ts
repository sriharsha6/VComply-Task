import { Component, OnInit } from "@angular/core";

import { Holidays } from "../shared/models";

@Component({
  selector: "app-onetime",
  templateUrl: "./onetime.component.html",
  styleUrls: ["./onetime.component.scss"]
})
export class OnetimeComponent implements OnInit {
  item: any = {};
  holidays: any = Holidays;
  final: any = {};
  results: any[] = [];
  minDate: any = new Date();
  selectedDate: any;
  constructor() {}

  ngOnInit() {}

  DateDay(eachDay: any) {
    const item: any = {};
    const d: any = eachDay.getDate();
    const m: any = eachDay.getMonth() + 1;
    const y: any = eachDay.getFullYear();
    item.date =
      "" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
    item.day = eachDay.getDay();
    item.fullDate = eachDay;
    return item;
  }
  finish() {
    this.results = [];
    if (this.item.startDate) {
      const selectedDate: any = this.DateDay(this.item.startDate);
      this.final = this.DueDate(selectedDate);
    }
  }
  DueDate(selectedDate: any) {
    let finalList = [];
    const step1: any = this.Saturday(selectedDate);
    const step2: any = this.Sunday(step1);
    const step3: any = this.Holidays(step2);
    return step3;
  }
  addDate(date: any) {
    return new Date(date.setDate(date.getDate() + 1));
  }
  Saturday(dateLayout: any) {
    if (dateLayout.day === 6) {
      dateLayout.fullDate = this.addDate(dateLayout.fullDate);
    }
    return this.DateDay(dateLayout.fullDate);
  }

  Sunday(dateLayout: any) {
    if (dateLayout.day === 0) {
      dateLayout.fullDate = this.addDate(dateLayout.fullDate);
    }
    return this.DateDay(dateLayout.fullDate);
  }

  Holidays(dateLayout: any) {
    this.holidays.forEach(ele => {
      if (ele.date === dateLayout.date) {
        dateLayout.fullDate = this.addDate(dateLayout.fullDate);
      }
    });
    const newDateObj = this.DateDay(dateLayout.fullDate);
    const dte = this.Sunday(this.Saturday(newDateObj));
    return this.DateDay(dte.fullDate);
  }
}

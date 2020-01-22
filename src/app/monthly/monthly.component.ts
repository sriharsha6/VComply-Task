import { Component, OnInit } from "@angular/core";
import { Holidays } from "../shared/models";

@Component({
  selector: "app-monthly",
  templateUrl: "./monthly.component.html",
  styleUrls: ["./monthly.component.scss"]
})
export class MonthlyComponent implements OnInit {
  item: any = {};
  holidays: any = Holidays;
  ranges: any = [];
  results: any[] = [];
  minDate: any = new Date();
  constructor() {}

  ngOnInit() {}

  AllDates(start: any, end: any) {
    let tabs = [];
    for (const dt = start; dt <= end; dt.setDate(dt.getDate() + 7)) {
      tabs.push(new Date(dt));
    }
    return tabs;
  }

  setup(startDate: Date, endDate: Date) {
    const days = this.AllDates(new Date(startDate), new Date(endDate));
    return days.map((eachDay: Date) => this.DateDay(eachDay));
  }

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
    if (this.item.startDate && this.item.endDate) {
      const dList: any = this.setup(this.item.startDate, this.item.endDate);
      this.ranges = this.DueDate(dList);
      this.Final();
    }
  }
  DueDate(dList: any) {
    let finalList = [];
    const endDateObj: any = dList.pop();
    const step1: any = this.Saturday(endDateObj);
    const step2: any = this.Sunday(step1);
    const step3: any = this.Holidays(step2);
    dList.push(step3);
    return dList;
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
    return this.DateDay(dateLayout.fullDate);
  }

  Final() {
    const f: any = this.ranges.filter(
      (ele: any) => ele.day !== 6 && ele.day !== 0
    );
    const holidayDates = this.holidays.map(e => e.date);
    f.forEach(ele => {
      if (!holidayDates.includes(ele.date)) {
        this.results.push(ele);
      }
    });
  }
}

import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodayServiceService {

  private readonly todayDay = signal("2025-01-01");

  constructor() {
  }

  setTodayDay() {
    let obj = new Date();
    let day = obj.getDate();
    let month = obj.getMonth();
    let year = obj.getFullYear();

    let currentDay = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`

    this.todayDay.set(currentDay);

  }

  getTodayDay() {
    return this.todayDay.asReadonly();
  }
}

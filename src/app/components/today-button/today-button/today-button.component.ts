import {Component} from '@angular/core';
import {TodayServiceService} from "../../../services/today-service.service";

@Component({
  selector: 'app-today-button',
  standalone: true,
  imports: [],
  templateUrl: './today-button.component.html',
  styleUrl: './today-button.component.css'
})
export class TodayButtonComponent {
  constructor(private todayService: TodayServiceService) {
  }

  setTodayDay() {
    this.todayService.setTodayDay();
  }
}

import {Component, EventEmitter, Output} from '@angular/core';
import {DayCellComponent} from "../day-cell/day-cell.component";
import {TaskService} from "../../services/task.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [
    DayCellComponent,
    NgForOf
  ],
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.css'
})
export class CalendarViewComponent {

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.createCalendarDates();
  }

  days: { date: string, tasksCount: number } [] = [];

  createCalendarDates() {
    this.days = [];
    const year: number = 2025;
    const month: number = 8;

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
      const tasks = this.taskService.getTasksForDate(currentDate);

      this.days.push(
        {
          date: currentDate,
          tasksCount: tasks.length
        }
      )
    }
  }
}






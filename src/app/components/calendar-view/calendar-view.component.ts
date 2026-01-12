import {Component, EventEmitter, Output} from '@angular/core';
import {DayCellComponent} from "../day-cell/day-cell.component";
import {TaskService} from "../../services/task.service";
import {NgForOf} from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import {Routes, RouterModule} from '@angular/router';
import {TaskModalComponent} from "../task-modal/task-modal.component";


@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [
    DayCellComponent,
    NgForOf,
    TaskModalComponent
  ],
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.css'
})

export class CalendarViewComponent {
  selectedDateForModal: string | null = null;

  constructor(private taskService: TaskService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const dateStr = params['dateStr'];
      if (dateStr && dateStr.length === 10) {
        this.selectedDateForModal = dateStr
      } else {
        this.selectedDateForModal = null;
      }
    })

    this.createCalendarDates();
  }

  days: { date: string, year:number, month:number, day:number, tasksCount: number } [] = [];

  createCalendarDates() {
    this.days = [];
    const year: number = 2025;
    const month: number = 8;
    let day = 1;

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    while (day <= daysInMonth) {
      const currentDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

      const tasks = this.taskService.getTasksForDate(currentDate);

      this.days.push(
        {
          year: year,
          date: currentDate,
          month: month,
          day: day,
          tasksCount: tasks.length
        }
      )
      day++
    }
  }
}






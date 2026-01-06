import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from "../../models/task.model";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-tasks-for-date',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './tasks-for-date.component.html',
  styleUrl: './tasks-for-date.component.css'
})

export class TasksForDateComponent {
  @Input() tasksForDate: Task[] = [];
  @Output() newItemEvent = new EventEmitter<{ date: string, taskId: string }>();
  @Output() checkBox = new EventEmitter<{ date: string, taskId: string }>();

  deleteTask(obj: string, id: string) {
    this.newItemEvent.emit({date: obj, taskId: id})
  }

  onCheckBoxChange(obj: string, id: string) {
    this.checkBox.emit({date: obj, taskId: id})
  }
}

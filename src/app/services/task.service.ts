import {Injectable} from '@angular/core';
import {Task} from '../models/task.model';

const STORAGE_KEY = 'todo-calendar-data';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() {
  }

  getTasksForDate(date: string): Task[] {
    const allData = this._loadFromStorage();
    const taskForDate = allData[date];
    return taskForDate || [];
  }

  private _loadFromStorage(): { [key: string]: Task[] } {
    const dataJson = localStorage.getItem(STORAGE_KEY);
    return dataJson ? JSON.parse(dataJson) : {};
  }

  addTasks(date: string, taskText: string): void {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text: taskText,
      isCompleted: false,
      date: date
    }

    const tasksForDate = this.getTasksForDate(date);

    tasksForDate.unshift(newTask);

    this.saveForDate(date, tasksForDate);
  }

  toggleTaskCompletion(idTask: string, date: string) {
    const allData = this.getTasksForDate(date);

    const taskToUpdate = allData.find((task) => task.id === idTask);

    if (taskToUpdate) {
      taskToUpdate.isCompleted = !taskToUpdate.isCompleted;

      this.saveForDate(date, allData)
    }
  }

  saveForDate(date: string, tasks: Task[]) {
    const allDate = this._loadFromStorage();

    allDate[date] = tasks;
    if (tasks.length === 0) {
      delete allDate[date];
    } else {
      allDate[date] = tasks;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allDate));
  }

  deleteTask(date: string, taskId: string) {
    const allData = this.getTasksForDate(date);
    const updateTasks = allData.filter(task => task.id !== taskId);

    if (updateTasks.length !== allData.length) {
      this.saveForDate(date, updateTasks)
    }
  }
}

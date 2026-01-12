import {Injectable} from '@angular/core';
import {Task} from '../models/task.model';
import {BehaviorSubject, Subject} from "rxjs";

const STORAGE_KEY = 'todo-calendar-data';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() {
  }

  private stateSubject = new BehaviorSubject<{ [date: string]: Task[] }>({});
  readonly state$ = this.stateSubject.asObservable();

  getTasksForDate(date: string): Task[] {
    const allData = this._loadFromStorage();
    const taskForDate = allData[date];
    return taskForDate || [];
  }

  private _loadFromStorage(): { [key: string]: Task[] } {
    const dataJson = localStorage.getItem(STORAGE_KEY);
    return dataJson ? JSON.parse(dataJson) : {};
  }

  addTasks(date: string, taskText: string) {

    const newTask: Task = {
      id: crypto.randomUUID(),
      text: taskText,
      isCompleted: false,
      date: date
    }

    let clone = Object.assign({}, this.stateSubject.value);
    let existing = clone[date] ?? [];
    existing = [...existing, newTask];
    let nextState = Object.assign(clone, {[date]: existing})

    this.stateSubject.next(nextState);

    const tasksForDate = this.getTasksForDate(date);

    tasksForDate.unshift(newTask);

    this.saveForDate(date, tasksForDate);
  }


  toggleTaskCompletion(date: string, taskId: string) {
    const currentState = this.stateSubject.value;
    const tasksForDate = currentState[date] ?? [];

    const updateTasks = tasksForDate.map((task) => task.id === taskId ? {
      ...task,
      isCompleted: !task.isCompleted
    } : task)

    const newState = {
      ...currentState,
      [date]: updateTasks
    }

    this.stateSubject.next(newState);
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
    let newState = Object.assign({}, this.stateSubject.value);
    newState[date] = updateTasks;
    this.stateSubject.next(newState);
  }
}

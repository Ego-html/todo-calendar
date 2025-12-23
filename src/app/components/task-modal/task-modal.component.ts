import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import {FormsModule} from "@angular/forms";
import {TaskService} from "../../services/task.service";
import {Task} from "../../models/task.model";
import {NgForOf} from "@angular/common";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.css'
})
export class TaskModalComponent {
  @Input() selectedDate: string = '';
  @Input() title: string = '';
  inputValue: string = '';
  tasksDayStorage: Task[] = [];
  tasksForDate: Task[] = [];

  constructor(private modalService: ModalService, private taskService: TaskService) {
  }

  destroy$ = new Subject<void>();

  ngOnInit() {
    document.addEventListener('keydown', this.handleKeyPress);
    this.showTasksOnModalWindow();
    this.taskService.signal
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.showTasksOnModalWindow();
      })
  }

  onCheckBoxChange(date: string, taskId: string) {
    this.taskService.toggleTaskCompletion(date, taskId);
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.handleKeyPress)
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges() {
    if (this.selectedDate) {
      this.tasksDayStorage = [...this.taskService.getTasksForDate(this.selectedDate)];
    }
  }

  handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }

  clickOnOverlay(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  closeModal() {
    this.modalService.closeModal();
  }

  addTask() {
    if (this.inputValue.trim() !== '') this.taskService.addTasks(this.selectedDate, this.inputValue);
    this.showTasksOnModalWindow();
  }

  showTasksOnModalWindow() {
    this.tasksForDate = [...this.taskService.getTasksForDate(this.selectedDate)];
  }

  deleteTask(date: string, taskId: string) {
    this.taskService.deleteTask(date, taskId)
  }
}
